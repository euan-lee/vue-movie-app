<template>
  <div v-if="movie">
    <h2>{{ movie.Title }} ({{ movie.Year }})</h2>
    <p>IMDB Rating: {{ movie.imdbRating }}</p>
    <p>Genre: {{ movie.Genre }}</p>
    <p>Director: {{ movie.Director }}</p>
    <p>Plot: {{ movie.Plot }}</p>
    <img :src="movie.Poster" alt="Movie Poster" />
  </div>
  <div v-else>
    <p>Loading movie details...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { MovieDetailValue} from '../interface/interface'

const { imdbID } = useRoute().params;
const movie = ref<MovieDetailValue | null>(null);

onMounted(async () => {
  try {
    const apiKey = '7035c60c';
    const response = await axios.get<MovieDetailValue>(
      `https://omdbapi.com?apikey=${apiKey}&i=${imdbID}`
    );
    movie.value = response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
});
</script>
