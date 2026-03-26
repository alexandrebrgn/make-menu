import { defineStore } from "pinia";

// *** Mettre des toasts en cas d'erreur et de succès
export const useAuthStore = defineStore("auth", () => {
	const config = useRuntimeConfig();

	const user = ref<unknown>(null);
	const token = ref<string | null>(null);
	const loading = ref(false);

	const isLoggedIn = computed(() => !!token.value);

	const login = async (email: string, password: string) => {
		loading.value = true;

		try {
			const response = await $fetch<{ token: string; user: unknown }>(
				// *** Changer avec url de l'API
				`${config.public.apiBaseUrl}/auth/login`,
				{
					method: "POST",
					body: { email, password },
				},
			);

			token.value = response.token;
			user.value = response.user;

			localStorage.setItem("token", token.value);
			// localStorage.setItem("user", JSON.stringify(user.value));

			return true;
		} catch (err) {
      console.error(err)
			return false;
		} finally {
			loading.value = false;
		}
	};

	const logout = () => {
		token.value = null;
		user.value = null;
		localStorage.removeItem("token");
		// localStorage.removeItem("user");
		navigateTo("/auth/login");
	};

	const setFakeToken = () => {
		if (!localStorage.getItem("token")) {
			localStorage.setItem("token", "testToken");
		}
	};

	// Restaure la session au chargement
	const init = () => {
    // Faux token
		if (config.public.NUXT_PUBLIC_FAKE_AUTH === "true") {
			setFakeToken();
			console.log("eae");
      return;
		}

		if (import.meta.client) {
			const savedToken = localStorage.getItem("token");
			// const savedUser = localStorage.getItem("user");

			if (savedToken) token.value = savedToken;
			// if (savedUser) user.value = JSON.parse(savedUser);
		}
	};

	init();

	return {
		user,
		token,
		loading,
		isLoggedIn,
		login,
		logout,
		setFakeToken,
	};
});
