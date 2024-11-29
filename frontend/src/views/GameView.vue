<script setup>

import PlayerStatusBar from "@/components/PlayerStatusBar.vue";
import InventoryPanel from "@/components/inventory/InventoryPanel.vue";
import SimpleButton from "@/components/buttons/SimpleButton.vue";
import {reactive, ref} from "vue";
import PopUpMenu from "@/components/PopUpMenu.vue";
import Leaderboard from "@/components/Leaderboard.vue";
import GameCanvas from "@/components/canvas/GameCanvas.vue";

const props = defineProps({
  gameMode: String,
});

const inventory = reactive([
  {id: 1, icon: "/wind.svg", name: "Air"},
  {id: 2, icon: "/flame.svg", name: "Fire"},
  {id: 3, icon: "/globe.europe.africa.svg", name: "Earth"},
  {id: 4, icon: "/drop.svg", name: "Water"},
]);

const addToInventory = (item) => {
  if (inventory.find(i => i.name === item.name && i.icon === item.icon)) {
    return;
  }

  inventory.push({
    id: inventory.length + 1,
    icon: item.icon,
    name: item.name,
  });
};

const players = [
  {id: 1, name: "Player 1", score: 100},
  {id: 2, name: "Player 2", score: 200},
  {id: 3, name: "Player 3", score: 300},
  {id: 4, name: "Player 4", score: 400},
  {id: 5, name: "Player 5", score: 500},
];

let cleanUpToggle = ref(false)

let openLeaderboard = ref(false)
let openSettings = ref(false)



</script>

<template>
  <div class="layout">
    <!-- Barre de statut en bas à gauche -->
    <div class="status-bar">
      <PlayerStatusBar
          name="Player 1"
          profilePicture="src/assets/img/person.fill.placeholder.svg"
          score="100"
          maxScore="100"
          @open-leaderboard="openLeaderboard = !openLeaderboard"
          @open-settings="openSettings = !openSettings"
      />
    </div>

    <!-- Inventaire à droite -->
    <div class="inventory">
      <InventoryPanel :inventory="inventory" :game-mode="props.gameMode"/>
    </div>

    <!-- Canvas de jeu -->
    <div class="game-canvas">
      <GameCanvas :clean-up-action="cleanUpToggle" :game-mode="props.gameMode" @fusion-completed="addToInventory"/>
    </div>


    <!-- Bouton en bas avant l'inventaire -->
    <div class="button-container">
      <SimpleButton icon="src/assets/img/paintbrush.svg" @cleanUp="cleanUpToggle = !cleanUpToggle"/>
    </div>

    <!-- PopUps -->
    <PopUpMenu title="Leaderboard" :show="openLeaderboard" @close="openLeaderboard = false">
      <Leaderboard :players="players"/>
    </PopUpMenu>

    <PopUpMenu title="Settings" :show="openSettings" @close="openSettings = false">
      <p>Settings (WIP)</p>
    </PopUpMenu>


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

.layout {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

</style>