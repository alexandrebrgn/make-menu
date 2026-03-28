<script setup lang="ts">
import { useFridgeStore } from '~/stores/fridge';

const { t } = useI18n();
const { $pwa } = useNuxtApp();
const fridgeStore = useFridgeStore();

const handleInstallPwa = (() => {
    useNuxtApp().$pwa?.install()
})

</script>

<template>
    <div class="min-h-screen px-4">
        <button v-if="$pwa?.showInstallPrompt" @click="handleInstallPwa"
            class="bg-black p-2 text-white border border-gray-400 rounded-lg">
            Install app
        </button>
        <p class="text-2xl text-black font-bold">{{ t('fridge') }}</p>
    </div>
</template>