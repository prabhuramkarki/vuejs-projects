<script setup>
import { ref } from "vue";

const passwordLength = ref(12);
const includeUppercase = ref(true);
const includeNumbers = ref(true);
const includeSymbols = ref(true);
const generatedPassword = ref("");

const generatePassword = () => {
  const lowercaseChars = "abcdefghijklmnoqrstuvwxyz";
  const uppercaseChars = includeUppercase.value
    ? "ABCDEFGHIJKLMOPQRSTUVWXYZ"
    : "";
  const numberChars = includeNumbers.value ? "0123456789" : "";
  const symbolChars = includeSymbols.value ? "!@#$%^&*()_+[]{}|;:,.<>?/~`" : "";

  const allChars = lowercaseChars + uppercaseChars + numberChars + symbolChars;

  let password = "";

  for (let i = 0; i < passwordLength.value; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  generatedPassword.value = password;
};
</script>
<template>
  <div class="password-generator-container">
    <h2 class="password-generator-title">🔐 Random Password Generator</h2>

    <div class="form-group">
      <label for="length">Password Length</label>
      <input
        type="number"
        id="length"
        v-model="passwordLength"
        min="4"
        max="32"
      />
    </div>

    <div class="form-group checkbox-group">
      <label><input type="checkbox" v-model="includeUppercase" /> Include Uppercase</label>
      <label><input type="checkbox" v-model="includeNumbers" /> Include Numbers</label>
      <label><input type="checkbox" v-model="includeSymbols" /> Include Symbols</label>
    </div>

    <button @click="generatePassword" class="generated-button">Generate Password</button>

    <div v-if="generatedPassword" class="password-output">
      <strong>Your Password:</strong>
      <span class="password">{{ generatedPassword }}</span>
    </div>
  </div>
</template>


<style scoped>
.password-generator-container {
  max-width: 400px;
  margin: 60px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', Tahoma, sans-serif;
}

.password-generator-title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: #1e3a8a;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 18px;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

label {
  font-size: 0.95rem;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

input[type="number"] {
  width: 95%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  background-color: #f9fafb;
}

input[type="number"]:focus {
  border-color: #3b82f6;
  background-color: #fff;
  outline: none;
}

input[type="checkbox"] {
  accent-color: #3b82f6;
  width: 16px;
  height: 16px;
}

.generated-button {
  width: 100%;
  padding: 14px;
  background-color: #3b82f6;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.25s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
}

.generated-button:hover {
  background-color: #2563eb;
}

.password-output {
  margin-top: 24px;
  padding: 14px;
  background-color: #f0f9ff;
  border: 1px solid #93c5fd;
  border-radius: 10px;
  text-align: center;
  word-break: break-word;
}

.password-output strong {
  color: #1d4ed8;
  display: block;
  margin-bottom: 6px;
}

.password {
  font-family: monospace;
  font-size: 1.1rem;
  color: #111827;
}
</style>
