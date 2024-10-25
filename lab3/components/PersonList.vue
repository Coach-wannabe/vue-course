<template>
  <div class="container">
    <!-- Topic Selection Dropdown -->
    <div class="dropdown">
      <label for="topic">Select Topic:</label>
      <select v-model="selectedTopic" @change="filterByTopic">
        <option value="">All Topics</option>
        <option v-for="topic in uniqueTopics" :key="topic" :value="topic">
          {{ topic }}
        </option>
      </select>
    </div>

    <!-- Sort Buttons -->
    <div class="sort-buttons">
      <button @click="sortByDateTime">Sort by DateTime</button>
      <button @click="sortByRating">Sort by Rating</button>
    </div>

    <!-- Paginated Person Cards -->
    <div class="cards-wrapper">
      <div
        class="card"
        v-for="person in paginatedPersons"
        :key="person.id"
      >
        <div class="info">
          <h4>
            <nuxt-link :to="`/person/${person.id}`">{{ person.PersonName }}</nuxt-link>
          </h4>
          <p>{{ person.Commentary }}</p>
          <p>Topic: {{ person.Topic }}</p>
          <p>Date: {{ person.PubDate }}</p>
          <p>Rating: {{ person.Rating.toFixed(1) }}</p>
          <button @click="toggleLike(person)">
            {{ person.isLiked ? 'Unlike' : 'Like' }}
          </button>
          <button @click="toggleFavorite(person)">
            {{ person.isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
          </button>
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
import _ from 'lodash'; // Import Lodash

export default {
  data() {
    return {
      persons: [
        {
          id: 1,
          PersonName: 'John Doe',
          Avatar: 'logo.png',
          PubDate: '2023-08-21',
          Rating: 4.5,
          Commentary: 'Great service and attention to detail.',
          Topic: 'Technology',
          Email: 'johndoe@example.com',
          Password: 'password123',
          isLiked: false,
          isFavorite: false
        },
        {
          id: 2,
          PersonName: 'Jane Smith',
          Avatar: 'logo.png',
          PubDate: '2022-12-10',
          Rating: 3.8,
          Commentary: 'Good experience overall.',
          Topic: 'Finance',
          Email: 'janesmith@example.com',
          Password: 'password123',
          isLiked: false,
          isFavorite: false
        },
        // Add more person objects as needed...
      ],
      selectedTopic: '', // Store the currently selected topic
      filteredPersons: [], // Holds the filtered list of persons
      currentPage: 1,      // Current page number for pagination
      itemsPerPage: 4      // Number of items per page
    };
  },
  computed: {
    uniqueTopics() {
      return [...new Set(this.persons.map(person => person.Topic))];
    },
    paginatedPersons() {
      // Calculate start and end indices for the current page
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPersons.slice(start, end);
    },
    totalPages() {
      // Calculate total number of pages
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
        this.filteredPersons = this.persons.filter(
          person => person.Topic === this.selectedTopic
        );
      } else {
        this.filteredPersons = this.persons;
      }
      this.currentPage = 1; // Reset to first page when filtering
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
      if (person.isLiked) {
        person.Rating = Math.max(0, person.Rating - 0.1);
        person.isLiked = false;
      } else {
        person.Rating += 0.1;
        person.isLiked = true;
      }
      this.saveToLocalStorage();
    },
    toggleFavorite(person) {
      person.isFavorite = !person.isFavorite;
      this.saveToLocalStorage();
      this.filteredPersons = [...this.persons];
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
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.dropdown {
  margin-bottom: 20px;
}

.sort-buttons {
  margin-bottom: 20px;
}

.sort-buttons button {
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
}

.sort-buttons button:hover {
  background-color: #2980b9;
}

.cards-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.card {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.info h4 {
  margin: 0;
  font-size: 1.5rem;
}

.info p {
  margin: 5px 0;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  background-color: #2980b9;
}
</style>
