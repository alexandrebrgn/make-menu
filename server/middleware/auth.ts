import { verifyToken, generateTokens } from "../../utils/auth/jwt"
import { setHeader, setCookie } from 'h3'
import { prisma } from "../../lib/prisma"

export default defineEventHandler(async (event) => {

    // Ne pas appliquer l'authentification aux routes d'authentification
    if (event.path.startsWith('/api/auth/')) {
        return
    }

    // Ne pas appliquer l'authentification aux routes publiques
    const publicRoutes = ['/api/health', '/auth/login', '/auth/register']
    if (publicRoutes.includes(event.path)) {
        return
    }

    try {
        // Récupérer le token depuis les cookies
        let accessToken = getCookie(event, 'access_token')
        const refreshToken = getCookie(event, 'refresh_token')

        if (!accessToken) {
            if (!refreshToken) {
                setHeader(event, 'Location', '/auth/login')
                throw createError({ statusCode: 302, message: 'Redirect' })
            }

            // Tenter de rafraîchir les tokens
            const refreshPayload = await verifyToken(refreshToken)

            if (refreshPayload.type !== 'refresh') {
                throw createError({
                    statusCode: 401,
                    message: "Type de token invalide"
                })
            }

            const user = await prisma.user.findUnique({
                where: { id: refreshPayload.userId }
            })

            if (!user || !user.isActive) {
                throw createError({
                    statusCode: 401,
                    message: "Utilisateur introuvable ou inactif"
                })
            }

            const tokens = await generateTokens({
                id: user.id,
                email: user.email,
                role: user.role
            })

            setCookie(event, 'access_token', tokens.accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60
            })

            setCookie(event, 'refresh_token', tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60
            })

            setCookie(event, 'auth_status', 'authenticated', {
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60
            })

            accessToken = tokens.accessToken
        }

        // Vérifier le token
        const payload = await verifyToken(accessToken)

        // Vérifier que c'est un access token
        if (payload.type !== 'access') {
            throw createError({
                statusCode: 401,
                message: "Type de token invalide"
            })
        }

        // Attacher les informations utilisateur à l'event pour les utiliser dans les handlers
        event.context.user = {
            id: payload.userId,
            email: payload.email,
            role: payload.role
        }

        return
    } catch (error: unknown) {
        if (error instanceof Object && 'statusCode' in error) {
            throw error
        }

        // Token invalide ou expiré
        setHeader(event, 'Location', '/auth/login')
        throw createError({ statusCode: 302, message: 'Redirect' })
    }
})