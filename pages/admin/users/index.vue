<template>
  <PageBreadcrumb :pageTitle="currentPageTitle" />
  <div class="space-y-5 sm:space-y-6">
    <ComponentCard title="Basic Table 1">
      <BasicTableOne />
    </ComponentCard>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

import { ref } from "vue";
import PageBreadcrumb from "@/components/admin/PageBreadcrumb.vue";
import ComponentCard from "@/components/admin/ComponentCard.vue";
import BasicTableOne from "@/components/admin/table/BasicTableOne.vue";
const currentPageTitle = ref("Basic Tables");
</script>
