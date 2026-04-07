<script setup lang="ts">
import { useFridgeStore } from '../../stores/fridge';

const { t } = useI18n();

const fridgeStore = useFridgeStore();

console.log('fridge page')

onMounted(async () => {
    await fridgeStore.initFridge();
})

</script>

<template>
    <div class="min-h-screen px-4">
        <p class="text-2xl text-black font-bold pb-8">{{ t('fridge') }}</p>
        <div class="flex gap-6 flex-wrap">
            <div v-for="food in fridgeStore.userFridge" :key="food.id" class="flex flex-col min-w-[10vw] border p-2 rounded-lg mb-2 gap-2">
                <div class="w-full aspect-square rounded-lg" 
                :class="getRandomColor()"></div>
                <p class="text-lg font-bold">{{ food.name }}</p>
                <p class="text-green-700 font-bold">{{ food.quantity }} {{ t(`units.${food.unit}`) }}</p>
            </div>
        </div>
        <div >
            <button class="px-4 py-2 bg-black rounded-lg text-white border border-gray-500 " @click="fridgeStore.add()">
                Add food
            </button>
        </div>
    </div>
</template>

<style>
* {
    box-shadow: 0 0 0 1px red inset;
}
</style>