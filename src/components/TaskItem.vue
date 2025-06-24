<script setup lang="ts">
import { useStore } from 'vuex'
import type { Task } from '../types'

const props = defineProps<{ task: Task }>()
const store = useStore()

function onToggle() {
  store.dispatch('toggleTaskStatus', props.task.id)
}
function onDelete() {
  store.dispatch('deleteTask', props.task.id)
}
</script>
<template>
  <li class="task-item">
    <label>
      <input type="checkbox" :checked="task.complited" @change="onToggle" />
      <span :class="{ done: task.complited }">{{ task.title }}</span>
    </label>
    <button @click="onDelete">Удалить</button>
  </li>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
label {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.done {
  text-decoration: line-through;
  color: #888;
}
button {
  margin-left: 1rem;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  border: none;
  background: #929292;
  color: #fff;
  cursor: pointer;
}
button:hover {
  background: #c0392b;
}
</style>
