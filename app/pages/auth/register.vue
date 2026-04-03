<script setup lang="ts">
import { useAuthStore } from "../../stores/auth";

definePageMeta({
    layout: "clear",
});

const config = useRuntimeConfig();
const auth = useAuthStore();
const router = useRouter();
const error = ref("");
const success = ref("");
const loading = ref(false);

const form = ref({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
});

const handleRegister = async () => {
    error.value = "";
    success.value = "";

    // Validation côté client
    if (form.value.password !== form.value.confirmPassword) {
        error.value = "Les mots de passe ne correspondent pas";
        return;
    }

    if (form.value.password.length < 8) {
        error.value = "Le mot de passe doit contenir au moins 8 caractères";
        return;
    }

    loading.value = true;
    try {
        const response = await auth.register({
            email: form.value.email,
            password: form.value.password,
            firstname: form.value.firstname,
            lastname: form.value.lastname,
        });

        success.value = "Inscription réussie ! Redirection vers la connexion...";

        // Rediriger vers login après 2 secondes
        setTimeout(() => {
            router.push("/auth/login");
        }, 2000);

    } catch (err: any) {
        error.value = err.message || "Erreur lors de l'inscription";
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Créer un compte
                </h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    Ou
                    <NuxtLink to="/auth/login" class="font-medium text-indigo-600 hover:text-indigo-500">
                        connectez-vous à votre compte
                    </NuxtLink>
                </p>
            </div>

            <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <input v-model="form.firstname" type="text" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Prénom" />
                    </div>
                    <div>
                        <input v-model="form.lastname" type="text" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Nom" />
                    </div>
                    <div>
                        <input v-model="form.email" type="email" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Adresse email" />
                    </div>
                    <div>
                        <input v-model="form.password" type="password" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Mot de passe" />
                    </div>
                    <div>
                        <input v-model="form.confirmPassword" type="password" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Confirmer le mot de passe" />
                    </div>
                </div>

                <div v-if="error" class="text-red-600 text-sm text-center">
                    {{ error }}
                </div>

                <div v-if="success" class="text-green-600 text-sm text-center">
                    {{ success }}
                </div>

                <div>
                    <button type="submit" :disabled="loading"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                        <span v-if="loading" class="flex items-center">
                            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            Inscription en cours...
                        </span>
                        <span v-else>
                            S'inscrire
                        </span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>