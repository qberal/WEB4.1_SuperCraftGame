<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const backgroundItems = ref([]);
const assetNames = ["water.png","flame.png","dirt.png","air.png","stone.png","plant.png","lava.png","sand.png","ashes.png","steam.png","volcano.png","oasis.png","glass.png","dark_smoke.png","fog.png","cloud.png","swave2.png","tree.png","coal.png","heat.png","steam.png","volcano.png","axe.png","log.png","baguette.png","campfire.png","plain.png","ocean.png","planet.png","moon.png","bacteria.png","human.png","alien.png","village.png","bird.png","solar_system.png","torch.png","egg.png","fish.png"];

const createBackgroundItem = (index) => ({
  id: index,
  x: Math.random() * 100,
  y: Math.random() * 100,
  speed: 0.1 + Math.random() * 0.2,
  image: `/api/images/${assetNames[index]}`,
});

const animateBackground = () => {
  backgroundItems.value.forEach(item => {
    item.y += item.speed;
    if (item.y > 100) {
      item.y = -10;
      item.x = Math.random() * 100;
    }
  });
  requestAnimationFrame(animateBackground);
};

onMounted(() => {
  for (let i = 0; i < assetNames.length; i++) {
    backgroundItems.value.push(createBackgroundItem(i));
  }
  requestAnimationFrame(animateBackground);
});
</script>

<template>
  <div class="form-container">
    <div class="form">
      <h1>Super Craft Game</h1>
      <slot></slot>
      <router-view />
    </div>
  </div>
  <div class="background">
    <div v-for="item in backgroundItems" :key="item.id" class="background-item" :style="{ left: `${item.x}%`, top: `${item.y}%` }">
      <img :src="item.image" :alt="assetNames[item.id]" />
    </div>
  </div>
</template>

<style scoped>
h1 {
  display: flex;
  justify-content: center;
}



.form {
  margin: 10vh auto;
  background-color: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 750px;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f6d365, #fda085);
  z-index: -1;
  overflow: hidden;
}

.background-item {
  position: absolute;
  width: 100px;
  height: 100px;
  opacity: 0.7;
  transition: transform 0.3s ease-out;
}

.background-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.background-item:hover {
  transform: scale(1.2);
  opacity: 1;
}

@media (max-width: 768px) {
  .form {
    max-width: 90vw;
    padding: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  .background-item {
    width: 40px;
    height: 40px;
  }
}
</style>

