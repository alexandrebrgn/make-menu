import { prisma } from "../../utils/prisma"
import { hashPassword, validatePassword } from "../../../utils/auth/password"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Validation des champs requis
    if (!body.email || !body.password || !body.firstname || !body.lastname) {
        throw createError({
            statusCode: 400,
            statusMessage: "Tous les champs sont requis"
        })
    }

    try {
        // Vérifier si l'email existe déjà
        const existingUser = await prisma.user.findUnique({
            where: { email: body.email }
        })

        if (existingUser) {
            throw createError({
                statusCode: 409,
                statusMessage: "Cet email est déjà utilisé"
            })
        }

        // Valider la force du mot de passe
        const passwordValidation = validatePassword(body.password)
        if (!passwordValidation.isValid) {
            throw createError({
                statusCode: 400,
                statusMessage: `Mot de passe invalide: ${passwordValidation.errors.join(', ')}`
            })
        }

        // Hasher le mot de passe
        const hashedPassword = await hashPassword(body.password)

        // Créer l'utilisateur
        const newUser = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                firstname: body.firstname,
                lastname: body.lastname,
                role: 'USER', // Par défaut
                isActive: true
            },
            select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
                role: true,
                createdAt: true
            }
        })

        return {
            success: true,
            message: "Utilisateur créé avec succès",
            user: newUser
        }

    } catch (error) {
        // Re-throw les erreurs createError
        if (error.statusCode) {
            throw error
        }

        // Erreur interne du serveur
        console.error('Erreur lors de l\'inscription:', error)
        throw createError({
            statusCode: 500,
            statusMessage: "Erreur interne du serveur"
        })
    }
})