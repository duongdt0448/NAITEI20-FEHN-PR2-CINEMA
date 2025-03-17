<template>
  <div class="container mx-auto p-6">
    <template v-if="movieData">
      <MovieInfo :movie="movieData" />
    </template>
    <template v-else>
      <p class="text-gray-500 text-lg font-semibold text-center mt-10">Không tìm thấy phim...</p>
    </template>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import movies from '@/db/movies.json';

export default {
  components: {
    MovieInfo: defineAsyncComponent(() => import('~/components/MovieInfo.vue')),
  },
  data() {
    return {
      movieData: null,
    };
  },
  setup() {
    const route = useRoute();
    const movieId = parseInt(route.params.id);
    const movieData = movies.find((movie) => movie.id === movieId);

    return { movieData };
  },
};
</script>
