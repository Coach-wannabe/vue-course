<template>
  <div class="person-list">
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

    <div class="cards-wrapper">
      <div class="card" v-for="person in paginatedPersons" :key="person.id">
        <div class="avatar">
          <img :src="getAvatarUrl(person.Avatar)" alt="Avatar" />
        </div>
        <div class="info">
          <h4 class="person-name">
            <nuxt-link :to="`/person/${person.id}`">{{ person.PersonName }}</nuxt-link>
          </h4>
          <p class="commentary">{{ person.Commentary }}</p>
          <p class="topic">Topic: {{ person.Topic }}</p>
          <p class="pub-date">Date: {{ formatDate(person.PubDate) }}</p>
          <div class="rating">
            <p>Rating: {{ person.Rating.toFixed(1) }} / 5</p>
          </div>
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

    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">&laquo; Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next &raquo;</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      persons: [], // Data will be loaded from localStorage
      selectedTopic: '',
      filteredPersons: [],
      currentPage: 1,
      itemsPerPage: 4,
    };
  },
  computed: {
    uniqueTopics() {
      return [...new Set(this.persons.map((person) => person.Topic))];
    },
    paginatedPersons() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPersons.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredPersons.length / this.itemsPerPage);
    },
  },
  mounted() {
    this.loadPersons();
  },
  methods: {
    loadPersons() {
      const savedPersons = localStorage.getItem("persons");
      if (savedPersons) {
        this.persons = JSON.parse(savedPersons);
      } else {
        console.error("No persons data found in localStorage.");
      }
      this.filteredPersons = this.persons;
    },
    filterByTopic() {
      if (this.selectedTopic) {
        this.filteredPersons = this.persons.filter(
          (person) => person.Topic === this.selectedTopic
        );
      } else {
        this.filteredPersons = this.persons;
      }
      this.currentPage = 1;
    },
    sortByDateTime() {
      this.filteredPersons.sort((a, b) => new Date(b.PubDate) - new Date(a.PubDate));
      this.currentPage = 1;
    },
    sortByRating() {
      this.filteredPersons.sort((a, b) => b.Rating - a.Rating);
      this.currentPage = 1;
    },
    toggleLike(person) {
      person.isLiked = !person.isLiked;
      this.saveToLocalStorage();
    },
    toggleFavorite(person) {
      person.isFavorite = !person.isFavorite;
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("persons", JSON.stringify(this.persons));
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
      return require(`@/assets/${avatar}`);
    },
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("en-US", options);
    },
  },
};
</script>

<style scoped>
/* Main container */
.person-list {
  padding: 20px;
}

/* Controls Section */
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
}

select {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.sort-buttons {
  display: flex;
  gap: 10px;
}

.sort-buttons button {
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.sort-buttons button:hover {
  background-color: #2980b9;
}

/* Cards Wrapper */
.cards-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

/* Individual Card */
.card {
  display: flex;
  flex-direction: column;
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
  margin-bottom: 15px;
}

/* Info Section */
.info {
  text-align: center;
}

.person-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #2c3e50;
}

.commentary,
.topic,
.pub-date {
  margin: 5px 0;
  color: #666;
  font-size: 0.9rem;
}

.rating p {
  font-size: 1.2rem;
  color: #2c3e50;
  font-weight: bold;
}

/* Actions Section */
.actions {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Proper spacing between buttons */
  align-items: center;
}

.buttons button {
  padding: 12px 20px; /* Increased padding for touch interaction */
  margin: 5px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  max-width: 250px; /* Limit button width */
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

/* Responsive Styles */
@media (max-width: 768px) {
  .cards-wrapper {
    grid-template-columns: 1fr; /* Single column for tablets and below */
  }

  .controls {
    flex-direction: column; /* Stack controls vertically */
    align-items: stretch;
  }

  .sort-buttons {
    flex-direction: column;
    gap: 15px;
  }
}

@media (max-width: 576px) {
  .person-name {
    font-size: 1.2rem;
  }

  .commentary,
  .topic,
  .pub-date {
    font-size: 0.8rem;
  }

  .buttons button {
    padding: 15px;
  }
}
</style>
