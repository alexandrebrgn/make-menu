<script setup lang="ts">
import { useFridgeStore } from '~/stores/fridge';

const { t } = useI18n();
const { $pwa } = useNuxtApp();
const fridgeStore = useFridgeStore();

const foodBody = {
    name: 'Tomate',
    quantity: 3,
    unit: 'pcs',
    category: 'Légumes',
    userId: 1,
    expiresAt: '2024-04-01'
};

const userBody = {
    firstName: 'John',
    lastName: 'Doe',
};

const handlePost = async () => {
    const newFood = await $fetch('/api/foods', {
        method: 'POST',
        body: foodBody
    });
    console.log(newFood)
};

const handlePostUser = async () => {
    const newUser = await $fetch('/api/users', {
        method: 'POST',
        body: userBody
    });
    console.log(newUser)
};

</script>

<template>
    <div class="min-h-screen px-4">
        <p class="text-2xl text-black font-bold">{{ t('fridge') }}</p>
        <button class="p-4 bg-black rounded-lg text-white border border-gray-500 " @click="handlePost">
            Créé food
        </button>
        <button class="p-4 bg-black rounded-lg text-white border border-gray-500 " @click="handlePostUser">
            Créé user
        </button>
    </div>
</template>