import { verifyToken, generateTokens } from "../../../utils/auth/jwt"
import { prisma } from "../../utils/prisma"

export default defineEventHandler(async (event) => {
    try {
        // Récupérer le refresh token depuis les cookies
        const refreshToken = getCookie(event, 'refresh_token')

        if (!refreshToken) {
            throw createError({
                statusCode: 401,
                statusMessage: "Refresh token manquant"
            })
        }

        // Vérifier le refresh token
        const payload = await verifyToken(refreshToken)

        // Vérifier que c'est bien un refresh token
        if (payload.type !== 'refresh') {
            throw createError({
                statusCode: 401,
                statusMessage: "Token invalide"
            })
        }

        // Vérifier que l'utilisateur existe toujours et est actif
        const user = await prisma.user.findUnique({
            where: { id: payload.userId }
        })

        if (!user || !user.isActive) {
            throw createError({
                statusCode: 401,
                statusMessage: "Utilisateur introuvable ou inactif"
            })
        }

        // Générer de nouveaux tokens
        const tokens = await generateTokens({
            id: user.id,
            email: user.email,
            role: user.role
        })

        // Définir les nouveaux cookies
        setCookie(event, 'access_token', tokens.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 // 15 minutes
        })

        setCookie(event, 'refresh_token', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 // 7 jours
        })

        // Cookie non-httpOnly pour que le client puisse vérifier l'état d'authentification
        setCookie(event, 'auth_status', 'authenticated', {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 // 7 jours
        })

        return {
            success: true,
            message: "Tokens rafraîchis"
        }

    } catch (error) {
        if (error.statusCode) {
            throw error
        }

        console.error('Erreur lors du refresh:', error)
        throw createError({
            statusCode: 500,
            statusMessage: "Erreur interne du serveur"
        })
    }
})