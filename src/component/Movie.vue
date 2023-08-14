<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import {ResponseValue,Search} from '../interface/interface'
import SearchBar from './SearchBar.vue';
import MovieCard from './MovieCard.vue';
const movieData = ref<Search[]>([]);
const totalResults = ref<string>('');
const searchQuery = ref<string>('');
const currentPage = ref<number>(1);
const hasNextPage = ref<boolean>(false);
const showDetail = ref(false);
const router = useRouter();

const searchMovies = async (query: string) => {
  try {
    const apiKey = '7035c60c';
    searchQuery.value = query;
    const response = await axios.get<ResponseValue>(
      `https://omdbapi.com?apikey=${apiKey}&s=${query}&page=${currentPage.value}`
    );
    if (response.data.Response === 'True') {
      movieData.value = response.data.Search; 
      totalResults.value = response.data.totalResults;
      hasNextPage.value = response.data.Search.length > 0;
    } else {
      movieData.value = [];
      totalResults.value = '0';
      hasNextPage.value = false;
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

const fetchNextPage = () => {
  currentPage.value += 1;
  searchMovies(searchQuery.value);
};

const toggleDetail = (imdbID: string) => {
  showDetail.value = !showDetail.value;
  if (showDetail.value) {
    router.push({ name: 'MovieDetail', params: { imdbID } });
  }
};

</script>

<template>
    <div v-if="!showDetail">
      <SearchBar @search="searchMovies"/>
    </div>
    <ul v-if="!showDetail">  
      <router-link :to="'/movie/' + movie.imdbID" v-for="movie in movieData" :key="movie.imdbID">
        <MovieCard :movie="movie" @search="toggleDetail" />
      </router-link>
    </ul>
    <router-view v-if="showDetail"></router-view>
    <div  v-if="!showDetail">
      <button v-if="hasNextPage" @click="fetchNextPage">Next</button>
    </div>
</template>
