<script setup>
import { ref } from "vue";
const username = ref("");
const userProfile = ref(null);
const error = ref(null);

const getUserProfile = async () => {
  try {
    const response = await fetch(
     `https://api.github.com/users/${username.value}`);
    const data = await response.json();

    if (response.ok) {
      userProfile.value = data;
      error.value = null;
    } else {
      userProfile.value = null;
      error.value = `Error ${data.message}`;
    }
  } catch (error) {
    console.log("Error fetching data", error);
  }
};
</script>

<template>
  <div class="github-profile-viewer">
    <h1 class="app-title">Github User Profile Finder</h1>
    <div class="input-container">
      <input
        v-model="username"
        placeholder="Enter Github username"
        @input="getUserProfile"
      />
    </div>
    <div v-if="userProfile" class="user-profile">
      <img :src="userProfile.avatar_url" alt="userProfile.login" />
      <div class="user-details">
        <p><strong>Name:</strong>{{ userProfile.login }}</p>
        <p><strong>Location:</strong>{{ userProfile.location }}</p>
        <p><strong>Followers:</strong>{{ userProfile.followers }}</p>
        <p><strong>Following:</strong>{{ userProfile.following }}</p>
        <p><strong>Public Repos:</strong>{{ userProfile.public_repos }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.github-profile-viewer {
  max-width: 420px;
  margin: 50px auto;
  padding: 24px;
  background: linear-gradient(135deg, #f9f9f9, #ffffff);
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  text-align: center;
  font-family: "Segoe UI", Arial, sans-serif;
  transition: box-shadow 0.3s ease;
}

.github-profile-viewer:hover {
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.12);
}

.app-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 24px;
  color: #222;
}

.input-container {
  margin-bottom: 24px;
}

input {
  width: 80%;
  padding: 12px 16px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 9999px;
  background: #fafafa;
  transition: all 0.2s ease;
}

input:focus {
  border-color: #0078ff;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(0, 120, 255, 0.1);
  outline: none;
}

.user-profile {
  margin-top: 24px;
}

img {
  width: 128px;
  border-radius: 50%;
  border: 4px solid #0078ff22;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
}

.user-details {
  text-align: left;
  padding: 0 16px;
}

.user-details p {
  font-size: 0.95rem;
  color: #444;
  margin-bottom: 8px;
  line-height: 1.4;
}

.user-details strong {
  color: #0078ff;
  margin-right: 6px;
  font-weight: 500;
}

.error-message {
  color: #e74c3c;
  margin-top: 16px;
  font-size: 1rem;
}

</style>
