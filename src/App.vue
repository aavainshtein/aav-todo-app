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
    <div class="footer">
      <span class="footer-author">Made by Aleksandr Vainshtein</span>
      <a
        class="footer-link"
        href="https://hh.ru/resume/cae773a8ff0ec7c1490039ed1f784741747a67"
        target="_blank"
        rel="noopener noreferrer"
      >
        Head-Hunter
      </a>
      <a
        class="footer-link"
        href="https://github.com/aavainshtein"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <a
        class="footer-link"
        href="mailto:asderq@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        asderq@gmail.com
      </a>
    </div>
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
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 3rem;
}
.footer-author {
  font-size: 0.95em;
  color: #888;
}
.footer-link {
  color: #42b983;
  text-decoration: none;
  font-size: 1em;
  transition: text-decoration 0.2s;
}
.footer-link:hover {
  text-decoration: underline;
}
</style>
