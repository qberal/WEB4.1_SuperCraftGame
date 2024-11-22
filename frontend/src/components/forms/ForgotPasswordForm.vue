<script setup>
import BaseForm from "@/components/forms/BaseForm.vue";

</script>

<template>
  <BaseForm title="Forgot Password" submitLabel="Reset Password">
    <template #fields>
      <label for="email">Email
        <input type="email" id="email" name="email" required />
      </label>
    </template>

    <template #links>
      <p>Remembered your password? <a href="/login">Login</a></p>
    </template>
  </BaseForm>
</template>
