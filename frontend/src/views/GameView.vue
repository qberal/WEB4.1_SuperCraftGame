<script setup>

import PlayerStatusBar from "@/components/PlayerStatusBar.vue";
import InventoryPanel from "@/components/inventory/InventoryPanel.vue";
import SimpleButton from "@/components/buttons/SimpleButton.vue";
import GameCanvas from "@/components/GameCanvas.vue";

const inventory = [
  {id: 1, icon: "/favicon.svg", name: "Item 1"},
  {id: 2, icon: "/favicon.svg", name: "Item 2"},
  {id: 3, icon: "/favicon.svg", name: "Item 3"},
  {id: 4, icon: "/favicon.svg", name: "Item 4"},
  {id: 5, icon: "/favicon.svg", name: "Item 5"},
];


</script>

<template>
  <div class="layout">
    <!-- Barre de statut en bas à gauche -->
    <div class="status-bar">
      <PlayerStatusBar
          name="Player 1"
          profilePicture="src/assets/img/person.fill.placeholder.svg"
          score="100"
          maxScore="200"
      />
    </div>

    <!-- Inventaire à droite -->
    <div class="inventory">
      <InventoryPanel :inventory="inventory"/>
    </div>

    <!-- Canvas de jeu -->
    <div class="game-canvas">
      <GameCanvas/>
    </div>


    <!-- Bouton en bas avant l'inventaire -->
    <div class="button-container">
      <SimpleButton icon="src/assets/img/paintbrush.svg"/>
    </div>
  </div>
</template>

<style scoped>
body {
  overflow: hidden;
}

.status-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 20px;
  width: 20vw;
  z-index: 90;
}

.inventory {
  position: absolute;
  top: 0;
  right: 0;
  width: 20%; /* Prend 20% de la largeur de l'écran */
  padding: 20px;
  height: 98%;
  border-radius: 10px;
  border: 1px solid #BBB;
  background: #ECECEC;
  box-shadow: 0px 4px 16.3px 0px rgba(49, 49, 49, 0.25);
  margin: 10px 10px 10px 0;
  z-index: 90;
}

.button-container {
  position: absolute;
  right: 20%;
  bottom: 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 90;
}

.game-canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
}

</style>