<template>
  <div class="favorites-page">
    <h1>Your Favorites</h1>
    <div v-if="favorites.length > 0">
      <div class="card" v-for="person in favorites" :key="person.id">
        <h4>{{ person.PersonName }}</h4>
        <p>{{ person.Commentary }}</p>
        <p>Topic: {{ person.Topic }}</p>
        <p>Date: {{ person.PubDate }}</p>
        <p>Rating: {{ person.Rating.toFixed(1) }}</p>
        <!-- Unlike button to remove from favorites -->
        <button @click="removeFromFavorites(person)">Remove from Favorites</button>
      </div>
    </div>
    <p v-else>No favorites added yet.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favorites: []
    };
  },
  mounted() {
    // Load persons from localStorage and filter for favorites
    const persons = JSON.parse(localStorage.getItem('persons')) || [];
    this.favorites = persons.filter(person => person.isFavorite);
  },
  methods: {
    removeFromFavorites(person) {
      // Update favorite status and remove from favorites
      person.isFavorite = false;

      // Save the updated list back to localStorage
      const persons = JSON.parse(localStorage.getItem('persons')) || [];
      const updatedPersons = persons.map(p => (p.id === person.id ? person : p));
      localStorage.setItem('persons', JSON.stringify(updatedPersons));

      // Update the local favorites list
      this.favorites = this.favorites.filter(fav => fav.id !== person.id);
    }
  }
};
</script>

<style scoped>
.favorites-page {
  padding: 20px;
}

.card {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #c0392b;
}
</style>
