<template>
  <header class="header border-b border-gray-200">
    <div class="top-banner">
      <img src="@/assets/images/banner.png" alt="Mừng Xuân Ất Tỵ 2025" />
    </div>
    <nav class="nav-bar">
      <div class="logo">
        <img src="@/assets/images/bhd-cineplex-logo.png" alt="BHD Cineplex" />
      </div>

      <!-- Show stepper for tickets pages -->
      <template v-if="isTicketsPage">
        <Stepper :value="currentStep" class="flex-1 mx-8">
          <StepList>
            <Step value="1"></Step>
            <Step value="2"></Step>
            <Step value="3"></Step>
            <Step value="4"></Step>
          </StepList>
        </Stepper>
      </template>

      <!-- Show regular nav links for other pages -->
      <ul v-else class="nav-links">
        <li class="dropdown">
          <button class="dropdown-btn">NOW SHOWING ▼</button>
          <div class="dropdown-content">
            <a href="#">LỊCH CHIẾU PHIM</a>
            <a href="#">LỊCH CHIẾU RẠP</a>
          </div>
        </li>
        <li><a href="#">ĐỒ ĂN/COMBO</a></li>
        <li><a href="#">KHUYẾN MÃI</a></li>
        <li><a href="#">DỊCH VỤ</a></li>
        <li class="dropdown">
          <button class="dropdown-btn">VÉ BHD STAR ▼</button>
          <div class="dropdown-content">
            <a href="#">HỆ THỐNG RẠP</a>
            <a href="#">VỀ CHÚNG TÔI</a>
            <a href="#">TUYỂN DỤNG</a>
          </div>
        </li>
      </ul>

      <div class="actions">
        <button class="location">HÀ NỘI ▼</button>
        <button class="login">Đăng nhập/Đăng ký</button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Check if we're on a tickets page
const isTicketsPage = computed(() => {
  return route.path.includes("/tickets/");
});

// Determine current step based on route
const currentStep = computed(() => {
  // Default to step 0
  let step = "1";

  // If on the second step (/tickets/{id}/2)
  if (route.path.endsWith("/2")) {
    step = "2";
  }
  // If on the third step (/tickets/{id}/3)
  else if (route.path.endsWith("/3")) {
    step = "3";
  }
  // If on the fourth step (/tickets/{id}/4)
  else if (route.path.endsWith("/4")) {
    step = "4";
  }

  return step;
});
</script>

<style scoped>
.header {
  background: white;
}

.top-banner img {
  width: 100%;
}

.nav-bar {
  display: flex;
  align-items: center;
  padding: 20px 100px;
  background: white;
}

.logo img {
  height: 40px;
  margin-right: 20px;
}

.nav-links {
  display: flex;
  align-items: center;
  list-style: none;
  gap: 30px;
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 14px;
}

.nav-links a {
  text-decoration: none;
  color: black;
}

.actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 15px;
}

button {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: Arial, sans-serif;
  font-weight: bold;
}

.location {
  border: 1px solid gray;
  background: white;
}

.login {
  background: #72be43;
  color: white;
}

.dropdown {
  position: relative;
}

.dropdown-btn {
  background-color: transparent;
  color: black;
  border: none;
  cursor: pointer;
  padding: 10px 15px;
  font-weight: bold;
  font-family: Arial, sans-serif;
}

.dropdown-btn:hover {
  color: #4caf50;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  min-width: 180px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 5px;
  top: 100%;
  left: 0;
  padding: 5px 0;
}

.dropdown-content a {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.dropdown:hover .dropdown-content {
  display: block;
}

/* Custom styling for stepper */
:deep(.p-step-number) {
  width: 48px !important; /* Tăng kích thước vòng tròn */
  height: 48px !important;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
}

/* Undone step */
:deep(.p-step.p-step-active ~ .p-step .p-step-number) {
  background: white !important;
  color: var(--color-primary) !important;
  border: 2px solid rgb(209 213 219 / var(--tw-text-opacity, 1)) !important;
}

/* Done step */
:deep(.p-step[data-p-active="false"] .p-step-number) {
  background: var(--color-primary) !important; /* Màu nền primary */
  color: white !important;
  border: none !important;
}

/* Current step */
:deep(.p-step.p-step-active .p-step-number) {
  background: white !important;
  border: 2px solid var(--color-primary) !important;
  color: var(--color-primary) !important;
}
</style>
