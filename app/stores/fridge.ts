import { defineStore } from "pinia";

export const useFridgeStore = defineStore("fridge", () => {

    const ouais = ref('ouais');
    const add = () => {
        console.log("add");
    };

    return {
        ouais,
        add
    }
});