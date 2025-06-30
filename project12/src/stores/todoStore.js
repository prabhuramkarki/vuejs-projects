import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  // Load tasks from localStorage or empty array
  const storedTodos = localStorage.getItem('todos')
  const todos = ref(storedTodos ? JSON.parse(storedTodos) : [])

  // Watch todos and save to localStorage on change
  watch(
    todos,
    (newTodos) => {
      localStorage.setItem('todos', JSON.stringify(newTodos))
    },
    { deep: true }
  )

  const addTodo = (todo) => {
    todos.value.push(todo)
  }

  const toggleTodo = (index) => {
    todos.value[index].completed = !todos.value[index].completed
  }

  const deleteTodo = (index) => {
    todos.value.splice(index, 1)
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
  }
})
