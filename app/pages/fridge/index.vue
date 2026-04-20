<script setup lang="ts">
import { useFridgeStore } from '../../stores/fridge';
import { getFoodImage } from '../../utils/foodImages';
import type { Food, CreateFoodDto } from '../../utils/types/food';
import type { FoodReference } from '../../utils/types/foodReference';

const { t } = useI18n();
const fridgeStore = useFridgeStore();

onMounted(
    () => fridgeStore.initFridge()
);

// ── Search & Add ──
const searchQuery = ref('');
const showAddModal = ref(false);
const filteredRefs = computed(() => {
  const q = searchQuery.value.toLowerCase().trim();
  if (!q) return [];
  const seen = new Set<string>();
  return fridgeStore.foodReferences.filter((r) => {
    const key = r.name.toLowerCase();
    if (seen.has(key) || !key.includes(q)) return false;
    seen.add(key);
    return true;
  }).slice(0, 8);
});

const newFood = ref<CreateFoodDto>({
    name: '',
    quantity: 1,
    unit: 'pcs',
    category: '',
    expiresAt: null,
});

const openAddFromRef = (ref: FoodReference) => {
    const cat = fridgeStore.categories.find((c) => c.id === ref.categoryId);
    newFood.value = {
        name: ref.name,
        quantity: ref.defaultQuantity ?? 1,
        unit: normalizeUnit(ref.unit),
        category: cat?.slug ?? '',
        expiresAt: null,
    };
    searchQuery.value = '';
    showAddModal.value = true;
};

const openAddBlank = () => {
    newFood.value = { name: searchQuery.value || '', quantity: 1, unit: 'pcs', category: '', expiresAt: null };
    searchQuery.value = '';
    showAddModal.value = true;
};

const submitAdd = async () => {
    if (!newFood.value.name) return;
    await fridgeStore.addFood(newFood.value);
    showAddModal.value = false;
};

// ── Edit ──
const showEditModal = ref(false);
const editingFood = ref<Food | null>(null);

const openEdit = (food: Food) => {
    editingFood.value = { ...food };
    showEditModal.value = true;
};

const submitEdit = async () => {
    if (!editingFood.value) return;
    await fridgeStore.updateFood(editingFood.value.id, {
        name: editingFood.value.name,
        quantity: editingFood.value.quantity,
        unit: editingFood.value.unit,
        category: editingFood.value.category,
        expiresAt: editingFood.value.expiresAt,
    });
    showEditModal.value = false;
    editingFood.value = null;
};

// ── Delete ──
const showDeleteConfirm = ref(false);
const deletingFood = ref<Food | null>(null);

const askDelete = (food: Food) => {
    deletingFood.value = food;
    showDeleteConfirm.value = true;
};

const confirmDelete = async () => {
    if (!deletingFood.value) return;
    await fridgeStore.deleteFood(deletingFood.value.id);
    showDeleteConfirm.value = false;
    deletingFood.value = null;
};

// ── Units ──
const units = ['g', 'kg', 'ml', 'l', 'pièce'];

const normalizeUnit = (unit: string | null): string => {
  const map: Record<string, string> = {
    grammes: 'g', gramme: 'g', g: 'g',
    kilogrammes: 'kg', kilogramme: 'kg', kg: 'kg',
    millilitres: 'ml', millilitre: 'ml', ml: 'ml',
    litres: 'l', litre: 'l', l: 'l',
    'pièce': 'pièce', 'pièces': 'pièce', pcs: 'pièce', gousse: 'pièce',
  };
  return map[(unit || '').toLowerCase()] || 'pièce';
};
</script>

