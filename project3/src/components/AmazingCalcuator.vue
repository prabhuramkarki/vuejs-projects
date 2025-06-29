<script setup>
import { ref, computed } from "vue";

const display = ref("0");

const appendToDisplay = (value) => {
  if (display.value === "0" && value !== ".") {
    display.value = value;
  } else {
    display.value += value;
  }
};

const calculate = () => {
  try {
    display.value = eval(display.value).toString();
  } catch (error) {
    display.value = "Error";
  }
};

// computed property
const displayClass = computed(() => {
  return display.value.length > 12 ? "small-text" : "";
});

const clearDisplay = () => {
  display.value = "0";
};
</script>

<template>
  <div>
    <div class="calculator">
      <input v-model="display" :class="displayClass" readonly />

      <div class="buttons">
        <button @click="appendToDisplay('7')">7</button>
        <button @click="appendToDisplay('8')">8</button>
        <button @click="appendToDisplay('9')">9</button>
        <button @click="appendToDisplay('/')">/</button>

        <button @click="appendToDisplay('4')">4</button>
        <button @click="appendToDisplay('5')">5</button>
        <button @click="appendToDisplay('6')">6</button>
        <button @click="appendToDisplay('*')">*</button>

        <button @click="appendToDisplay('1')">1</button>
        <button @click="appendToDisplay('2')">2</button>
        <button @click="appendToDisplay('3')">3</button>
        <button @click="appendToDisplay('-')">-</button>

        <button @click="appendToDisplay('0')">0</button>
        <button @click="appendToDisplay('.')">.</button>
        <button @click="calculate()">=</button>
        <button @click="appendToDisplay('+')">+</button>
      </div>
        <button @click="clearDisplay()" class="clear-button">C</button>

    </div>
  </div>
</template>

<style scoped>
.calculator {
  max-width: 320px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

input {
  width: 87%;
  padding: 20px;
  font-size: 24px;
  text-align: right;
  border: none;
  border-radius: 12px;
  background-color: #f2f2f2;
  margin-bottom: 20px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
}

input:focus {
  outline: none;
}

.small-text {
  font-size: 18px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

button {
  padding: 16px;
  font-size: 18px;
  border: none;
  border-radius: 12px;
  background-color: #f0f0f0;
  transition: background-color 0.2s ease, transform 0.1s ease;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

button:hover {
  background-color: #dcdcdc;
}

button:active {
  transform: scale(0.95);
}

.clear-button {
  width: 100%;
  margin-top: 16px;
  padding: 16px;
  background-color: #ff4d4d;
  color: white;
  font-weight: bold;
  border-radius: 12px;
}

.clear-button:hover {
  background-color: #e04343;
}
</style>
