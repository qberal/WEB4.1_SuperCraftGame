<script setup>
import {defineProps} from 'vue'

defineProps({
  title: String,
  submitLabel: String,
});
</script>

<template>
  <h3>{{ title }}</h3>

  <div>
    <form>
      <slot name="fields"></slot>

      <button type="submit">{{ submitLabel }}</button>
    </form>
  </div>

  <div class="form-extra">
    <slot name="links"></slot>
  </div>
</template>

<style scoped>
h3 {
  display: flex;
  justify-content: center;
  margin-bottom: 64px;
}

.form-extra {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}
</style>