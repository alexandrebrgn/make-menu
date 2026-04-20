<script setup lang="ts">
import { useAuthStore } from '../stores/auth';

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

    <nav class="sidebar" :class="{ 'sidebar--open': toggledBar }">
      <div class="sidebar__inner">
        <div>
          <!-- Logo -->
          <div class="sidebar__row">
            <div class="sidebar__icon">
              <div class="w-7 h-7 rounded-lg bg-black"></div>
            </div>
            <span class="sidebar__label font-bold text-base tracking-tight">Make Menu</span>
          </div>

          <div class="sidebar__sep"></div>

          <!-- Menu -->
          <div class="flex flex-col gap-0.5">
            <NuxtLink
              v-for="item in menu"
              :to="item.link"
              :key="item.link"
              class="sidebar__row sidebar__link"
              :class="{ 'sidebar__link--active': route.path === item.link }"
            >
              <div class="sidebar__icon">
                <Icon :name="item.icon" size="20" />
              </div>
              <span class="sidebar__label">{{ item.name }}</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Logout -->
        <button class="sidebar__row sidebar__logout" @click="handleLogout">
          <div class="sidebar__icon">
            <Icon name="solar:logout-3-outline" size="20" />
          </div>
          <span class="sidebar__label">Se déconnecter</span>
        </button>
      </div>
    </nav>

    <main class="flex-1 overflow-y-auto">
      <div class="w-full flex items-center p-4 gap-2">
        <Icon name="solar:sidebar-minimalistic-linear" style="color: black" size="20" @click="handleToggleSidebar" class="cursor-pointer hover:opacity-60 transition-opacity"/>
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

    <footer class=""></footer>
  </div>
</template>

<style scoped>
/*
  Sidebar uses a "mask" approach:
  - .sidebar__inner is always full-width (expanded size)
  - .sidebar clips it via overflow:hidden + animated width
  - Icons never move. Text just gets revealed/hidden by the clip.
*/

.sidebar {
  --icon-col: 3.5rem;
  --full-w: 13rem;
  --speed: 0.4s;
  --ease: cubic-bezier(0.4, 0, 0.2, 1);

  border-right: 1px solid #e5e7eb;
  height: 100%;
  overflow: hidden;
  background: #fff;
  width: var(--icon-col);
  transition: width var(--speed) var(--ease);
}

.sidebar--open {
  width: var(--full-w);
}

.sidebar__inner {
  width: var(--full-w);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 0;
}

/* ---- Every row: icon + label ---- */
.sidebar__row {
  display: flex;
  align-items: center;
  height: 2.5rem;
}

.sidebar__icon {
  width: var(--icon-col);
  min-width: var(--icon-col);
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar__label {
  white-space: nowrap;
  font-size: 0.875rem;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.25s var(--ease),
              transform 0.25s var(--ease);
  pointer-events: none;
}

.sidebar--open .sidebar__label {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
  transition-delay: 0.12s;
}

/* ---- Separator ---- */
.sidebar__sep {
  height: 1px;
  background: #e5e7eb;
  margin: 0.5rem 0.75rem;
}

/* ---- Links ---- */
.sidebar__link {
  color: #6b7280;
  transition: color 0.15s, background-color 0.15s;
}

.sidebar__link:hover {
  color: #111827;
  background-color: #f3f4f6;
}

.sidebar__link--active {
  color: #111827;
  background-color: #f3f4f6;
  font-weight: 500;
}

/* ---- Logout ---- */
.sidebar__logout {
  margin: 0 0.5rem;
  border-radius: 0.5rem;
  background: #111827;
  color: white;
  transition: background-color 0.15s;
}

.sidebar__logout:hover {
  background: #374151;
}
</style>
