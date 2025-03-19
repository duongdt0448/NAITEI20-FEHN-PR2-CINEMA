<template>
  <div class="container mx-auto p-6">
    <template v-if="cinemaData">
      <cinemaInfo :cinema="cinemaData" />
    </template>
    <template v-else>
      <p class="text-gray-500 text-lg font-semibold text-center mt-10">Không tìm thấy rạp...</p>
    </template>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import cinemas from '@/db/cinemas.json';

export default {
  components: {
    cinemaInfo: defineAsyncComponent(() => import('~/components/CinemaInfo.vue')),
  },
  data() {
    return {
      cinemaData: null,
    };
  },
  setup() {
    const route = useRoute();
    const cinemaId = parseInt(route.params.id);
    const cinemaData = cinemas.find((cinema) => cinema.id === cinemaId);

    return { cinemaData };
  },
};
</script>
