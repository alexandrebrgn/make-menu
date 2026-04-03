export default defineEventHandler(async (event) => {
    try {
        // Supprimer les cookies de tokens
        deleteCookie(event, 'access_token')
        deleteCookie(event, 'refresh_token')
        deleteCookie(event, 'auth_status')

        return {
            success: true,
            message: "Déconnexion réussie"
        }

    } catch (error) {
        console.error('Erreur lors du logout:', error)
        throw createError({
            statusCode: 500,
            statusMessage: "Erreur interne du serveur"
        })
    }
})