<template>
  <form @submit.prevent="performSearch">
    <label for="searchInput">Search Movies:</label>
    <input type="text" id="searchInput" v-model="searchQuery" />
    <button type="submit">Search</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits();
const searchQuery = ref<string>('');
const performSearch = (event: Event) => {
  event.preventDefault();
  emit('search', searchQuery.value);
};
</script>