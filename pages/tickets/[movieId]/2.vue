<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCheckoutStore } from "~/stores/checkout";

const route = useRoute();
const router = useRouter();
const checkout = useCheckoutStore();
const movieId = route.params.movieId;
const isLoading = ref(true);
const error = ref(null);

const seatMap = {
  A: [
    { label: "Seat 1", type: "standard" },
    { label: "Seat 2", type: "standard" },
    { label: "Seat 3", type: "standard" },
    { label: "Seat 4", type: "sold" },
    { label: "Seat 5", type: "standard" },
    { label: "Seat 6", type: "standard" },
    { label: "Seat 7", type: "standard" },
    { label: "Seat 8", type: "standard" },
    // Center aisle
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    // Right section

    { label: "Seat 9", type: "sold" },
    { label: "Seat 10", type: "standard" },
    { label: "Seat 11", type: "standard" },
    { label: "Seat 12", type: "standard" },
    { label: "Seat 13", type: "standard" },
    { label: "Seat 14", type: "standard" },
    { label: "Seat 15", type: "standard" },
    { label: "Seat 16", type: "standard" },
  ],
  B: [
    { label: "Seat 1", type: "standard" },
    { label: "Seat 2", type: "standard" },
    { label: "Seat 3", type: "standard" },
    { label: "Seat 4", type: "sold" },
    { label: "Seat 5", type: "standard" },
    { label: "Seat 6", type: "standard" },
    { label: "Seat 7", type: "standard" },
    { label: "Seat 8", type: "standard" },
    // Center aisle
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    // Right section
    { label: "Seat 9", type: "standard" },
    { label: "Seat 10", type: "standard" },
    { label: "Seat 11", type: "standard" },
    { label: "Seat 12", type: "standard" },
    { label: "Seat 13", type: "standard" },
    { label: "Seat 14", type: "standard" },
    { label: "Seat 15", type: "standard" },
    { label: "Seat 16", type: "standard" },
  ],
  C: [
    { label: "Seat 1", type: "standard" },
    { label: "Seat 2", type: "standard" },
    { label: "Seat 3", type: "vip" },
    { label: "Seat 4", type: "vip" },
    { label: "Seat 5", type: "vip" },
    { label: "Seat 6", type: "vip" },
    { label: "Seat 7", type: "vip" },
    { label: "Seat 8", type: "vip" },
    // Center aisle
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    // Right section
    { label: "Seat 9", type: "vip" },
    { label: "Seat 10", type: "sold" },
    { label: "Seat 11", type: "vip" },
    { label: "Seat 12", type: "vip" },
    { label: "Seat 13", type: "vip" },
    { label: "Seat 14", type: "vip" },
    { label: "Seat 15", type: "standard" },
    { label: "Seat 16", type: "standard" },
  ],
  D: [
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
  ],
  E: [
    { label: "", type: "empty" },
    { label: "Seat 1", type: "first-class" },
    { label: "", type: "empty" },
    { label: "Seat 2", type: "first-class" },
    { label: "", type: "empty" },
    { label: "Seat 3", type: "first-class" },
    { label: "", type: "empty" },
    { label: "Seat 4", type: "sold" },
    // Center aisle
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    // Right section
    { label: "Seat 5", type: "first-class" },
    { label: "", type: "empty" },
    { label: "Seat 6", type: "first-class" },
    { label: "", type: "empty" },
    { label: "Seat 7", type: "sold" },
    { label: "", type: "empty" },
    { label: "Seat 8", type: "first-class" },
    { label: "", type: "empty" },
  ],
  F: [
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    { label: "", type: "empty" },
  ],
  G: [
    { label: "Seat 1", type: "standard" },
    { label: "Seat 2", type: "standard" },
    { label: "Seat 3", type: "sold" },
    { label: "Seat 4", type: "vip" },
    { label: "Seat 5", type: "vip" },
    { label: "Seat 6", type: "vip" },
    { label: "Seat 7", type: "vip" },
    { label: "Seat 8", type: "vip" },
    // Center aisle
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    // Right section
    { label: "Seat 9", type: "vip" },
    { label: "Seat 10", type: "vip" },
    { label: "Seat 11", type: "sold" },
    { label: "Seat 12", type: "vip" },
    { label: "Seat 13", type: "vip" },
    { label: "Seat 14", type: "vip" },
    { label: "Seat 15", type: "standard" },
    { label: "Seat 16", type: "standard" },
  ],
  H: [
    { label: "Seat 1", type: "standard" },
    { label: "Seat 2", type: "standard" },
    { label: "Seat 3", type: "standard" },
    { label: "Seat 4", type: "standard" },
    { label: "Seat 5", type: "standard" },
    { label: "Seat 6", type: "standard" },
    { label: "Seat 7", type: "standard" },
    { label: "Seat 8", type: "standard" },
    // Center aisle
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    // Right section

    { label: "Seat 9", type: "standard" },
    { label: "Seat 10", type: "standard" },
    { label: "Seat 11", type: "standard" },
    { label: "Seat 12", type: "standard" },
    { label: "Seat 13", type: "standard" },
    { label: "Seat 14", type: "standard" },
    { label: "Seat 15", type: "standard" },
    { label: "Seat 16", type: "standard" },
  ],
  I: [
    { label: "Seat 1", type: "standard" },
    { label: "Seat 2", type: "standard" },
    { label: "Seat 3", type: "standard" },
    { label: "Seat 4", type: "standard" },
    { label: "Seat 5", type: "standard" },
    { label: "Seat 6", type: "standard" },
    { label: "Seat 7", type: "standard" },
    { label: "Seat 8", type: "standard" },
    // Center aisle
    { label: "", type: "empty" },
    { label: "", type: "empty" },
    // Right section
    { label: "Seat 9", type: "standard" },
    { label: "Seat 10", type: "standard" },
    { label: "Seat 11", type: "standard" },
    { label: "Seat 12", type: "standard" },
    { label: "Seat 13", type: "standard" },
    { label: "Seat 14", type: "standard" },
    { label: "Seat 15", type: "standard" },
    { label: "Seat 16", type: "standard" },
  ],
};

