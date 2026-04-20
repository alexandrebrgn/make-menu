import { defineStore } from "pinia";
import type { Food, CreateFoodDto } from "../utils/types/food";
import type { FoodReference } from "../utils/types/foodReference";
import type { Category } from "../utils/types/category";

export const useFridgeStore = defineStore("fridge", () => {
	const userFridge = ref<Food[]>([]);
	const foodReferences = ref<FoodReference[]>([]);
	const categories = ref<Category[]>([]);

	const initFridge = async () => {
		try {
			const [resFood, resFoodReferences, resCategories] = await Promise.all([
				$fetch<Food[]>("/api/foods"),
				$fetch<FoodReference[]>("/api/food-reference"),
				$fetch<Category[]>("/api/category"),
			]);
			userFridge.value = resFood;
			foodReferences.value = resFoodReferences;
			categories.value = resCategories;
		} catch (err) {
			console.error("Erreur lors de la récupération du frigo :", err);
		}
	};

	const addFood = async (dto: CreateFoodDto) => {
		const created = await $fetch<Food>("/api/foods", {
			method: "POST",
			body: dto,
		});
		userFridge.value.unshift(created);
		return created;
	};

	const updateFood = async (id: number, dto: Partial<CreateFoodDto>) => {
		const updated = await $fetch<Food>(`/api/foods/${id}`, {
			method: "PUT",
			body: dto,
		});
		const idx = userFridge.value.findIndex((f) => f.id === id);
		if (idx !== -1) userFridge.value[idx] = updated;
		return updated;
	};

	const deleteFood = async (id: number) => {
		await $fetch(`/api/foods/${id}`, { method: "DELETE" });
		userFridge.value = userFridge.value.filter((f) => f.id !== id);
	};

	const getCategoryName = (categorySlug: string) => {
		return categories.value.find((c) => c.slug === categorySlug)?.name ?? categorySlug;
	};

	return {
		userFridge,
		foodReferences,
		categories,
		initFridge,
		addFood,
		updateFood,
		deleteFood,
		getCategoryName,
	};
});
