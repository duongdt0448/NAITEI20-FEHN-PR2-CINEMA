<template>
  <div class="cinema-map-container text-gray-400">
    <div class="map-header text-center px-24">
      <img
        src="~/assets/images/tickets/seatMapHeader.png"
        alt="Screen"
        class="mx-auto"
      />
    </div>
    <div
      class="seat-types flex flex-col items-center justify-center my-4 space-y-4"
    >
      <!-- First row: Available seat types -->
      <div class="flex justify-center space-x-4">
        <div
          v-for="type in availableSeatTypes"
          :key="type.code"
          class="text-center w-48"
        >
          <img
            :src="type.image"
            :alt="type.label"
            class="inline-block w-full max-w-8 m-1"
          />
          <span class="text-sm mt-1 ml-1 w-6">{{ type.label }}</span>
        </div>
      </div>

      <!-- Second row: Status seat types -->
      <div class="flex justify-center space-x-4">
        <div
          v-for="type in statusSeatTypes"
          :key="type.code"
          class="text-center w-48"
        >
          <img
            :src="type.image"
            :alt="type.label"
            class="inline-block w-full max-w-8 m-1"
          />
          <span class="text-sm mt-1 ml-1 w-6">{{ type.label }}</span>
        </div>
      </div>
    </div>
    <div class="map-body flex flex-col items-center">
      <div
        v-for="(row, rowIndex) in seats"
        :key="rowIndex"
        class="flex items-center"
      >
        <div class="w-6 text-center">{{ row.label }}</div>
        <div
          v-for="(seat, seatIndex) in row.seats"
          :key="seatIndex"
          class="relative"
        >
          <img
            v-if="seat.type !== 'empty'"
            :src="seatImages[seat.type]"
            :alt="seat.label"
            :class="[
              'inline-block w-full max-w-8 m-1',
              seat.type === 'sold' ? 'cursor-not-allowed' : 'cursor-pointer',
            ]"
            @click="toggleSeatSelection(rowIndex, seatIndex)"
          />
          <div v-else class="w-8 m-1"></div>
        </div>
        <div class="w-6 text-center">{{ row.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useCheckoutStore } from "~/stores/checkout";

// Import images directly
import standardSeatImg from "~/assets/images/tickets/ghe-thuong.png";
import vipSeatImg from "~/assets/images/tickets/ghe-vip.png";
import firstClassSeatImg from "~/assets/images/tickets/first-class.png";
import selectedSeatImg from "~/assets/images/tickets/ghe-da-chon.png";
import soldSeatImg from "~/assets/images/tickets/ghe-da-ban.png";

const checkout = useCheckoutStore();
const props = defineProps({
  seatMap: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:selectedSeats"]);

// Split seat types into two groups
const availableSeatTypes = ref([
  { code: "standard", label: "Standard", image: standardSeatImg },
  { code: "vip", label: "VIP", image: vipSeatImg },
  { code: "first-class", label: "First Class", image: firstClassSeatImg },
]);

const statusSeatTypes = ref([
  { code: "selected", label: "Selected", image: selectedSeatImg },
  { code: "sold", label: "Sold", image: soldSeatImg },
]);

const seatImages = {
  standard: standardSeatImg,
  vip: vipSeatImg,
  "first-class": firstClassSeatImg,
  selected: selectedSeatImg,
  sold: soldSeatImg,
};

// Convert the seatMap to the format expected by the template
const seats = ref([]);

// Store original seat types to restore them when deselected
const originalSeatTypes = {};

// Watch for changes to the seatMap prop
watch(
  () => props.seatMap,
  (newSeatMap) => {
    if (newSeatMap && Object.keys(newSeatMap).length > 0) {
      initializeSeats(newSeatMap);
    }
  },
  { immediate: true }
);

function initializeSeats(seatMap) {
  // Convert the seatMap to the format expected by the template
  seats.value = Object.entries(seatMap).map(([label, rowSeats]) => ({
    label,
    seats: JSON.parse(JSON.stringify(rowSeats)), // Deep copy to avoid reference issues
  }));

  // Store original seat types to restore them when deselected
  Object.entries(seatMap).forEach(([rowLabel, rowSeats]) => {
    originalSeatTypes[rowLabel] = rowSeats.map((seat) => seat.type);
  });

  // Apply any already selected seats from the store
  if (checkout.selectedSeats.length > 0) {
    applySelectedSeatsFromStore();
  }
}

// New function to apply existing selections from store
function applySelectedSeatsFromStore() {
  checkout.selectedSeats.forEach((seatId) => {
    const [rowLabel, seatLabel] = seatId.split("-");

    // Find the row and seat indexes
    const rowIndex = seats.value.findIndex((row) => row.label === rowLabel);
    if (rowIndex !== -1) {
      const seatIndex = seats.value[rowIndex].seats.findIndex(
        (seat) => seat.label === seatLabel
      );
      if (seatIndex !== -1) {
        // Mark this seat as selected in the UI
        seats.value[rowIndex].seats[seatIndex].type = "selected";
      }
    }
  });
}

function toggleSeatSelection(rowIndex, seatIndex) {
  const seat = seats.value[rowIndex].seats[seatIndex];
  const rowLabel = seats.value[rowIndex].label;
  const seatId = `${rowLabel}-${seat.label}`;

  if (seat.type === "sold" || seat.type === "empty") return;

  if (seat.type === "selected") {
    // Deselect the seat
    const originalType = originalSeatTypes[rowLabel][seatIndex];
    seat.type = originalType;

    // Update store
    const updatedSeats = checkout.selectedSeats.filter((s) => s !== seatId);
    const updatedTypes = { ...checkout.selectedSeatTypes };
    delete updatedTypes[seatId];
    checkout.setSelectedSeats(updatedSeats, updatedTypes);
  } else {
    // Select the seat
    const originalType = originalSeatTypes[rowLabel][seatIndex];
    seat.type = "selected";

    // Update store
    const updatedSeats = [...checkout.selectedSeats, seatId];
    const updatedTypes = {
      ...checkout.selectedSeatTypes,
      [seatId]: originalType,
    };
    checkout.setSelectedSeats(updatedSeats, updatedTypes);
  }

  // Still emit for compatibility with parent components
  emit(
    "update:selectedSeats",
    checkout.selectedSeats,
    checkout.selectedSeatTypes
  );
}

// Initialize from store when component mounts
onMounted(() => {
  if (checkout.selectedSeats.length > 0 && seats.value.length > 0) {
    applySelectedSeatsFromStore();
  }
});
</script>
