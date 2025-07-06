<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-200 px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
      <h1 class="text-3xl font-bold text-center mb-6">🔗 URL Shortener</h1>

      <input
        v-model="longUrl"
        type="url"
        placeholder="Paste your long URL here"
        class="w-full px-4 py-2 mb-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        @click="shortenUrl"
        class="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition"
      >
        Shorten URL
      </button>

      <div v-if="shortUrl" class="mt-6 text-center">
        <p class="text-sm text-gray-600 mb-1">Shortened URL:</p>
        <div class="flex items-center justify-center gap-2">
          <a
            :href="shortUrl"
            target="_blank"
            class="text-blue-600 underline break-all"
          >
            {{ shortUrl }}
          </a>
          <button @click="copyToClipboard" class="text-sm text-white bg-green-500 px-2 py-1 rounded hover:bg-green-600">
            Copy
          </button>
        </div>
        <p v-if="copied" class="text-green-600 text-sm mt-2">Copied!</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      longUrl: '',
      shortUrl: '',
      copied: false
    }
  },
  methods: {
    async shortenUrl() {
      this.copied = false
      if (!this.longUrl) return alert('Please enter a valid URL.')

      const accessToken = '0c2cf14808225328f11fa1474242226e8c21c427' // Replace this
      const endpoint = 'https://api-ssl.bitly.com/v4/shorten'

      try {
        const response = await axios.post(
          endpoint,
          {
            long_url: this.longUrl
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          }
        )

        this.shortUrl = response.data.link
      } catch (error) {
        alert('Failed to shorten URL. Check the link or your token.')
        console.error(error)
      }
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.shortUrl)
      this.copied = true
    }
  }
}
</script>
