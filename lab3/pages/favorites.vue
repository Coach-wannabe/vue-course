<template>
    <div class="favorites-page">
      <h1>Your Favorites</h1>
  
      <!-- List of favorited profiles -->
      <div v-if="favorites.length">
        <div v-for="favorite in favorites" :key="favorite.id" class="favorite-item">
          <h3>{{ favorite.PersonName }}</h3>
          <p>{{ favorite.Commentary }}</p>
        </div>
      </div>
      <div v-else>
        <p>No favorites yet. Add some profiles to your favorites list!</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        favorites: [] // This should come from a Vuex store or localStorage depending on your implementation
      };
    },
    mounted() {
      // Load favorites from localStorage (or Vuex, if using)
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        this.favorites = JSON.parse(storedFavorites);
      }
    }
  };
  </script>
  
  <style scoped>
  .favorites-page {
    padding: 20px;
  }
  
  .favorite-item {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .favorite-item h3 {
    margin: 0;
    font-size: 1.5rem;
    color: #3498db;
  }
  
  .favorite-item p {
    margin: 5px 0;
    font-size: 1rem;
    color: #555;
  }
  </style>
  