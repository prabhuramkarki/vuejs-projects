<script setup>
import { ref, computed } from "vue";

const formData = ref({
  name: "",
  email: "",
  password: "",
});

const isNameValid = computed(() => formData.value.name.trim() !== "");
const isEmailValid = computed(() =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)
);
const isPasswordValid = computed(() => formData.value.password.length >= 8);

const isFormValid = computed(
  () => isNameValid.value && isEmailValid.value && isPasswordValid.value
);

const submitForm = () => {
  if (isFormValid.value) {
    console.log("Form Submitted", formData.value);
  } else {
    console.log("Form is invalid");
  }
};
</script>
<template>
  <div>
    <form @submit.prevent="submitForm()" class="custom-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input v-model="formData.name" type="text" id="name" />
        <span v-if="!isNameValid" class="error"> Name is required </span>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="formData.email" type="text" id="email" />
        <span v-if="!isEmailValid" class="error">
          Please enter the valid email</span
        >
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input v-model="formData.password" type="password" id="password " />
        <span v-if="!isPasswordValid" class="error">
          Password must be atleast 8 characters</span
        >
      </div>

      <button type="submit" :disabled="!isFormValid" class="submit-button">
        Submit
      </button>
    </form>
  </div>
</template>

<style scoped>
.custom-form {
  max-width: 450px;
  margin: 60px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.form-group {
  margin-bottom: 24px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
  font-size: 16px;
}

input {
  width: 92%;
  padding: 12px 16px;
  font-size: 15px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #f9f9f9;
  transition: border-color 0.3s, background-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #3498db;
  background-color: #fff;
}

.error {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 6px;
  display: block;
  transition: opacity 0.3s ease;
}

.submit-button {
  width: 100%;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
  box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
}

.submit-button:hover:not(:disabled) {
  background-color: #2c80b4;
}

.submit-button:active:not(:disabled) {
  transform: scale(0.97);
}

.submit-button:disabled {
  background-color: #d0d7dd;
  cursor: not-allowed;
  box-shadow: none;
}
</style>
