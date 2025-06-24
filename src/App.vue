<script setup lang="ts">
import TaskForm from './components/TaskForm.vue'
import TaskList from './components/TaskList.vue'
import TaskFilter from './components/TaskFilter.vue'
import DelayEditor from './components/DelayEditor.vue'
import { useStore } from 'vuex'
import { onMounted } from 'vue'

const store = useStore()
onMounted(() => {
  store.dispatch('fetchTasks')
})
</script>

<template>
  <div class="todo-app">
    <h1 class="header">Todo App</h1>
    <div style="margin-bottom: 1rem">
      <TaskForm />
      <TaskFilter />
      <TaskList />
    </div>
    <DelayEditor style="margin-top: 3rem" />
  </div>
</template>

<style scoped>
.header {
  text-align: center;
  color: #42b983;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.todo-app {
  max-width: 500px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #0001;
  padding: 2rem;
  font-size: large;
}
</style>
