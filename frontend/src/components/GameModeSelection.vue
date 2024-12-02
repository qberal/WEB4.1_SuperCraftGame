<script setup>
import {ref} from "vue";

const props = defineProps({
  gameMode: String,
});

var name = '';
var description = '';
var otherMode = '';
var otherModeLink = '';

if (props.gameMode === 'infinity') {
  name = 'Infinity Mode';
  description = 'Find the word to win the game!';
  otherMode = 'Classic Mode';
  otherModeLink = '/normal';

} else {
  name = 'Classic Mode';
  description = 'Find all the elements to win the game!';
  otherMode = 'Infinity Mode';
  otherModeLink = '/infinity';
}

defineEmits(['open-leaderboard', 'open-settings']);

let extraSettingOpened = ref(false);


</script>

<template>

  <div class="game-mode-status-bar" @click="extraSettingOpened = !extraSettingOpened">
    <div class="game-mode">
      <p>{{ name }}</p>
    </div>
  </div>

  <div class="select-mode" v-if="extraSettingOpened">
    <p>{{ description }}</p>
    <a :href="otherModeLink">Switch to {{otherMode}}</a>
  </div>

</template>

<style scoped>

.game-mode-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #BBB;
  background: #ECECEC;
  box-shadow: 0px 4px 16.3px 0px rgba(49, 49, 49, 0.25);
}

.game-mode {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.select-mode {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 10px;
  margin-top: 5px;
  gap: 5px;
  border-radius: 10px;
  border: 1px solid #BBB;
  background: #ECECEC;
  box-shadow: 0px 4px 16.3px 0px rgba(49, 49, 49, 0.25);
}

a {
  text-decoration: underline;
  color: black;
}

a:hover {
  cursor: pointer;
  font-size: 1.1em;
}

.score {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}

</style>