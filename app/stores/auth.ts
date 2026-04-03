import { defineStore } from "pinia";
import { User } from "../utils/types/User";

export const useAuthStore = defineStore("auth", () => {
	const config = useRuntimeConfig();

	const user = ref<User | null>(null);
	const loading = ref(false);

	// Vérifier si l'utilisateur est connecté en vérifiant la présence de l'utilisateur
	const isLoggedIn = computed(() => {
		return !!user.value;
	});

	// Vérifier si un token existe dans les cookies
	const hasToken = computed(() => {
		if (process.client) {
			return !!useCookie('auth_status').value;
		}
		return false;
	});

	const login = async (email: string, password: string) => {
		loading.value = true;

		try {
			const response = await $fetch<{
				success: boolean;
				user: any;
			}>(
				`/api/auth/login`,
				{
					method: "POST",
					body: { email, password },
				},
			);

			// Les tokens sont automatiquement définis par l'API dans des cookies httpOnly
			user.value = response.user;

			return true;
		} catch (err: any) {
			console.error(err);
			throw new Error(err.data?.statusMessage || 'Erreur de connexion');
		} finally {
			loading.value = false;
		}
	};

	const register = async (userData: {
		email: string;
		password: string;
		firstname: string;
		lastname: string;
	}) => {
		loading.value = true;

		try {
			const response = await $fetch<{
				success: boolean;
				message: string;
				user: any;
			}>(
				`/api/auth/register`,
				{
					method: "POST",
					body: userData,
				},
			);

			return response;
		} catch (err: any) {
			console.error(err);
			throw new Error(err.data?.statusMessage || 'Erreur d\'inscription');
		} finally {
			loading.value = false;
		}
	};

	const logout = async () => {
		try {
			await $fetch(`/api/auth/logout`, {
				method: "POST",
			});
		} catch (error) {
			console.error('Erreur lors du logout:', error);
		} finally {
			// Nettoyer le state local même si l'API échoue
			user.value = null;
			// Les cookies sont supprimés côté serveur
		}
	};

	const refreshToken = async () => {
		try {
			await $fetch(`/api/auth/refresh`, {
				method: "POST",
			});
		} catch (error) {
			console.error('Erreur lors du refresh token:', error);
			// Si le refresh échoue, déconnecter l'utilisateur
			await logout();
		}
	};

	// Initialiser l'utilisateur au chargement de l'app
	const initAuth = async () => {
		if (hasToken.value) {
			try {
				// Récupérer le profil utilisateur
				const response = await $fetch<{ success: boolean; user: any }>(
					`/api/users/profile`
				);
				user.value = response.user;
			} catch (error) {
				console.error('Erreur lors de l\'initialisation auth:', error);
				// Si on ne peut pas récupérer le profil, déconnecter
				await logout();
			}
		}
	};

	return {
		user,
		loading,
		isLoggedIn,
		hasToken,
		login,
		register,
		logout,
		refreshToken,
		initAuth,
	};
});
