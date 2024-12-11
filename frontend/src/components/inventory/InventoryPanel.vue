<script setup>
import InventoryItem from "@/components/inventory/InventoryItem.vue";
import {ref, computed, nextTick} from "vue";

const props = defineProps({
  inventory: Array,
  gameMode: String,
});

// Search bar visibility
const isSearchVisible = ref(false);
const searchQuery = ref("");
const inputRef = ref(null); // Référence pour l'input

const toggleSearch = () => {
  if (isSearchVisible.value) {
    searchQuery.value = ""; // Réinitialise la recherche
    isSearchVisible.value = false;
  } else {
    isSearchVisible.value = true;

    // Utilise nextTick pour s'assurer que l'input est dans le DOM
    nextTick(() => {
      inputRef.value?.focus();
    });
  }
};

// Search functionality
const filteredInventory = computed(() => {
  let sortedInventory = [...props.inventory].sort((a, b) =>
      a.name.localeCompare(b.name)
  );

  if (!searchQuery.value) return sortedInventory;

  return sortedInventory.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div>
    <div class="inventory-header">
      <h3 v-if="!isSearchVisible">Inventory</h3>

      <transition name="fade">
        <input
            ref="inputRef"
            type="text"
            v-if="isSearchVisible"
            placeholder="Search inventory"
            v-model="searchQuery"
        />
      </transition>

      <img
          class="search-button"
          src="/assets/search.svg"
          alt="magnifying glass icon"
          @click="toggleSearch"
      />
    </div>

    <div class="inventory">
      <InventoryItem
          v-for="item in filteredInventory"
          :key="item.id"
          :id="item.id"
          :icon="item.icon"
          :name="item.name"
          :gameMode="gameMode"
          :color="item.color"
      />
    </div>
  </div>
</template>

<style scoped>
.inventory-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.inventory {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 90vh;
  overflow-y: auto;
}

.search-button {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}

input {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #BBB;
}

h3 {
  font-size: 20px;
  transition: opacity 0.3s ease;
  height: 34px;
}

/* Animation pour la barre de recherche */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}


</style>