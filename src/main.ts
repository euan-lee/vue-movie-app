import { createApp } from 'vue';
import Movie from './component/Movie.vue';
import router from './router.ts';

const app = createApp(Movie);

app.use(router); 

app.mount('#app');