<template>
  <div class="h-fit py-4 px-6 mr-8 bg-white rounded-2xl border border-gray-200">
    <div class="text-center">
      <div class="tab-buttons">
        <a href="#" class="selected font-bold text-lg"
          >Phương thức thanh toán</a
        >
      </div>
    </div>
    <hr class="border-dashed border-gray-200 -mx-6 my-4" />
    <div class="tab-content">
      <div
        v-for="gateway in paymentGateways"
        :key="gateway.id"
        class="group rounded-lg p-3 mb-2 cursor-pointer hover:bg-gray-100"
        @click="selectedPayment = gateway.id"
      >
        <div class="flex items-center space-x-3">
          <input
            type="radio"
            name="payment"
            :value="gateway.id"
            v-model="selectedPayment"
            class="appearance-none size-6 rounded-full checked:bg-primary group-hover:bg-primary border-2 border-gray-200 group-hover:border-transparent checked:border-transparent checked:ring-2 checked:ring-offset-2 checked:ring-primary"
          />

          <div class="w-10 flex-shrink-0">
            <img
              :src="gateway.icon"
              alt="gateway.title"
              class="w-full h-full object-contain"
            />
          </div>
          <span class="text-sm font-medium">{{ gateway.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const selectedPayment = ref(null);
const emit = defineEmits(["payment-method-change"]);

watch(selectedPayment, (newValue) => {
  emit("payment-method-change", newValue);
});

const paymentGateways = [
  {
    id: "vnpay",
    icon: "https://www.bhdstar.vn/wp-content/assets/loodo/vnpay.png",
    title: "Thanh toán qua VNPAY (Visa, Master, Amex, JCB,...)",
  },
  {
    id: "momo",
    icon: "https://www.bhdstar.vn/wp-content/assets/loodo/momo.png",
    title: "Thanh toán bằng Ví điện tử MoMo",
  },
  {
    id: "zlp",
    icon: "https://www.bhdstar.vn/wp-content/assets/loodo/zlp.png",
    title: "Zalopay QR đa năng",
  },
  {
    id: "shopeepay",
    icon: "https://www.bhdstar.vn/wp-content/assets/loodo/shopeepay.png",
    title: "Thanh toán qua SHOPEEPAY",
  },
];
</script>
