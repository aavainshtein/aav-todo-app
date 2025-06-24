<script setup lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const currentFilter = computed(() => store.state.currentFilter)

function setFilter(filter: string) {
  store.dispatch('setFilter', filter)
}
</script>
<template>
  <div class="task-filter">
    <button :class="{ active: currentFilter === 'all' }" @click="setFilter('all')">Все</button>
    <button :class="{ active: currentFilter === 'active' }" @click="setFilter('active')">
      Активные
    </button>
    <button :class="{ active: currentFilter === 'completed' }" @click="setFilter('completed')">
      Выполненные
    </button>
  </div>
</template>

<style scoped>
.task-filter {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
button {
  padding: 0.4rem 1rem;
  border-radius: 4px;
  border: none;
  background: #eee;
  color: #333;
  cursor: pointer;
  transition: background 0.2s;
}
button.active {
  background: #42b983;
  color: #fff;
}
button:hover:not(.active) {
  background: #ddd;
}
</style>
