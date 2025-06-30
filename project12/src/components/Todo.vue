<script setup>
import { ref, computed } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import { useToast } from 'vue-toastification'

// Initialize toast
const toast = useToast()

const todoStore = useTodoStore()

const newName = ref('')
const newDescription = ref('')

const filter = ref('all')

const filteredTodos = computed(() => {
  if (filter.value === 'todo') {
    return todoStore.todos.filter((todo) => !todo.completed)
  } else if (filter.value === 'done') {
    return todoStore.todos.filter((todo) => todo.completed)
  } else {
    return todoStore.todos
  }
})

function addNewTask() {
  if (newName.value.trim()) {
    todoStore.addTodo({
      name: newName.value,
      description: newDescription.value,
      completed: false,
    })
    toast.success('Task added')
    newName.value = ''
    newDescription.value = ''
  }
}

function getOriginalIndex(todo) {
  return todoStore.todos.findIndex((t) => t === todo)
}

function toggleTodoStatus(todo) {
  const index = getOriginalIndex(todo)
  todoStore.toggleTodo(index)
  toast.success(todo.completed ? 'Marked as To-Do' : 'Marked as Done')
}

function deleteTask(todo) {
  const index = getOriginalIndex(todo)
  todoStore.deleteTodo(index)
  toast.success('Task deleted')
}
</script>

<template>
  <main class="container mx-auto max-w-lg p-6 relative">
     <div class="mb-8 text-center">
    <h1 class="text-3xl font-bold text-gray-900">Tasks Manager</h1>
  </div>

    <!-- Filters -->
    <div
      class="bg-gray-100 rounded-full shadow-inner overflow-hidden mb-6 flex text-sm font-semibold text-gray-500"
    >
      <button
        @click="filter = 'todo'"
        class="flex-1 py-3 transition border-r border-gray-200 first:rounded-l-full last:rounded-r-full"
        :class="filter === 'todo'
          ? 'bg-purple-600 text-white shadow-[0_0_8px_rgba(124,58,237,0.6)]'
          : ''"
      >
        To-Do
      </button>
      <button
        @click="filter = 'done'"
        class="flex-1 py-3 transition border-r border-gray-200 last:rounded-r-full"
        :class="filter === 'done'
          ? 'bg-purple-600 text-white shadow-[0_0_8px_rgba(124,58,237,0.6)]'
          : ''"
      >
        Done
      </button>
      <button
        @click="filter = 'all'"
        class="flex-1 py-3 transition last:rounded-r-full"
        :class="filter === 'all'
          ? 'bg-purple-600 text-white shadow-[0_0_8px_rgba(124,58,237,0.6)]'
          : ''"
      >
        All
      </button>
    </div>

    <!-- Tasks List -->
    <div class="space-y-4">
      <div
        v-for="(todo, filteredIndex) in filteredTodos"
        :key="todo.name + filteredIndex"
        class="p-4 bg-white rounded-xl shadow-md flex justify-between items-start"
      >
        <div>
          <h3
            class="text-lg font-semibold mb-1"
            :class="todo.completed ? 'line-through text-gray-400' : ''"
          >
            {{ todo.name }}
          </h3>
          <p class="mb-3 text-gray-600">{{ todo.description }}</p>
          <label class="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="toggleTodoStatus(todo)"
              class="form-checkbox h-5 w-5 text-purple-600"
            />
            <span class="text-sm">{{ todo.completed ? 'Done' : 'Todo' }}</span>
          </label>
        </div>

        <button
          @click="deleteTask(todo)"
          class="text-red-600 hover:text-red-800 font-bold text-xl leading-none ml-4"
          aria-label="Delete task"
          title="Delete task"
        >
          &times;
        </button>
      </div>
    </div>

    <!-- Add Task -->
    <div
      class="bg-gray-50 mt-8 p-6 rounded-2xl shadow-md space-y-5 border border-gray-100"
    >
      <h3 class="text-xl font-semibold text-gray-800">Add a new task</h3>

      <input
        type="text"
        v-model="newName"
        placeholder="Task title"
        class="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
      />

      <textarea
        v-model="newDescription"
        rows="4"
        placeholder="Task description"
        class="w-full px-4 py-3 bg-white text-gray-800 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
      ></textarea>

      <button
        @click="addNewTask"
        class="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-purple-700 hover:shadow-lg transition"
      >
        Add Task
      </button>
    </div>
  </main>
</template>
