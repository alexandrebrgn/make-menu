<script setup lang="ts">
import { routerKey } from 'vue-router';
import { useAuthStore } from '~/stores/auth';

const { t } = useI18n();
const auth = useAuthStore();
const route = useRoute()
const router = useRouter();
const toggledBar = ref(true)

const menu = [
  { name: t('home'), link: '/', icon: 'solar:home-outline' },
  { name: t('fridge'), link: '/fridge', icon: 'solar:fridge-outline' },
  { name: t('recipes'), link: '/recipes', icon: 'solar:book-outline' },
  { name: t('kitchen'), link: '/kitchen', icon: 'solar:oven-mitts-linear' },
  { name: t('dev'), link: '/dev', icon: 'solar:code-linear' }
]

const handleLogout = async () => {
  auth.logout()
  await router.push('/auth/login')
}

const breadcrumb = computed(() => {
  return route.path
    .split('/')
    .filter(Boolean)
})

const handleToggleSidebar = () => {
  toggledBar.value = !toggledBar.value
}

</script>

<template>
  <div class="h-screen flex">
    <VitePwaManifest />

    <!-- Header / Nav -->
    <nav class="border-r h-full overflow-hidden transition-all duration-300"
      :class="toggledBar ? 'w-64 p-4' : 'w-20 p-4'">
      <div class="flex flex-col justify-between h-full">
        <div class="flex flex-col gap-8">
          <!-- Logo -->
          <div class="flex gap-2 items-center" :class="toggledBar ? '' : 'justify-center'">
            <div class="rounded-lg bg-black" :class="toggledBar ? 'h-8 w-8' : 'h-8 w-6'"></div>
            <h1 v-if="toggledBar" class="text-xl font-bold">Make Menu</h1>
          </div>
          <!-- Menu Items -->
          <div class="flex flex-col gap-2" :class="toggledBar ? 'pl-2' : 'pl-0'">
            <NuxtLink v-for="item in menu" :to="item.link"
              class="text-gray-600 rounded-md py-1 flex items-center gap-2 hover:bg-gray-50 hover:text-black"
              :class="toggledBar ? 'pl-2' : 'pl-0 justify-center'"
              :key="item.link">
              <Icon :name="item.icon" />
              <p v-if="toggledBar">{{ item.name }}</p>
            </NuxtLink>
          </div>
        </div>
        <!-- Logout Button -->
        <button class="w-full bg-black rounded-lg flex items-center justify-center text-white py-1"
          @click="handleLogout">
          <Icon name="solar:logout-3-outline" />
          <span class="ml-2 transition-all duration-200" :class="toggledBar ? 'inline' : 'hidden'">Se déconnecter</span>
        </button>
      </div>
    </nav>

    <!-- Main -->
    <main class="flex-1 overflow-y-auto">
      <div class="w-full flex items-center p-4 gap-2">
        <Icon name="solar:sidebar-minimalistic-linear" style="color: black" size="20" @click="handleToggleSidebar" class="cursor-pointer"/>
        <Icon name="solar:alt-arrow-right-outline" style="color: black" size="20" />
        <div class="flex items-center gap-2">
          <template v-for="(part, index) in breadcrumb" :key="index">
            <p class="text-md">{{ t(part) }}</p>

            <Icon v-if="index < breadcrumb.length - 1" name="solar:alt-arrow-right-outline" size="16" />
          </template>
        </div>
      </div>
      <slot/>
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