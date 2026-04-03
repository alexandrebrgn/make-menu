import { prisma } from "../../utils/prisma";

export default defineEventHandler(async (event) => {
    // Le middleware auth.ts a déjà vérifié le token et ajouté event.context.user
    const userId = event.context.user.id;

    try {
        const foods = await prisma.food.findMany({
            where: {
                userId: userId // Ne retourner que les aliments de l'utilisateur connecté
            },
            include: {
                user: {
                    select: {
                        id: true,
                        firstname: true,
                        lastname: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return foods;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: "Erreur lors de la récupération des aliments",
        });
    }
});