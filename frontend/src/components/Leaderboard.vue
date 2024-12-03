<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
//import eltable

const props = defineProps({
  gameMode: String,
});

// Variable réactive pour les joueurs
const players = ref([]);

// Fonction pour récupérer les joueurs depuis l'API
const fetchPlayers = async () => {
  try {
    const response = await axios.get(`/api/${props.gameMode}/getLeaderboard`);
    players.value = response.data; // Met à jour les joueurs
  } catch (error) {
    console.error("Erreur lors de la récupération des joueurs :", error);
  }
};

// Récupération des données lors du montage du composant
onMounted(() => {
  fetchPlayers();
});
</script>

<template>
  <el-table :data="players" style="width: 100%" stripe>
    <el-table-column prop="username" label="Name"></el-table-column>
    <el-table-column prop="count" label="Score" sortable></el-table-column>
  </el-table>
</template>

<style>



</style>