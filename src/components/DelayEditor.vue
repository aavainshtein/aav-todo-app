<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const apiDelay = computed(() => store.getters.apiDelay)
const isLoading = computed(() => store.state.isLoading)

function updateDelay(e: Event) {
  const val = +(e.target as HTMLInputElement).value
  if (val >= 0) {
    store.dispatch('setApiDelay', val)
  }
}
</script>
<template>
  <div class="delay-editor">
    <label>
      API Delay (ms):
      <input type="number" :value="apiDelay" min="0" @input="updateDelay" />
    </label>
    <div v-if="isLoading" class="loading">Loading...</div>
  </div>
</template>

<style scoped>
.delay-editor {
  margin-bottom: 1rem;
}
input[type='number'] {
  width: 80px;
  padding: 0.3rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-left: 0.5rem;
}
</style>
