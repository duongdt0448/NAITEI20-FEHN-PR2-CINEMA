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
const showSuccess = ref(false);
const selectedPaymentMethod = ref(null);

// Redirect if no seats selected
onMounted(() => {
  if (!checkout.selectedSeats.length) {
    // No seats selected, redirect back to seat selection
    router.push(`/tickets/${movieId}/2`);
    return;
  }

  fetchMovieData();
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

function handlePaymentMethodChange(method) {
  selectedPaymentMethod.value = method;
}

function processPayment() {
  const seatsData = checkout.selectedSeats.map((seatId) => {
    const parts = seatId.split("-");
    const row = parts[0];
    const seatNumber = parts[1].replace("Seat ", "").trim();

    return {
      row,
      number: seatNumber,
      type: checkout.selectedSeatTypes[seatId] || "standard",
    };
  });

  const foodsData = checkout.selectedFoods.map((food) => ({
    id: food.id,
    quantity: food.quantity,
  }));

  console.log("Checkout data:", {
    movie: checkout.movieData.id,
    theater: checkout.theaterData,
    seats: seatsData,
    foods: foodsData,
    total: checkout.orderTotal,
  });

  showSuccess.value = true;
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

    <div
      v-if="showSuccess"
      class="flex flex-col items-center justify-center my-10 py-8 px-6 bg-white rounded-2xl border border-gray-200"
    >
      <div class="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mx-auto h-16 w-16 text-green-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clip-rule="evenodd"
          />
        </svg>

        <h2 class="mt-4 text-2xl font-bold text-gray-800">
          Thanh toán thành công!
        </h2>
        <p class="mt-2 text-gray-600">Cảm ơn bạn đã đặt vé xem phim.</p>

        <div class="mt-6">
          <NuxtLink to="/">
            <Button label="Về trang chủ" class="mr-4" />
          </NuxtLink>
          <NuxtLink to="/profile">
            <Button label="Xem lịch sử đặt vé" variant="outlined" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col md:flex-row justify-center my-10">
      <TicketsPaymentSelection
        class="flex-2/3"
        @payment-method-change="handlePaymentMethodChange"
      />
      <TicketsCheckoutInfo
        class="flex-1/3"
        :theaterData="checkout.theaterData"
        :movieData="checkout.movieData"
        :pricing="checkout.pricing"
        :hasSelectedPaymentMethod="!!selectedPaymentMethod"
        @continue="processPayment"
      />
    </div>
  </template>
</template>
