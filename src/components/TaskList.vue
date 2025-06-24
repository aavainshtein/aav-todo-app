<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import TaskItem from './TaskItem.vue'

const store = useStore()
const tasks = computed(() => store.getters.filteredTasks)
</script>
<template>
  <ul class="task-list">
    <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
    <li v-if="!tasks.length" class="empty">Нет задач</li>
  </ul>
</template>

<style scoped>
.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.empty {
  color: #888;
  text-align: center;
  padding: 1rem 0;
}
</style>
