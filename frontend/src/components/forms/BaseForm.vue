<script setup>
import { reactive, ref } from "vue";
import axios from "axios";

const props = defineProps({
  endpoint: {
    type: String,
    required: true,
  },
  title: String,
  submitLabel: String,
});

const emit = defineEmits(['submit']);

const formData = reactive({});
const errors = ref(null);
const loading = ref(false);

const handleSubmit = async () => {

  console.log("Formulaire soumis : ", { formData });
  console.log("Valeur de endpoint :", props.endpoint);

  loading.value = true;
  errors.value = null;

  try {
    const response = await axios.post(props.endpoint, formData);
    console.log("Réponse du backend :", response.data);
    emit('submit', response);
  } catch (error) {
    console.error("Erreur lors de la soumission :", error);
    errors.value = error.response?.data?.message || "Une erreur est survenue.";
  } finally {
    loading.value = false;
  }
};

</script>

<template>
  <h3>{{ title }}</h3>

  <div>
    <form @submit.prevent="handleSubmit">
      <slot name="fields" :formData="formData"></slot>
      <button type="submit" :disabled="loading">{{ submitLabel }}</button>
      <p v-if="errors" class="error">{{ errors }}</p>
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