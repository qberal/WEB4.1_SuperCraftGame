<script setup>
import InventoryItem from "@/components/inventory/InventoryItem.vue";
import { reactive, ref, computed } from 'vue';

defineProps({
  inventory: Array,
});

// inventory data
const inventory = reactive([
  { id: 1, icon: "/favicon.svg", name: "Air" },
  { id: 2, icon: "/favicon.svg", name: "Water" },
  { id: 3, icon: "/favicon.svg", name: "Cloud" },
  { id: 4, icon: "/favicon.svg", name: "Steam" },
  { id: 5, icon: "/favicon.svg", name: "Electricity" },
]);

const clickedItemId = ref(null);

const updateClickedItem = (id) => {
  clickedItemId.value = id;
};

const isSearchVisible = ref(false);

const toggleSearch = () => {

  if(isSearchVisible.value){
    searchQuery.value = '';
  }

  isSearchVisible.value = !isSearchVisible.value;

};

const searchQuery = ref('');

const filteredInventory = computed(() => {
  let sortedInventory = [...inventory].sort((a, b) =>
      a.name.localeCompare(b.name)
  );

  if (!searchQuery.value) return sortedInventory;

  return sortedInventory.filter(item =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div>
    <div class="inventory-header">
      <h3 v-if="!isSearchVisible">Inventory</h3>

      <input
          type="text"
          v-if="isSearchVisible"
          placeholder="Search inventory"
          v-model="searchQuery"
      />

      <img
          class="search-button"
          src="../../assets/img/magnifyingglass.svg"
          alt="magnifying glass icon"
          @click="toggleSearch"
      >
    </div>

    <div class="inventory">
      <InventoryItem
          v-for="item in filteredInventory"
          :key="item.id"
          :icon="item.icon"
          :name="item.name"
          :isClicked="item.id === clickedItemId"
          @click="updateClickedItem(item.id)"
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
  flex-direction: column;
  max-height: 80vh;
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
</style>