<script setup>
import { useRouter } from 'vue-router';
import BaseForm from './BaseForm.vue'

const router = useRouter();

/**
 * Handle redirection after form submission
 * @param response
 */
const handleFormSubmit = (response) => {
  if (response && response.status === 201) {
    router.push('/login');
  } else {
    console.error("Erreur lors de l'enregistrement ou réponse inattendue.");
  }
};
</script>

<template>
  <BaseForm endpoint="/api/register" title="Register" submitLabel="Register" @submit="handleFormSubmit">
    <template #fields="{ formData }">
      <label for="username">Username
        <input type="text" v-model="formData.username" id="username" name="username" required />
      </label>
      <label for="email">Email
        <input type="email" v-model="formData.email" id="email" name="email" required />
      </label>
      <label for="password">Password
        <input type="password" v-model="formData.password" id="password" name="password" required />
      </label>
      <label for="passwordConfirm">Confirm Password
        <input type="password" v-model="formData.passwordConfirm" id="passwordConfirm" name="passwordConfirm" required />
      </label>
    </template>

    <template #links>
      <p>Already have an account? <a href="/login">Login</a></p>
    </template>
  </BaseForm>
</template>