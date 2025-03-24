<script setup>
import "primeicons/primeicons.css";
import SidebarProvider from "~/components/admin/SidebarProvider.vue";
</script>

<template>
  <SidebarProvider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </SidebarProvider>
</template>
