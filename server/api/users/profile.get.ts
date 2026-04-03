import { verifyToken } from "../../../utils/auth/jwt";
import { prisma } from "../../utils/prisma";

export default defineEventHandler(async (event) => {
    // Vérifier le token d'accès
    const accessToken = getCookie(event, 'access_token')
    if (!accessToken) {
        throw createError({
            statusCode: 401,
            statusMessage: "Profile Token d'accès manquant"
        })
    }

    try {
        // Vérifier et décoder le token
        const payload = await verifyToken(accessToken)
        const userId = payload.userId

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                // Ne pas inclure le mot de passe
                _count: {
                    select: {
                        foods: true
                    }
                }
            }
        });

        if (!user) {
            throw createError({
                statusCode: 404,
                statusMessage: "Utilisateur non trouvé"
            });
        }

        return {
            success: true,
            user: {
                ...user,
                foodsCount: user._count.foods
            }
        };
    } catch (error) {
        if (error instanceof Object && 'statusCode' in error) {
            throw error;
        }

        throw createError({
            statusCode: 500,
            statusMessage: "Erreur lors de la récupération du profil"
        });
    }
});