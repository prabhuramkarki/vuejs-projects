<script setup>
import { ref } from "vue";
import axios from "axios";

const jokes = ref(null);

const fetchJokes = async () => {
  try {
    const response = await axios.get("https://icanhazdadjoke.com", {
      headers: { Accept: "application/json" },
    });
    jokes.value = response.data.joke;
  } catch (error) {
    console.log("Error fetching data", error);
  }
};
</script>

<template>
  <div class="jokes-container">
    <h2 class="jokes-title">Random Jokes</h2>
    <button @click="fetchJokes" class="get-joke-button">Get Joke</button>

    <div v-if="jokes" class="joke">{{ jokes }}</div>
  </div>
</template>

<style scoped>
.jokes-container {
  max-width: 420px;
  margin: 60px auto;
  padding: 2rem 2.5rem;
  background: #fefefe;
  border-radius: 14px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
  color: #2e2e2e;
}

.jokes-title {
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1.2rem;
  letter-spacing: 0.3px;
  color: #3b3b3b;
}

.get-joke-button {
  background: #6c63ff;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.65rem 1.5rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(108, 99, 255, 0.3);
  transition: background-color 0.3s ease, transform 0.15s ease;
  user-select: none;
}

.get-joke-button:hover {
  background: #574fd6;
}

.get-joke-button:active {
  transform: scale(0.95);
  box-shadow: 0 4px 10px rgba(87, 79, 214, 0.5);
}

.joke {
  margin-top: 1.8rem;
  padding: 1.2rem 1.5rem;
  font-size: 1.1rem;
  line-height: 1.5;
  color: #444;
  background: #f5f5ff;
  border-radius: 12px;
  box-shadow: inset 0 2px 6px rgba(108, 99, 255, 0.1);
  user-select: text;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
