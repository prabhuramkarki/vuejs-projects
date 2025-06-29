<script setup>
import { ref } from "vue";

const searchQuery = ref("");
const searchResults = ref([]);
const isLoading = ref(false);
const error = ref(null);
const isDarkTheme = ref(false);

const search = async (query) => {
  const encodedQuery = encodeURIComponent(query);
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${encodedQuery}`;
  try {
    isLoading.value = true;
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.query && data.query.search) {
      searchResults.value = data.query.search;
      error.value = null;
    } else {
      searchResults.value = [];
      error.value = "No results found";
    }
  } catch (err) {
    console.error("Error fetching data", err);
    searchResults.value = [];
    error.value = "An error occurred while fetching data";
  } finally {
    isLoading.value = false;
  }
};

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
};

const submitSearch = () => {
  if (searchQuery.value.trim() !== "") {
    search(searchQuery.value);
  } else {
    searchResults.value = [];
    error.value = "Please enter a valid search item";
  }
};
</script>

<template>
  <div :class="isDarkTheme ? 'dark bg-gray-900 text-white min-h-screen' : 'bg-white text-gray-900 min-h-screen'">
    <div class="max-w-3xl mx-auto p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-4xl font-bold">Search Articles</h1>
        <button @click="toggleTheme" class="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-sm font-medium">
          {{ isDarkTheme ? "Light Mode" : "Dark Mode" }}
        </button>
      </div>

      <!-- Search Form -->
      <form @submit.prevent="submitSearch" class="flex gap-4 mb-8">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
        />
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      <!-- Loading -->
      <div v-if="isLoading" class="text-center text-lg font-semibold">Loading...</div>

      <!-- Error -->
      <div v-if="error" class="text-red-500 text-center mb-4">{{ error }}</div>

      <!-- Results -->
      <div v-if="searchResults.length">
        <div
          v-for="result in searchResults"
          :key="result.pageid"
          class="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow transition"
        >
          <h2 class="text-xl font-semibold text-blue-600 dark:text-blue-400">
            <a
              :href="`https://en.wikipedia.org/?curid=${result.pageid}`"
              target="_blank"
              rel="noopener"
            >
              {{ result.title }}
            </a>
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            <a
              :href="`https://en.wikipedia.org/?curid=${result.pageid}`"
              target="_blank"
              rel="noopener"
              class="underline"
            >
              https://en.wikipedia.org/?curid={{ result.pageid }}
            </a>
          </p>
          <p class="mt-2 text-gray-800 dark:text-gray-200" v-html="result.snippet"></p>
        </div>
      </div>
    </div>
  </div>
</template>
