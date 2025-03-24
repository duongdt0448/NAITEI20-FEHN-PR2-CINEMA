<template>
  <div class="min-h-screen flex flex-col bg-white">
    <Header />

    <!-- Main Content -->
    <main class="flex-grow container mx-auto px-28">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup>
// import Header from "@/components/Header.vue";
// import Footer from "@/components/Footer.vue";
</script>
