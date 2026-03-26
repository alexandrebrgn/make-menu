<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "clear",
});

const config = useRuntimeConfig();
const auth = useAuthStore();
const router = useRouter();
const error = ref("");
const loading = ref(false);
const login = ref("");
const password = ref("");

const handleLogin = async () => {
  error.value = "";
  loading.value = true;
  try {
    await auth.login(login.value, password.value);
    router.push("/");
  } catch {
    error.value = "Login ou mot de passe incorrect";
  } finally {
    loading.value = false;
  }
};

const handleFakeLogin = async () => {
  if (config.public.fakeAuth) {
    if (!localStorage.getItem("token")) {
      localStorage.setItem("token", "testToken");
      auth.token = "testToken"
    }
    await router.push("/");
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg border border-gray-300 w-full max-w-[360px]">

      <div class="flex justify-between pb-6">
        <h1 class="text-xl font-bold">Sapientia</h1>

        <button
          class="bg-black text-white py-2 px-2 rounded-md text-sm font-medium hover:bg-gray-800 transition cursor-pointer"
          @click="handleFakeLogin">
          Connection sans login
        </button>
      </div>

      <form @submit.prevent="handleLogin">

        <div class="mb-4">
          <label class="block text-xs text-gray-500 mb-1">Login</label>
          <input v-model="login" type="text" required
            class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="mb-4">
          <label class="block text-xs text-gray-500 mb-1">Mot de passe</label>
          <input v-model="password" type="password" required
            class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <p v-if="error" class="text-red-500 text-xs mb-3">
          {{ error }}
        </p>

        <button type="submit"
          class="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition">
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
    </div>
  </div>
</template>