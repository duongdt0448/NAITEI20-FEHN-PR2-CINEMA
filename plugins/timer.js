import { useCheckoutStore } from "~/stores/checkout";
import { watch } from "vue";
import { useRouter } from "vue-router";

export default defineNuxtPlugin((nuxtApp) => {
  let intervalId = null;
  const checkout = useCheckoutStore();

  // Start the timer when the app initializes
  if (import.meta.client) {
    if (!intervalId && checkout.timerStarted) {
      intervalId = setInterval(() => {
        checkout.decrementTimer();
      }, 1000);
    }

    // Watch for timer state changes
    watch(
      () => checkout.timerStarted,
      (isStarted) => {
        if (isStarted && !intervalId) {
          intervalId = setInterval(() => {
            checkout.decrementTimer();
          }, 1000);
        } else if (!isStarted && intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }
    );

    // Watch for timer expiration
    watch(
      () => checkout.remainingSeconds,
      (seconds) => {
        if (seconds === 0 && checkout.timerStarted) {
          // Get the router
          const router = useRouter();
          // Timer expired, redirect to home
          router.push("/");
          // Show a notification
          alert("Phiên đặt vé đã hết hạn");
          checkout.resetTimer();
        }
      }
    );

    // Proper cleanup using Nuxt's app hooks
    nuxtApp.hook("app:beforeMount", () => {
      // Start timer if needed when app mounts
      if (checkout.timerStarted && !intervalId) {
        intervalId = setInterval(() => {
          checkout.decrementTimer();
        }, 1000);
      }
    });

    nuxtApp.hook("app:unmount", () => {
      // Clean up intervals when app unmounts
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    });
  }
});
