<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const users = ref([]);
const newUser = ref({ name: "", email: "" });
const editingUser = ref(null);
const API_URL = "http://localhost:3000/users";

const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  users.value = response.data;
};

const addUser = async () => {
  await axios.post(API_URL, newUser.value);
  await fetchUsers();
  newUser.value = { name: "", email: "" };
};

const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  await fetchUsers();
};

const editUser = (user) => {
  editingUser.value = { ...user };
};

const updateUser = async () => {
  await axios.put(`${API_URL}/${editingUser.value.id}`, editingUser.value);
  await fetchUsers();
  editingUser.value = null;
};

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="min-h-screen bg-black text-white flex flex-col items-center justify-start p-6 gap-8">
    <h1 class="text-3xl font-bold">Vue 3 CRUD App</h1>

    <!-- Add User Form -->
    <div class="form-container w-full max-w-md">
      <form class="form" @submit.prevent="addUser">
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="newUser.name" type="text" id="name" required placeholder="Enter Name" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="newUser.email" type="email" id="email" required placeholder="Enter Email" />
        </div>
        <button class="form-submit-btn" type="submit">Add User</button>
      </form>
    </div>

    <!-- User List -->
    <ul class="w-full max-w-md space-y-4">
      <li
        v-for="user in users"
        :key="user.id"
        class="bg-[#212121] border border-[#414141] rounded-xl p-4 flex justify-between items-center"
      >
        <div>
          <p class="font-semibold">{{ user.name }}</p>
          <p class="text-sm text-gray-400">{{ user.email }}</p>
        </div>
        <div class="flex gap-2">
          <button @click="editUser(user)" class="form-submit-btn">Edit</button>
          <button
            @click="deleteUser(user.id)"
            class="form-submit-btn hover:bg-red-500 hover:text-white"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>

    <!-- Edit User Form -->
    <div v-if="editingUser" class="form-container w-full max-w-md">
      <form class="form" @submit.prevent="updateUser">
        <div class="form-group">
          <label for="editName">Edit Name</label>
          <input v-model="editingUser.name" id="editName" type="text" />
        </div>
        <div class="form-group">
          <label for="editEmail">Edit Email</label>
          <input v-model="editingUser.email" id="editEmail" type="email" />
        </div>
        <button class="form-submit-btn" type="submit">Update User</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  background: linear-gradient(#212121, #212121) padding-box,
    linear-gradient(145deg, transparent 35%, #e81cff, #40c9ff) border-box;
  border: 2px solid transparent;
  padding: 32px 24px;
  font-size: 14px;
  font-family: inherit;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  border-radius: 16px;
}

.form-container .form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-container .form-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.form-container .form-group label {
  color: #717171;
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 4px;
}

.form-container .form-group input {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  color: #fff;
  background-color: transparent;
  border: 1px solid #414141;
}

.form-container .form-group input:focus {
  outline: none;
  border-color: #e81cff;
}

.form-container .form-group input::placeholder {
  opacity: 0.5;
}

.form-submit-btn {
  align-self: flex-start;
  font-family: inherit;
  font-weight: 600;
  color: #717171;
  background: #313131;
  border: 1px solid #414141;
  padding: 12px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.form-submit-btn:hover {
  background-color: #fff;
  color: #000;
  border-color: #fff;
}

.form-submit-btn:active {
  scale: 0.95;
}
</style>
