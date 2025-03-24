<template>
  <div class="py-4 px-6 mr-8 bg-white rounded-2xl border border-gray-200">
    <div class="text-center">
      <div class="tab-buttons">
        <a href="#" class="selected font-bold text-lg">Concession</a>
      </div>
    </div>
    <hr class="border-dashed border-gray-200 -mx-6 my-4" />
    <div class="tab-content">
      <div
        v-for="food in foods"
        :key="food.id"
        class="concession-item flex items-center"
      >
        <div class="w-20 flex-shrink-0">
          <img
            :src="food.image_url"
            alt="food.name"
            class="w-full h-full object-contain rounded-lg"
          />
        </div>
        <div class="ml-4 flex-1">
          <h3 class="font-semibold text-lg">{{ food.name }}</h3>
          <p class="text-gray-600 text-sm">{{ food.description }}</p>
          <div class="flex justify-between items-center mt-2">
            <div class="flex items-center">
              <button
                @click="decreaseQuantity(food.id, food)"
                class="size-6 bg-gray-200 rounded-full flex items-center justify-center"
                :disabled="getQuantity(food.id) <= 0"
                :class="{
                  'opacity-50 cursor-not-allowed': getQuantity(food.id) <= 0,
                }"
              >
                <span class="text-lg font-medium leading-none mb-0.5">−</span>
              </button>

              <div class="w-8 text-center">
                <span class="inline-block">{{ getQuantity(food.id) }}</span>
              </div>

              <button
                @click="increaseQuantity(food.id, food)"
                class="size-6 bg-primary rounded-full flex items-center justify-center"
              >
                <span class="text-lg font-medium leading-none mb-0.5">+</span>
              </button>
            </div>
            <span class="text-right">
              <del class="text-gray-400 text-sm">{{
                formatCurrency(food.oldPrice)
              }}</del
              ><br />
              <span class="text-red-500 font-bold">{{
                formatCurrency(food.price)
              }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { formatCurrency } from "~/utils/format";
import { useCheckoutStore } from "~/stores/checkout";

const checkout = useCheckoutStore();
const props = defineProps({
  foods: {
    type: Array,
    required: true,
  },
});

const quantities = ref({});

// Initialize quantities from store or set to 0
onMounted(() => {
  // First set all foods to quantity 0
  props.foods.forEach((food) => {
    quantities.value[food.id] = 0;
  });

  // Then update with any existing selections from store
  if (checkout.selectedFoods && checkout.selectedFoods.length > 0) {
    checkout.selectedFoods.forEach((item) => {
      if (item && item.id) {
        quantities.value[item.id] = item.quantity;
      }
    });
  }
});

// Helper to get quantity for a food item
const getQuantity = (id) => {
  return quantities.value[id] || 0;
};

// Update quantities and update store
const increaseQuantity = (id, food) => {
  quantities.value[id] = (quantities.value[id] || 0) + 1;
  updateStore(id, food);
};

const decreaseQuantity = (id, food) => {
  if (quantities.value[id] > 0) {
    quantities.value[id] -= 1;
    updateStore(id, food);
  }
};

// Update the store with current selections
const updateStore = (id, food) => {
  const selectedFoods = [];

  // Convert quantities object to array of selected foods
  for (const [foodId, quantity] of Object.entries(quantities.value)) {
    if (quantity > 0) {
      // Find the food object from props
      const foodItem = props.foods.find(
        (f) => f.id.toString() === foodId.toString()
      );
      if (foodItem) {
        selectedFoods.push({
          id: foodItem.id,
          name: foodItem.name,
          price: foodItem.price,
          quantity: quantity,
          image_url: foodItem.image_url,
        });
      }
    }
  }

  // Update the store
  checkout.setSelectedFoods(selectedFoods);
};
</script>
