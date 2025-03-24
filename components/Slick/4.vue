<template>
  <div class="carousel-container2">
    <div v-if="loading" class="loading-container">
      <p>Loading posts...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <p>{{ error }}</p>
    </div>

    <Carousel v-else-if="posts.length > 0" v-bind="carouselConfig">
      <Slide v-for="(post, index) in posts" :key="index">
        <NuxtLink :to="`/posts/${post.id}`" class="w-full h-full">
          <img :src="post.image_url" alt="posts" class="post-image" />
          <div class="post-overlay">
            <h3 class="post-title">{{ post.title }}</h3>
          </div>
        </NuxtLink>
      </Slide>

      <template #addons>
        <Navigation>
          <template #prev>
            <span class="custom-prev">❮</span>
          </template>
          <template #next>
            <span class="custom-next">❯</span>
          </template>
        </Navigation>
        <Pagination />
      </template>
    </Carousel>

    <div v-else class="empty-container">
      <p>No posts available</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

const carouselConfig = {
  itemsToShow: 1,
  wrapAround: true,
  autoplay: false,
  autoplaySpeed: 3000,
  transition: 500,
};

// Fetch posts when component mounts
onMounted(async () => {
  try {
    loading.value = true;
    const response = await fetch("http://localhost:5000/posts");

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const data = await response.json();
    posts.value = data;

    console.log(`Loaded ${posts.value.length} posts`);
  } catch (err) {
    console.error("Error fetching posts:", err);
    error.value = `Failed to load posts: ${err.message}`;
  } finally {
    loading.value = false;
  }
});
</script>

<style>
.carousel-container2 {
  width: 100%;
  max-width: 1355px; /* Đảm bảo có max-width để không bị nhảy */
  margin: 0px;
}

.loading-container,
.error-container,
.empty-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  background-color: #f8f9fa;
  border-radius: 8px;
  color: #666;
}

.error-container {
  color: #dc3545;
}

.post-image {
  width: 100%;
  height: 720px;
  object-fit: cover;
  border-radius: 8px;
}

.post-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.post-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.carousel__pagination {
  position: relative;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 50px;
}

.carousel__pagination-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ccc;
  transition: background-color 0.3s, transform 0.3s;
}

.carousel__pagination-button:hover {
  background-color: #999;
}

.carousel__pagination-button--active {
  background-color: #58b947 !important;
  transform: scale(1.3);
}

.carousel__prev,
.carousel__next {
  font-size: 24px;
  background: rgba(0, 255, 0, 0.2);
  color: #4caf50; /* Màu xanh lá */
  border: none;
  padding: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 10;
  border-radius: 50%;
  transition: background 0.3s ease-in-out;
}

.carousel__prev {
  left: 10px;
}

.carousel__next {
  right: 10px;
}

.carousel__prev:hover,
.carousel__next:hover {
  background: rgba(0, 255, 0, 0.5);
}

.custom-prev,
.custom-next {
  font-size: 32px;
  font-weight: bold;
  padding: 5px;
}
</style>
