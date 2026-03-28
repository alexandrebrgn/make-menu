<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const { t } = useI18n();
const auth = useAuthStore();

const menu = [
    { name: t('home'), link: '/', icon: 'solar:home-outline' },
    { name: t('fridge'), link: '/fridge', icon: 'solar:fridge-outline' },
    { name: t('recipes'), link: '/recipes', icon: 'solar:book-outline' },
    { name: t('kitchen'), link: '/kitchen', icon: 'solar:oven-mitts-linear' },
]

const handleLogout = () => {
    auth.logout()
}


</script>

<template>
  <div class="h-screen flex">
    <VitePwaManifest />

    <!-- Header / Nav -->
    <nav class="border-r min-w-1/6 p-4 h-full">
      <div class="flex flex-col justify-between h-full">
        <div class="flex flex-col gap-8">
          <div class="flex gap-2 items-center">
            <div class="h-8 w-8 rounded-lg bg-black"></div>
            <h1 class="text-xl font-bold">Make Menu</h1>
          </div>
          <div class="flex flex-col gap-2 pl-2">
            <NuxtLink v-for="item in menu" :to="item.link" class="text-gray-600 rounded-md pl-2 py-1 flex items-center gap-2 hover:bg-gray-50 hover:text-black " :key="item.link">
              <Icon :name="item.icon" style="color: black" />
              <p>{{ item.name }}</p>
            </NuxtLink>
          </div>
        </div>
        <button class="w-full bg-black rounded-lg flex items-center justify-center text-white py-1" @click="handleLogout">
          <Icon name="solar:logout-2-outline" />
          <span class="ml-2">Se déconnecter</span>
        </button>
      </div>
    </nav>

    <!-- Main -->
    <main class="flex-1 overflow-y-auto">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="">
    </footer>
  </div>
</template>

<style>
* {
  /* box-shadow: inset 0 0 0 1px red; */
}
</style>