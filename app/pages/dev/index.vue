<script setup lang="ts">
import { useAuthStore } from '../../stores/auth';

const { t } = useI18n();
const authStore = useAuthStore();

const foodBody = {
    name: 'Tomate',
    quantity: 3,
    unit: 'pcs',
    category: 'Légumes',
    userId: authStore.user?.id,
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

const handleResetFoods = async () => {
    const res = await $fetch('/api/foods/reset', {
        method: 'PUT'
    });
}

</script>

<template>
    <div class="min-h-screen px-4">
        <p class="text-2xl text-black font-bold">{{ t('fridge') }}</p>
        <div class="flex gap-2 pt-4">
            <button class="px-4 py-2 bg-black rounded-lg text-white border border-gray-500 " @click="handlePost">
                Créé food
            </button>
            <button class="px-4 py-2 bg-black rounded-lg text-white border border-gray-500 " @click="handlePostUser">
                Créé user
            </button>
            <button class="px-4 py-2 bg-black rounded-lg text-white border border-gray-500 " @click="handleResetFoods">
                Reset foods
            </button>
        </div>
    </div>
</template>