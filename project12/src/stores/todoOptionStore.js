import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: []
  }),
  actions: {
    addTodo(todo) {
      this.todos.push(todo)
    },
    toggleTodo(index) {
      this.todos[index].completed = !this.todos[index].completed
    },
    deleteTodo(index) {
      this.todos.splice(index, 1)
    }
  }
})
