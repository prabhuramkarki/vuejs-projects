<script setup>
import { ref } from "vue";

const newTask = ref('')
const tasks = ref([])

const addTask = () => {
  if (newTask.value.trim() !== "") {
    tasks.value.push(newTask.value);
    newTask.value = "";
  }
};

const removeTask = (index) => {
  tasks.value.splice(index, 1);
};
</script>

<template>
  <div class="todo-app">
    <div class="task-input">
      <input
        v-model="newTask"
        @keyup.enter="addTask"
        placeholder="Add New Todo"
      />
      <button @click="addTask">Add Todo</button>
    </div>

    <!-- for rendering task -->

    <ul class="task-list">
      <li v-for="(task, index) in tasks" :key="index" class="task-item">
        {{ task }}
        <button @click="removeTask(index)" class="remove-button">Remove</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.todo-app {
  max-width: 420px;
  margin: 60px auto;
  padding: 2rem;
  border-radius: 1rem;
  background: #ffffff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  font-family: Arial, sans-serif;
}

.app-title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: 600;
}

.task-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.task-input input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border 0.2s;
}

.task-input input:focus {
  border-color: #007bff;
  outline: none;
}

.task-input button {
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.5rem;
  background: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
}

.task-input button:hover {
  background: #0056b3;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 1rem;
  margin-bottom: 0.5rem;
  background: #fafafa;
  border-radius: 0.5rem;
  border: 1px solid #eee;
  transition: box-shadow 0.2s;
}

.task-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.remove-button {
  background: none;
  border: none;
  color: #ff5c5c;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 0.5rem;
  border-radius: 0.3rem;
  transition: background 0.2s;
}

.remove-button:hover {
  background: rgba(255, 92, 92, 0.1);
}
</style>