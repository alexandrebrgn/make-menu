<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const { t } = useI18n();
const auth = useAuthStore()

const handleLogout = () => {
    auth.logout()
}

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- <VitePwaManifest /> -->

    <!-- Header / Nav -->
    <nav class="border-b p-4">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-bold">LOGO</h1>
        <div class="space-x-4">
          <NuxtLink to="/" class="hover:text-gray-300">Test</NuxtLink>
          <button class="" @click="handleLogout">Se déconnecter</button>
        </div>
      </div>
    </nav>

    <!-- Main -->
    <main class="flex-1 p-4">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="">
    </footer>
  </div>
</template>