<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useMarkdown } from "~/composables/useMarkdown";

const route = useRoute();
const post = ref(null);
const isLoading = ref(true);
const error = ref(null);

const postId = route.params.postId;

const { renderMarkdown } = useMarkdown();

onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await fetch(`http://localhost:5000/posts/${postId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`);
    }

    const data = await response.json();

    post.value = {
      ...data,
      content: renderMarkdown(data.content),
    };
  } catch (err) {
    console.error("Error fetching post:", err);
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="py-8">
    <div v-if="isLoading" class="flex justify-center py-8">
      <div class="text-lg">Đang tải bài viết...</div>
    </div>

    <div v-else-if="error" class="text-red-500 py-8">
      {{ error }}
    </div>

    <div v-else-if="post" class="flex justify-center space-x-8">
      <div class="flex-1/3">
        <img
          v-if="post.image_url"
          :src="post.image_url"
          alt="Post Image"
          class="w-full rounded-lg max-h-80 object-cover"
        />
        <div class="mt-4 flex items-center justify-center space-x-4">
          <SocialShare
            v-for="network in ['facebook', 'x', 'pinterest', 'linkedin']"
            :key="network"
            :network="network"
            :styled="true"
            :label="false"
          />
        </div>
      </div>
      <div class="flex-2/3">
        <h1 class="text-2xl font-bold text-primary">{{ post.title }}</h1>
        <p v-if="post.date" class="text-gray-500 mt-2">{{ post.date }}</p>
        <div class="prose max-w-none mt-6" v-html="post.content"></div>
      </div>
    </div>

    <div v-else class="py-8 text-center">Không tìm thấy bài viết</div>
  </div>
</template>

<style scoped>
:deep(.prose p) {
  margin-bottom: 1rem;
  line-height: 1.6;
}

:deep(.prose h2) {
  font-size: 1.25rem;
  font-weight: 700;
  color: black;
  margin-bottom: 0.5rem;
}

:deep(.prose ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

:deep(.prose ol) {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

:deep(.prose li) {
  margin-bottom: 0.5rem;
}

:deep(.prose blockquote) {
  border-left: 4px solid #e2e8f0;
  padding-left: 1rem;
  font-style: italic;
  margin: 1rem 0;
}

:deep(.prose a) {
  color: var(--color-primary);
  text-decoration: underline;
}

:deep(.prose img) {
  max-width: 100%;
  margin: 1rem 0;
  border-radius: 0.375rem;
}

:deep(.prose pre) {
  background-color: #f7fafc;
  border-radius: 0.375rem;
  padding: 1rem;
  overflow-x: auto;
  margin: 1rem 0;
}

:deep(.prose code) {
  background-color: #f7fafc;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.social-share-button:hover {
  background-color: var(--color-primary);
  color: white;
}
</style>
