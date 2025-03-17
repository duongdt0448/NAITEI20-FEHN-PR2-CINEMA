<template>
  <div class="container max-w-[72vw] mx-auto p-6">
    <h2 class="text-2xl font-bold text-center">
      Lịch chiếu phim rạp {{ cinemaData.name }} tại BHDStar
    </h2>
    <div class="bg-white border border-gray-300 rounded-xl p-6 mt-6 flex">
      <img
        :src="cinemaData.img_url"
        alt="Cinema Image"
        class="w-48 h-36 rounded-lg object-cover mr-6"
      />
      <div>
        <h3 class="text-xl font-bold text-primary mb-4">{{ cinemaData.name }}</h3>
        <p class="text-gray-700">
          Địa chỉ: {{ cinemaData.location }}
        </p>
        <p class="text-gray-700">
          Điện thoại: {{ cinemaData.phone }}
        </p>
        <p class="text-gray-700">
          Email: {{ cinemaData.email }}
        </p>
        <button
          class="mt-4 px-3 py-2 text-primary font-bold border border-primary rounded-xl hover:bg-primary hover:!text-white cursor-pointer transition"
        >
          ← CHỌN RẠP KHÁC
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import cinemas from "@/db/cinemas.json";

export default {
  setup() {
    const route = useRoute();
    const cinemaId = parseInt(route.params.id);
    const cinemaData = cinemas.find((cinema) => cinema.id === cinemaId) || {};

    return { cinemaData };
  },
};
</script>
