<template>
  <div class="container">
    <header class="site-header">
      <h1>Game Review Site</h1>
      <nav>
        <a href="#" class="nav-link">Home</a>
        <a href="#" class="nav-link">Reviews</a>
        <a href="#" class="nav-link">About</a>
      </nav>
    </header>

    <h1 class="heading">Game Reviews</h1>

    <div v-if="loading" class="status">Loading reviews...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="reviews-grid">
      <div v-for="review in reviews" :key="review.id" class="card">
        <img
          v-if="review.attributes.CoverImage?.data"
          :src="`http://localhost:1337${review.attributes.CoverImage.data.attributes.url}`"
          :alt="review.attributes.Title"
          class="cover"
        />
        <h2 class="title">{{ review.attributes.Title }}</h2>
        <p class="rating"><strong>Rating:</strong> {{ review.attributes.Rating }}/10</p>
        <p class="release"><strong>Release Date:</strong> {{ new Date(review.attributes.ReleaseDate).toLocaleDateString() }}</p>
        <p class="content">{{ review.attributes.Content }}</p>
      </div>
    </div>

    <footer class="site-footer">
      <p>© 2025 Game Review Site. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const reviews = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:1337/api/reviews?populate=*')
    reviews.value = response.data.data
  } catch (err) {
    console.error('Error fetching reviews:', err)
    error.value = 'Failed to load reviews. Please try again later.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 100%;
  padding: 40px 5%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background: #f5f7fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  background-color: #2c3e50;
  padding: 20px 0;
  color: white;
  text-align: center;
  margin-bottom: 20px;
}

.site-header h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
}

nav {
  margin-top: 10px;
}

.nav-link {
  color: #ecf0f1;
  margin: 0 15px;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #1abc9c;
}

.heading {
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 50px;
  color: #2c3e50;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.status,
.error {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 20px;
}

.error {
  color: #e74c3c;
  font-weight: bold;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 40px;
  width: 100%;
  padding: 10px 0;
  flex-grow: 1;
}

.card {
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.cover {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
}

.title {
  font-size: 1.8rem;
  color: #34495e;
  margin-bottom: 10px;
}

.rating,
.release,
.content {
  font-size: 1rem;
  line-height: 1.4;
  color: #555;
  margin-bottom: 10px;
}

.site-footer {
  background-color: #2c3e50;
  color: #ecf0f1;
  text-align: center;
  padding: 15px 0;
  margin-top: 40px;
  font-weight: 500;
  font-size: 1rem;
}
</style>