<template>
    <div class="p-6 max-w-5xl mx-auto">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
            <h1 class="text-2xl font-bold">{{ t('fridge') }}</h1>
        </div>

        <!-- Search bar -->
        <div class="relative mb-8">
            <div
                class="flex items-center gap-2 border rounded-xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-black/10">
                <Icon name="solar:magnifer-linear" size="20" class="text-gray-400" />
                <input v-model="searchQuery" type="text" placeholder="Rechercher un aliment à ajouter..."
                    class="flex-1 outline-none bg-transparent text-sm" />
                <button @click="openAddBlank"
                    class="shrink-0 bg-black text-white rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-1.5">
                    <Icon name="solar:add-circle-linear" size="18" />
                    Ajouter
                </button>
            </div>

            <!-- Dropdown results -->
            <div v-if="filteredRefs.length"
                class="absolute z-20 left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg overflow-hidden">
                <button v-for="ref in filteredRefs" :key="ref.id" @click="openAddFromRef(ref)"
                    class="w-full text-left px-3 py-2.5 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                    <div class="w-9 h-9 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                      <img v-if="getFoodImage(ref.name)" :src="getFoodImage(ref.name)!" :alt="ref.name" class="w-full h-full object-cover" />
                      <div v-else class="w-full h-full flex items-center justify-center">
                        <Icon name="solar:bowl-linear" size="16" class="text-gray-300" />
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium">{{ ref.name }}</p>
                        <p class="text-xs text-gray-400">{{ ref.unit || 'pcs' }} · {{ ref.defaultQuantity || 1 }}</p>
                    </div>
                    <Icon name="solar:add-circle-linear" size="18" class="text-gray-400" />
                </button>
            </div>
        </div>

        <!-- Food grid -->
        <div v-if="fridgeStore.userFridge.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div v-for="food in fridgeStore.userFridge" :key="food.id"
                class="group relative bg-white border rounded-2xl p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
                <!-- Actions -->
                <div class="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button @click="openEdit(food)" class="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                        <Icon name="solar:pen-linear" size="16" class="text-gray-500" />
                    </button>
                    <button @click="askDelete(food)" class="p-1.5 rounded-lg hover:bg-red-50 transition-colors">
                        <Icon name="solar:trash-bin-minimalistic-linear" size="16" class="text-red-400" />
                    </button>
                </div>

                <!-- Image -->
                <div class="w-full aspect-square rounded-xl bg-gray-100 overflow-hidden">
                  <img v-if="getFoodImage(food.name)" :src="getFoodImage(food.name)!" :alt="food.name" class="w-full h-full object-cover" />
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <Icon name="solar:bowl-linear" size="32" class="text-gray-300" />
                  </div>
                </div>

                <div>
                    <p class="font-semibold text-sm leading-tight">{{ food.name }}</p>
                    <p class="text-xs text-gray-400 mt-0.5">{{ food.category }}</p>
                </div>
                <p class="text-sm font-bold text-emerald-600">{{ food.quantity }} {{ t(`units.${food.unit}`) }}</p>
            </div>
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-20 text-gray-400">
            <Icon name="solar:fridge-outline" size="48" class="mx-auto mb-4 opacity-50" />
            <p class="text-sm">Votre frigidaire est vide</p>
            <p class="text-xs mt-1">Recherchez un aliment ci-dessus pour commencer</p>
        </div>

        <!-- ═══ Add Modal ═══ -->
        <Teleport to="body">
            <div v-if="showAddModal" class="modal-overlay" @click.self="showAddModal = false">
                <div class="modal">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-lg font-bold">Ajouter un aliment</h2>
                        <button @click="showAddModal = false" class="p-1 rounded-lg hover:bg-gray-100">
                            <Icon name="solar:close-circle-linear" size="22" />
                        </button>
                    </div>

                    <div class="flex flex-col gap-4">
                        <div>
                            <label class="label">Nom</label>
                            <input v-model="newFood.name" type="text" class="input" placeholder="Ex: Tomates" />
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="label">Quantité</label>
                                <input v-model.number="newFood.quantity" type="number" min="0" step="0.1"
                                    class="input" />
                            </div>
                            <div>
                                <label class="label">Unité</label>
                                <select v-model="newFood.unit" class="input">
                                    <option v-for="u in units" :key="u" :value="u">{{ t(`unitsLong.${u}`) }}</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="label">Catégorie</label>
                            <select v-model="newFood.category" class="input">
                                <option value="">-- Choisir --</option>
                                <option v-for="cat in fridgeStore.categories" :key="cat.id" :value="cat.slug">{{
                                    cat.name }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="label">Date d'expiration</label>
                            <input v-model="newFood.expiresAt" type="date" class="input" />
                        </div>
                    </div>

                    <button @click="submitAdd" :disabled="!newFood.name"
                        class="mt-6 w-full bg-black text-white rounded-xl py-2.5 text-sm font-medium hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                        Ajouter au frigidaire
                    </button>
                </div>
            </div>
        </Teleport>

        <!-- ═══ Edit Modal ═══ -->
        <Teleport to="body">
            <div v-if="showEditModal && editingFood" class="modal-overlay" @click.self="showEditModal = false">
                <div class="modal">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-lg font-bold">Modifier</h2>
                        <button @click="showEditModal = false" class="p-1 rounded-lg hover:bg-gray-100">
                            <Icon name="solar:close-circle-linear" size="22" />
                        </button>
                    </div>

                    <div class="flex flex-col gap-4">
                        <div>
                            <label class="label">Nom</label>
                            <input v-model="editingFood.name" type="text" class="input" />
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="label">Quantité</label>
                                <input v-model.number="editingFood.quantity" type="number" min="0" step="0.1"
                                    class="input" />
                            </div>
                            <div>
                                <label class="label">Unité</label>
                                <select v-model="editingFood.unit" class="input">
                                    <option v-for="u in units" :key="u" :value="u">{{ t(`unitsLong.${u}`) }}</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="label">Catégorie</label>
                            <select v-model="editingFood.category" class="input">
                                <option value="">-- Choisir --</option>
                                <option v-for="cat in fridgeStore.categories" :key="cat.id" :value="cat.slug">{{
                                    cat.name }}</option>
                            </select>
                        </div>
                        <div>
                            <label class="label">Date d'expiration</label>
                            <input v-model="editingFood.expiresAt" type="date" class="input" />
                        </div>
                    </div>

                    <button @click="submitEdit"
                        class="mt-6 w-full bg-black text-white rounded-xl py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors">
                        Enregistrer
                    </button>
                </div>
            </div>
        </Teleport>

        <!-- ═══ Delete Confirm ═══ -->
        <Teleport to="body">
            <div v-if="showDeleteConfirm && deletingFood" class="modal-overlay" @click.self="showDeleteConfirm = false">
                <div class="modal max-w-sm text-center">
                    <Icon name="solar:trash-bin-minimalistic-linear" size="40" class="text-red-400 mx-auto mb-4" />
                    <h2 class="text-lg font-bold mb-1">Supprimer ?</h2>
                    <p class="text-sm text-gray-500 mb-6">
                        « {{ deletingFood.name }} » sera retiré de votre frigidaire.
                    </p>
                    <div class="flex gap-3">
                        <button @click="showDeleteConfirm = false"
                            class="flex-1 border rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">
                            Annuler
                        </button>
                        <button @click="confirmDelete"
                            class="flex-1 bg-red-500 text-white rounded-xl py-2.5 text-sm font-medium hover:bg-red-600 transition-colors">
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
}

.modal {
    background: white;
    border-radius: 1.25rem;
    padding: 1.5rem;
    width: 100%;
    max-width: 28rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}

.label {
    display: block;
    font-size: 0.75rem;
    font-weight: 500;
    color: #6b7280;
    margin-bottom: 0.375rem;
}

.input {
    width: 100%;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    padding: 0.625rem 0.75rem;
    font-size: 0.875rem;
    outline: none;
    transition: border-color 0.15s;
}

.input:focus {
    border-color: #111827;
}
</style>
