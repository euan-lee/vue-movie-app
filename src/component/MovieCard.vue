<template>
    <div @click="performToggle">
      <img :src="movie.Poster" alt="Movie Poster" />
      {{ movie.Title }} - {{ movie.Year }}
    </div>
  </template>
  
  <script setup lang="ts">
  
  interface MovieData {
    imdbID: string;
    Poster: string;
    Title: string;
    Year: string;
  }
  
  const props = defineProps<{ movie: MovieData }>();
  const { movie } = props;
  
  const emit = defineEmits();
  
  const performToggle = () => {
    emit('search');
  };
  </script>