import { defineStore } from "pinia";

export const useCheckoutStore = defineStore("checkout", {
  state: () => ({
    // Movie/theater info
    movieData: null,
    theaterData: {
      name: "BHD Star Pham Ngoc Thach",
      screen: "Screen 7",
      date: "21/3/2025",
      showtime: "13h35",
    },

    // Seat selection
    selectedSeats: [],
    selectedSeatTypes: {},

    // Pricing
    pricing: {
      standard: 90000,
      vip: 105000,
      "first-class": 125000,
    },

    // Food selection
    selectedFoods: [],

    // Timer
    remainingSeconds: 8 * 60,
    timerStarted: false,
  }),

  actions: {
    setMovieData(data) {
      this.movieData = data;
    },

    setSelectedSeats(seats, types) {
      this.selectedSeats = seats;
      this.selectedSeatTypes = types;
    },

    setSelectedFoods(foods) {
      this.selectedFoods = foods;
    },

    addFoodItem(food, quantity = 1) {
      const existingItemIndex = this.selectedFoods.findIndex(
        (item) => item.id === food.id
      );

      if (existingItemIndex >= 0) {
        this.selectedFoods[existingItemIndex].quantity += quantity;
      } else {
        this.selectedFoods.push({
          id: food.id,
          name: food.name,
          price: food.price,
          quantity: quantity,
          image_url: food.image_url,
        });
      }
    },

    removeFoodItem(foodId, quantity = 1) {
      const existingItemIndex = this.selectedFoods.findIndex(
        (item) => item.id === foodId
      );

      if (existingItemIndex >= 0) {
        this.selectedFoods[existingItemIndex].quantity -= quantity;

        if (this.selectedFoods[existingItemIndex].quantity <= 0) {
          this.selectedFoods.splice(existingItemIndex, 1);
        }
      }
    },

    startTimer() {
      if (!this.timerStarted) {
        this.timerStarted = true;
      }
    },

    decrementTimer() {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
      }
    },

    resetTimer() {
      this.remainingSeconds = 8 * 60;
      this.timerStarted = false;
    },

    resetCheckout() {
      this.selectedSeats = [];
      this.selectedSeatTypes = {};
      this.selectedFoods = [];
    },
  },

  getters: {
    // Total for seats only
    formattedRemainingTime: (state) => {
      const minutes = Math.floor(state.remainingSeconds / 60);
      const seconds = state.remainingSeconds % 60;
      return `${minutes} phút, ${seconds < 10 ? "0" : ""}${seconds} giây`;
    },

    // Total for seats only
    seatTotal: (state) => {
      let total = 0;
      state.selectedSeats.forEach((seat) => {
        const type = state.selectedSeatTypes[seat] || "standard";
        total += state.pricing[type] || 0;
      });
      return total;
    },

    // Total for food only
    foodTotal: (state) => {
      return state.selectedFoods.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },

    // Total for the entire order
    orderTotal: (state) => {
      // Calculate seat total
      let seatTotal = 0;
      state.selectedSeats.forEach((seat) => {
        const type = state.selectedSeatTypes[seat] || "standard";
        seatTotal += state.pricing[type] || 0;
      });

      // Calculate food total
      const foodTotal = state.selectedFoods.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);

      // Return combined total
      return seatTotal + foodTotal;
    },
  },
});