onMounted(() => {
  fetchMovieData();
});

async function fetchMovieData() {
  isLoading.value = true;
  try {
    const response = await fetch(`http://localhost:5000/movies/${movieId}`);
    if (!response.ok) {
      throw new Error(`Movie not found or server error: ${response.status}`);
    }

    const data = await response.json();
    checkout.setMovieData(data);
  } catch (err) {
    error.value = err.message;
    console.error("Failed to fetch movie data:", err);
  } finally {
    isLoading.value = false;
  }
}

function updateSeats(seats, types) {
  checkout.setSelectedSeats(seats, types);
}

function goToFoodSelection() {
  router.push(`/tickets/${movieId}/3`);
}
</script>

<template>
  <div class="flex items-center justify-center p-8">
    <h1 class="text-2xl font-bold">Bước 2: Chọn ghế</h1>
  </div>

  <div v-if="isLoading" class="flex justify-center p-8">
    <div class="text-lg">Đang tải thông tin ...</div>
  </div>

  <div v-else-if="error" class="flex justify-center p-8">
    <div class="text-lg text-red-500">{{ error }}</div>
  </div>

  <template v-else-if="checkout.movieData">
    <MoviesCardLg :movie="checkout.movieData" />
    <div class="flex flex-col md:flex-row justify-center w-full my-10">
      <TicketsSeatSelection
        class="flex-2/3"
        :seatMap="seatMap"
        @update:selectedSeats="updateSeats"
      />
      <TicketsCheckoutInfo
        class="flex-1/3"
        :theaterData="checkout.theaterData"
        :movieData="checkout.movieData"
        :pricing="checkout.pricing"
        @continue="goToFoodSelection"
      />
    </div>
  </template>
</template>
