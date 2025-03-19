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
const foods = ref([]);

// Redirect if no seats selected
onMounted(() => {
  if (!checkout.selectedSeats.length) {
    // No seats selected, redirect back to seat selection
    router.push(`/tickets/${movieId}/2`);
    return;
  }

  fetchMovieData();
  fetchFoods();
});

// Fetch movie data
async function fetchMovieData() {
  if (checkout.movieData) {
    isLoading.value = false;
    return;
  }

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

// Fetch food data
async function fetchFoods() {
  try {
    const response = await fetch("http://localhost:5000/foods");
    if (!response.ok) {
      throw new Error("Failed to fetch food data");
    }
    foods.value = await response.json();
  } catch (err) {
    console.error("Error fetching foods:", err);
  }
}

// Function to go to payment page
function goToPayment() {
  router.push(`/tickets/${movieId}/4`); // Assuming 4 is your payment page
}
</script>

<template>
  <div class="flex items-center justify-center p-8">
    <h1 class="text-2xl font-bold">Bước 3: Chọn đồ ăn</h1>
  </div>

  <div v-if="isLoading" class="flex justify-center p-8">
    <div class="text-lg">Đang tải thông tin ...</div>
  </div>

  <div v-else-if="error" class="flex justify-center p-8">
    <div class="text-lg text-red-500">{{ error }}</div>
  </div>

  <template v-else-if="checkout.movieData">
    <MoviesCardLg :movie="checkout.movieData" />
    <div class="flex flex-col md:flex-row justify-center my-10">
      <TicketsFoodSelection class="flex-2/3" :foods="foods" />
      <TicketsCheckoutInfo
        class="flex-1/3"
        :theaterData="checkout.theaterData"
        :movieData="checkout.movieData"
        :pricing="checkout.pricing"
        @continue="goToPayment"
      />
    </div>
  </template>
</template>
