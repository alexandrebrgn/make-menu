import { defineStore } from "pinia";
import { Food } from "../utils/types/food";
import { FoodReference } from "../utils/types/foodReference";
import { Category } from "../utils/types/category";

export const useFridgeStore = defineStore("fridge", () => {
	const userFridge = ref<Food[]>([]);
	const foodReferences = ref<FoodReference[]>([]);
	const categories = ref<Category[]>([]);

	const add = () => {
		console.log("add");
	};

	const initFridge = async () => {
		try {
			const resFood = await $fetch<Food[]>("/api/foods");
			const resFoodReferences = await $fetch<FoodReference[]>("/api/food-reference");
			const resCategories = await $fetch<Category[]>("/api/category");
			userFridge.value = resFood;
			foodReferences.value = resFoodReferences;
			categories.value = resCategories;
			console.log("FridgeStore() : init() ok.", );
		} catch (err) {
			console.error("Erreur lors de la récupération du frigo :", err);
		}
	};

	return {
		userFridge,
		foodReferences,
		categories,
		initFridge,
		add,
	};
});
