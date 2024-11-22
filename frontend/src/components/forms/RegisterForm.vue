<script setup>
import BaseForm from './BaseForm.vue'
</script>

<template>
  <BaseForm title="Register" submitLabel="Register">
    <template #fields>
      <label for="username">Username
        <input type="text" id="username" name="username" required />
      </label>
      <label for="email">Email
        <input type="email" id="email" name="email" required />
      </label>
      <label for="password">Password
        <input type="password" id="password" name="password" required />
      </label>
      <label for="password-confirm">Confirm Password
        <input type="password" id="password-confirm" name="password-confirm" required />
      </label>
    </template>

    <template #links>
      <p>Already have an account? <a href="/login">Login</a></p>
    </template>
  </BaseForm>
</template>