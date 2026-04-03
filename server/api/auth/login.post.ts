import { prisma } from "../../utils/prisma"
import { verifyPassword, validatePassword } from "../../../utils/auth/password"
import { generateTokens } from "../../../utils/auth/jwt"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Validation des champs requis
    if (!body.email || !body.password) {
        throw createError({
            statusCode: 400,
            statusMessage: "Email et mot de passe requis"
        })
    }

    try {
        // Trouver l'utilisateur
        const user = await prisma.user.findUnique({
            where: { email: body.email }
        })

        if (!user) {
            throw createError({
                statusCode: 401,
                statusMessage: "Email ou mot de passe incorrect"
            })
        }

        // Vérifier si le compte est actif
        if (!user.isActive) {
            throw createError({
                statusCode: 401,
                statusMessage: "Compte désactivé"
            })
        }

        // Vérifier le mot de passe
        const isValidPassword = await verifyPassword(body.password, user.password)
        if (!isValidPassword) {
            throw createError({
                statusCode: 401,
                statusMessage: "Email ou mot de passe incorrect"
            })
        }

        // Générer les tokens
        const tokens = await generateTokens({
            id: user.id,
            email: user.email,
            role: user.role
        })

        // Définir les cookies httpOnly
        setCookie(event, 'access_token', tokens.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 // 15 minutes
        });

        setCookie(event, 'refresh_token', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 // 7 jours
        });

        // Cookie non-httpOnly pour que le client puisse vérifier l'état d'authentification
        setCookie(event, 'auth_status', 'authenticated', {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 // 7 jours
        });

        // Retourner les infos utilisateur (sans les tokens dans la réponse)
        return {
            success: true,
            user: {
                id: user.id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role
            }
        }

    } catch (error) {
        // Re-throw les erreurs createError
        if (error.statusCode) {
            throw error
        }

        // Erreur interne du serveur
        console.error('Erreur lors du login:', error)
        throw createError({
            statusCode: 500,
            statusMessage: "Erreur interne du serveur"
        })
    }
})