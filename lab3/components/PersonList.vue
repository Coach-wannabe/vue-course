<template>
  <div class="person-list">
    <!-- Sorting and Filter Section -->
    <div class="controls">
      <select v-model="selectedTopic" @change="filterByTopic">
        <option value="">All Topics</option>
        <option v-for="topic in uniqueTopics" :key="topic" :value="topic">
          {{ topic }}
        </option>
      </select>

      <div class="sort-buttons">
        <button @click="sortByDateTime">Sort by Date</button>
        <button @click="sortByRating">Sort by Rating</button>
      </div>
    </div>

    <!-- Paginated Person Cards -->
    <div class="cards-wrapper">
      <div class="card" v-for="person in paginatedPersons" :key="person.id">
        <!-- Avatar Section -->
        <div class="avatar">
          <img :src="getAvatarUrl(person.Avatar)" alt="Avatar" />
        </div>
        
        <!-- Person Info Section -->
        <div class="info">
          <h4 class="person-name">
            <nuxt-link :to="`/person/${person.id}`">{{ person.PersonName }}</nuxt-link>
          </h4>
          <p class="commentary">{{ person.Commentary }}</p>
          <p class="topic">Topic: {{ person.Topic }}</p>
          <p class="pub-date">Date: {{ formatDate(person.PubDate) }}</p>

          <!-- Rating Display (Numbers instead of Stars) -->
          <div class="rating">
            <p>Rating: {{ person.Rating.toFixed(1) }} / 5</p>
          </div>

          <!-- Action Buttons -->
          <div class="actions">
            <div class="buttons">
              <button @click="toggleLike(person)">
                {{ person.isLiked ? 'Unlike' : 'Like' }}
              </button>
              <button @click="toggleFavorite(person)">
                {{ person.isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">&laquo; Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next &raquo;</button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'; 

export default {
  data() {
    return {
      persons: [
        // Sample person objects
        {
          id: 1,
          PersonName: 'John Doe',
          Avatar: 'logo.png', // Assuming you have avatar images in your assets folder
          PubDate: '2023-08-21',
          Rating: 4.5,
          Commentary: 'Great service and attention to detail.',
          Topic: 'Technology',
          isLiked: false,
          isFavorite: false
        },
        // Add more person objects here...
      ],
      selectedTopic: '',
      filteredPersons: [],
      currentPage: 1,
      itemsPerPage: 4
    };
  },
  computed: {
    uniqueTopics() {
      return [...new Set(this.persons.map(person => person.Topic))];
    },
    paginatedPersons() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPersons.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredPersons.length / this.itemsPerPage);
    }
  },
  mounted() {
    const savedPersons = localStorage.getItem('persons');
    if (savedPersons) {
      this.persons = JSON.parse(savedPersons);
    } else {
      localStorage.setItem('persons', JSON.stringify(this.persons));
    }
    this.filteredPersons = this.persons;
  },
  methods: {
    filterByTopic() {
      if (this.selectedTopic) {
        this.filteredPersons = this.persons.filter(person => person.Topic === this.selectedTopic);
      } else {
        this.filteredPersons = this.persons;
      }
      this.currentPage = 1;
    },
    sortByDateTime() {
      this.filteredPersons = _.orderBy(this.filteredPersons, ['PubDate'], ['desc']);
      this.currentPage = 1;
    },
    sortByRating() {
      this.filteredPersons = _.orderBy(this.filteredPersons, ['Rating'], ['desc']);
      this.currentPage = 1;
    },
    toggleLike(person) {
      person.isLiked = !person.isLiked;
      person.Rating += person.isLiked ? 0.1 : -0.1;
      this.saveToLocalStorage();
    },
    toggleFavorite(person) {
      person.isFavorite = !person.isFavorite;
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('persons', JSON.stringify(this.persons));
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    getAvatarUrl(avatar) {
      // Assuming the avatars are stored in `assets/` folder
      return require(`@/assets/${avatar}`);
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    }
  }
};
</script>

<style scoped>
/* Main container */
.person-list {
  padding: 20px;
}

/* Controls section */
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

select {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

/* Sort buttons */
.sort-buttons button {
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 10px;
}

.sort-buttons button:hover {
  background-color: #2980b9;
}

/* Cards Wrapper */
.cards-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two cards per row */
  gap: 20px;
}

/* Individual Card Styling */
.card {
  display: flex;
  background-color: #eaf6ff;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  align-items: center;
}

/* Avatar Section */
.avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}

/* Info Section */
.info {
  flex-grow: 1;
}

/* Person Name */
.person-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #2c3e50;
}

/* Commentary and Topic */
.commentary,
.topic,
.pub-date {
  margin: 5px 0;
  color: #666;
}

/* Rating Section */
.rating p {
  font-size: 1.2rem;
  color: #2c3e50;
  margin: 5px 0;
  font-weight: bold;
}

/* Action buttons (Like, Favorite) */
.actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.buttons button {
  padding: 8px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.buttons button:hover {
  background-color: #45a049;
}

/* Pagination Controls */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
}

.pagination button:hover:not(:disabled) {
  background-color: #2980b9;
}
</style>
