<script setup>
const props = defineProps({
  isLoading: Boolean
})
</script>

<template>
  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner-border loading" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>
