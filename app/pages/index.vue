<script setup lang="ts">

const { $pwa } = useNuxtApp();

const handleInstallPwa = (() => {
    useNuxtApp().$pwa?.install()
})

</script>

<template>
    <div class="min-h-screen">
        <button v-if="$pwa?.showInstallPrompt" @click="handleInstallPwa"
            class="bg-black p-2 text-white border border-gray-400 rounded-lg">
            Install app
        </button>
    </div>
</template>