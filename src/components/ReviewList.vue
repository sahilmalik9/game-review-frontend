<template>
  <div>
    <h1>Game Reviews</h1>
    <ul>
      <li v-for="review in reviews" :key="review.id">
        <h3>{{ review.attributes.Title }}</h3>
        <p>Rating: {{ review.attributes.Rating }}</p>
        <p>{{ review.attributes.Content }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ReviewList',
  data() {
    return {
      reviews: [],
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:1337/api/reviews');
      this.reviews = response.data.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  },
};
</script>
