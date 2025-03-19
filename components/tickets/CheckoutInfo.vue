<script setup>
import { defineProps, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { formatCurrency } from "~/utils/format";
import { useCheckoutStore } from "~/stores/checkout";

const checkout = useCheckoutStore();
const props = defineProps({
  theaterData: {
    type: Object,
  },
  movieData: {
    type: Object,
  },
  pricing: {
    type: Object,
  },
});

const emit = defineEmits(["continue"]);
const router = useRouter();
const route = useRoute();
const currentStep = route.path.includes("/3") ? 3 : 2;

// Start the timer in the checkout store
onMounted(() => {
  checkout.startTimer();
});

// Group seats by their type
const seatsByType = computed(() => {
  const result = {
    standard: [],
    vip: [],
    "first-class": [],
  };

  checkout.selectedSeats.forEach((seatId) => {
    const type = checkout.selectedSeatTypes[seatId] || "standard";
    result[type].push(seatId);
  });

  return result;
});

// Create a readable description for each seat group
const seatTextByType = computed(() => {
  const result = {};
  for (const type in seatsByType.value) {
    if (seatsByType.value[type].length > 0) {
      result[type] = seatsByType.value[type].join(", ");
    }
  }
  return result;
});

// Calculate subtotals for each seat type
const subtotalsByType = computed(() => {
  const result = {};
  for (const type in seatsByType.value) {
    if (seatsByType.value[type].length > 0) {
      result[type] = seatsByType.value[type].length * props.pricing[type];
    }
  }
  return result;
});

// Calculate total price
const totalAmount = computed(() => {
  return checkout.orderTotal;
});

// Format seat type for display
function formatSeatType(type) {
  switch (type) {
    case "standard":
      return "STA";
    case "vip":
      return "VIP";
    case "first-class":
      return "FC";
    default:
      return type;
  }
}

function handleContinueClick() {
  emit("continue");
}

function handleBackClick() {
  if (currentStep === 3) {
    // Clear food selections
    checkout.setSelectedFoods([]);
    router.push(`/tickets/${route.params.movieId}/2`);
  } else {
    // Clear seat selections
    checkout.setSelectedSeats([], {});
    router.push(`/tickets/${route.params.movieId}/1`);
  }
}
</script>

<template>
  <div class="w-full md:w-1/3">
    <div
      class="bg-white rounded-2xl border border-gray-200 py-4 px-6 space-y-2"
    >
      <h4 class="text-xl font-bold">{{ theaterData.name }}</h4>
      <span class="text-sm text-gray-600 font-medium">
        <span class="text-primary">{{ theaterData.screen }}</span> -
        {{ theaterData.date }} - Suất chiếu: {{ theaterData.showtime }}
      </span>
      <hr class="-mx-6 border-gray-200 my-4" />
      <h3 class="text-xl font-bold text-primary">{{ movieData.title }}</h3>
      <div class="flex gap-2 mt-4">
        <span
          class="text-center inline-block align-middle min-w-[28px] font-bold text-white text-xs px-1 py-0.5 rounded"
          :class="
            movieData.ageLimit === 'P'
              ? 'bg-gradient-to-t from-cyan-500 via-teal-400 to-emerald-500'
              : 'bg-gradient-to-t from-red-500 via-red-600 to-red-700'
          "
        >
          {{ movieData.ageLimit }}
        </span>
        <span
          class="bg-black border border-yellow-400 text-white text-[0.6em] px-1 py-0.5 rounded font-light uppercase tracking-[.0em]"
        >
          {{ movieData.type }}
        </span>
        <span
          class="bg-primary text-white text-xs px-1 py-0.5 rounded font-medium"
        >
          {{ movieData.format }}
        </span>
      </div>

      <table
        v-if="checkout.selectedSeats.length > 0"
        class="w-full text-sm mt-4"
      >
        <tbody>
          <template v-for="(seats, type) in seatsByType" :key="type">
            <tr
              v-if="seats.length > 0"
              class="border-b border-gray-50 last:border-0 text-gray-700"
            >
              <td class="font-medium py-2">
                <span class="font-bold">{{ seats.length }}</span> x
                <span>{{ formatSeatType(type) }} - {{ movieData.format }}</span>
                <br />
                <span class="text-gray-600 text-xs">{{
                  seatTextByType[type]
                }}</span>
              </td>
              <td class="text-right font-bold py-2">
                {{ formatCurrency(subtotalsByType[type]) }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>

      <hr
        v-if="checkout.selectedFoods.length > 0"
        class="-mx-6 border-gray-200 my-4"
      />
      <h5 v-if="checkout.selectedFoods.length > 0" class="font-bold mb-2">
        Food & Beverage
      </h5>
      <table
        v-if="checkout.selectedFoods.length > 0"
        class="w-full text-sm mt-1"
      >
        <tbody>
          <tr
            v-for="item in checkout.selectedFoods"
            :key="item.id"
            class="border-b border-gray-50 last:border-0 text-gray-700"
          >
            <td class="font-medium py-2">
              <span class="font-bold">{{ item.quantity }}</span> x
              <span>{{ item.name }}</span>
            </td>
            <td class="text-right font-bold py-2">
              {{ formatCurrency(item.price * item.quantity) }}
            </td>
          </tr>
        </tbody>
      </table>

      <hr class="-mx-6 border-gray-200 my-4" />
      <table v-if="checkout.selectedSeats.length > 0" class="w-full text-sm">
        <tbody>
          <tr class="text-2xl text-gray-700">
            <td class="font-medium">Tổng tiền</td>
            <td class="text-right font-bold">
              {{ formatCurrency(checkout.orderTotal) }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-center mt-5">
        <Button
          v-if="checkout.selectedSeats.length > 0"
          :label="currentStep === 2 ? 'Chọn đồ ăn (2/4)' : 'Thanh toán (3/4)'"
          class="w-full font-bold uppercase"
          @click="handleContinueClick"
        />
        <Button
          v-else
          label="Bạn chưa chọn ghế nào. Vui lòng chọn ghế."
          variant="outlined"
          severity="danger"
          class="w-full"
        />
        <div class="my-2">
          <a href="#" @click.prevent="handleBackClick" class="text-primary"
            >← Trở lại</a
          >
        </div>
        <span class="text-gray-700 text-sm">
          Còn lại
          <span
            class="font-semibold"
            :class="{ 'text-red-500': checkout.remainingSeconds < 60 }"
            >{{ checkout.formattedRemainingTime }}</span
          >
        </span>
      </div>
    </div>
  </div>
</template>
