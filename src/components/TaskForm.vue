<script setup lang="ts">
import { z } from 'zod'
import { useStore } from 'vuex'
import { ref } from 'vue'

const store = useStore()
const newTaskTitle = ref('')
const error = ref('')

const stateSchema = z.object({
  newTitle: z.string().min(2, 'Минимум 2 символа'),
})

function submit() {
  error.value = ''
  const result = stateSchema.safeParse({ newTitle: newTaskTitle.value })
  if (!result.success) {
    error.value = result.error.errors[0].message
    return
  }
  store.dispatch('addTask', newTaskTitle.value.trim())
  newTaskTitle.value = ''
}
</script>
<template>
  <form @submit.prevent="submit" class="task-form">
    <div class="input-group">
      <input v-model="newTaskTitle" placeholder="Новая задача..." />
      <button type="submit">Добавить</button>
    </div>
    <span v-if="error" class="error">{{ error }}</span>
  </form>
  {{ store.state.tasks }}
</template>

<style scoped>
.task-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.input-group {
  display: flex;
  gap: 0.5rem;
}
input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  padding: 0.4rem 1rem;
  border-radius: 4px;
  border: none;
  background: #42b983;
  color: #fff;
  cursor: pointer;
}
.error {
  color: #d00;
  margin-left: 0.5rem;
  font-size: 0.9em;
}
</style>
