import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Movie from './component/Movie.vue';
import MovieDetail from './component/MovieDetail.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: Movie },
  { path: '/movie/:imdbID', component: MovieDetail, props: true }, // Add this line
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
