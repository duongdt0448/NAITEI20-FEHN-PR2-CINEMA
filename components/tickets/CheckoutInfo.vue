<script setup>
import { defineProps, computed, ref, onMounted, onBeforeUnmount } from "vue";
import { formatCurrency } from "~/utils/format";

const props = defineProps({
  selectedSeats: {
    type: Array,
    default: () => [],
  },
  selectedSeatTypes: {
    type: Object,
    default: () => ({}),
  },
  theaterData: {
    type: Object,
    default: () => ({
      name: "BHD Star Pham Ngoc Thach",
      screen: "Screen 7",
      date: "21/3/2025",
      showtime: "13h35",
    }),
  },
  movieData: {
    type: Object,
  },
  pricing: {
    type: Object,
    default: () => ({
      standard: 90000,
      vip: 105000,
      "first-class": 125000,
    }),
  },
});

// Group seats by their type
const seatsByType = computed(() => {
  const result = {
    standard: [],
    vip: [],
    "first-class": [],
  };

  props.selectedSeats.forEach((seatId) => {
    const type = props.selectedSeatTypes[seatId] || "standard";
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
  return Object.values(subtotalsByType.value).reduce(
    (sum, amount) => sum + amount,
    0
  );
});

// Countdown timer implementation - starting from 8 minutes (480 seconds)
const remainingSeconds = ref(8 * 60); // 8 minutes in seconds
let countdownInterval = null;

const formattedRemainingTime = computed(() => {
  const minutes = Math.floor(remainingSeconds.value / 60);
  const seconds = remainingSeconds.value % 60;
  return `${minutes} phút, ${seconds < 10 ? "0" : ""}${seconds} giây`;
});

onMounted(() => {
  countdownInterval = setInterval(() => {
    if (remainingSeconds.value > 0) {
      remainingSeconds.value--;
    } else {
      clearInterval(countdownInterval);
    }
  }, 1000);
});

onBeforeUnmount(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
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

      <table v-if="selectedSeats.length > 0" class="w-full text-sm mt-4">
        <tbody>
          <template v-for="(seats, type) in seatsByType" :key="type">
            <tr
              v-if="seats.length > 0"
              class="border-b border-gray-50 last:border-0"
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
      <hr class="-mx-6 border-gray-200 my-4" />
      <table v-if="selectedSeats.length > 0" class="w-full text-sm">
        <tbody>
          <tr>
            <td class="font-medium">Tổng tiền</td>
            <td class="text-right font-bold">
              {{ formatCurrency(totalAmount) }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-center mt-5">
        <Button
          v-if="selectedSeats.length > 0"
          label="Chọn đồ ăn (2/4)"
          class="w-full font-bold uppercase"
        />
        <Button
          v-else
          label="Bạn chưa chọn ghế nào. Vui lòng chọn ghế."
          variant="outlined"
          severity="danger"
          class="w-full"
        />
        <div class="my-2">
          <a href="#" class="text-primary">← Trở lại</a>
        </div>
        <span class="text-gray-700 text-sm"
          >Còn lại
          <span
            class="font-semibold"
            :class="{ 'text-red-500': remainingSeconds < 60 }"
            >{{ formattedRemainingTime }}</span
          ></span
        >
      </div>
    </div>
  </div>
</template>
