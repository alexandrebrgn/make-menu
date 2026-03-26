import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
	const auth = useAuthStore();

	// Routes publiques
	const publicRoutes = ["/auth/login"];
	if (publicRoutes.includes(to.path)) {
		return;
	}

	// Si pas de token dans localStorage -> auth/login
	if (!auth.isLoggedIn) {
		return navigateTo("/auth/login");
	}
});
