<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-4">Game Reviews</h1>
    <div v-if="reviews.length">
      <div
        v-for="review in reviews"
        :key="review.id"
        class="mb-6 p-4 border rounded shadow"
      >
        <img
          v-if="review.attributes.coverImage.data"
          :src="review.attributes.coverImage.data.attributes.url"
          alt="Cover"
          class="w-48 mb-2"
        />
        <h2 class="text-xl font-semibold">{{ review.attributes.title }}</h2>
        <p><strong>Rating:</strong> {{ review.attributes.rating }}/10</p>
        <p><strong>Platform:</strong> {{ review.attributes.gamePlatform }}</p>
        <p><strong>Release Date:</strong> {{ review.attributes.releaseDate }}</p>
        <p class="mt-2">{{ review.attributes.description }}</p>
      </div>
    </div>
    <div v-else>Loading reviews...</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getReviews } from '../services/api.js';

const reviews = ref([]);

onMounted(async () => {
  reviews.value = await getReviews();
});
</script>
