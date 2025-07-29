import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:1337/api', // Strapi URL
});

export const getReviews = async () => {
  const res = await api.get('/reviews?populate=*'); // populate=* gets media too
  return res.data.data;
};
