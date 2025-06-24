<script setup lang="ts">
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'
import { useStore } from 'vuex'
import { onMounted } from 'vue'

const store = useStore()
onMounted(() => {
  store.dispatch('fetchTasks')
})
</script>

<template>
  <div class="todo-app">
    <h1>Todo App</h1>
    <div style="margin-bottom: 1rem">
      <TaskForm />
      <TaskList />
    </div>
  </div>
</template>

<style scoped>
.todo-app {
  max-width: 500px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0001;
  padding: 2rem;
}
</style>
