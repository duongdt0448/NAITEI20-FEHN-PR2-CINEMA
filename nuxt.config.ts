import tailwindcss from "@tailwindcss/vite";

import CustomPreset from "./primevue-preset";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: [
    "~/assets/css/main.css",
    "@fortawesome/fontawesome-free/css/all.min.css",
  ],
  modules: ["@primevue/nuxt-module"],
  primevue: {
    options: {
      theme: {
        preset: CustomPreset,
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
