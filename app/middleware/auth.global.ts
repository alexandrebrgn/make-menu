import { useAuthStore } from "../stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
	const auth = useAuthStore();

	// Routes publiques
	const publicRoutes = ["/auth/login", "/auth/register"];
	if (publicRoutes.includes(to.path)) {
		return;
	}

	// Si pas de token, rediriger vers login
	if (!auth.hasToken) {
		return navigateTo("/auth/login");
	}

	// Si on a un token mais pas d'utilisateur, initialiser l'auth
	if (auth.hasToken && !auth.user) {
		try {
			await auth.initAuth();
		} catch (error) {
			// Si l'initialisation échoue, rediriger vers login
			console.error('Erreur lors de l\'initialisation de l\'authentification:', error);
			return navigateTo("/auth/login");
		}
	}

	// Si pas connecté après initialisation, rediriger
	if (!auth.isLoggedIn) {
		return navigateTo("/auth/login");
	}
});
