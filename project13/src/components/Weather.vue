<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-blue-500 text-gray-900 px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
      <h1 class="text-3xl font-bold text-center mb-6">☁️ Weather App</h1>

      <div class="flex gap-2 mb-4">
        <input
          v-model="city"
          placeholder="Enter city name"
          class="flex-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          @click="getWeather"
          class="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      <div v-if="weather" class="text-center mt-6">
        <img
          :src="getIconUrl(weather.weather[0].icon)"
          :alt="weather.weather[0].main"
          class="w-24 mx-auto"
        />
        <h2 class="text-2xl font-semibold mt-2">{{ weather.name }}</h2>
        <p class="text-lg mt-1">🌡️ {{ weather.main.temp }}°C</p>
        <p class="capitalize text-gray-600 mt-1">
          🌀 {{ weather.weather[0].description }}
        </p>
        <p class="text-sm text-gray-500 mt-1">
          💨 Wind: {{ weather.wind.speed }} m/s
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      city: '',
      weather: null
    }
  },
  methods: {
    async getWeather() {
      if (!this.city) return
      const apiKey = '20d250de5fdba57cfed241d89456fac4' 
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}&units=metric`
      try {
        const response = await axios.get(url)
        this.weather = response.data
      } catch (error) {
        alert('City not found!')
        console.error(error)
      }
    },
    getIconUrl(iconCode) {
      return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    }
  }
}
</script>
