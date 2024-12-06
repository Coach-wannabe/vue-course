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
import _ from 'lodash';

export default {
  data() {
    return {
      persons: [
        {
        id: 1,
        PersonName: "John Doe",
        Avatar: "logo.png",
        PubDate: "2023-08-21",
        Rating: 4.5,
        Commentary: "Great service and attention to detail.",
        Topic: "Technology",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 2,
        PersonName: "Alice Smith",
        Avatar: "logo.png",
        PubDate: "2023-12-03",
        Rating: 4.8,
        Commentary: "Incredible insights and guidance.",
        Topic: "Finance",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 3,
        PersonName: "Robert Taylor",
        Avatar: "logo.png",
        PubDate: "2024-01-15",
        Rating: 3.9,
        Commentary: "Helpful, but could be more detailed.",
        Topic: "Health",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 4,
        PersonName: "Sophia Johnson",
        Avatar: "logo.png",
        PubDate: "2023-11-20",
        Rating: 4.3,
        Commentary: "Thorough and well-structured content.",
        Topic: "Education",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 5,
        PersonName: "Michael Brown",
        Avatar: "logo.png",
        PubDate: "2023-09-15",
        Rating: 5.0,
        Commentary: "Fantastic effort and dedication.",
        Topic: "Sports",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 6,
        PersonName: "Emily Davis",
        Avatar: "logo.png",
        PubDate: "2024-02-10",
        Rating: 3.7,
        Commentary: "Some parts were insightful, others less so.",
        Topic: "Technology",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 7,
        PersonName: "Daniel Moore",
        Avatar: "logo.png",
        PubDate: "2023-07-30",
        Rating: 4.6,
        Commentary: "Straightforward advice, easy to follow.",
        Topic: "Finance",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 8,
        PersonName: "Grace Taylor",
        Avatar: "logo.png",
        PubDate: "2023-10-05",
        Rating: 3.5,
        Commentary: "Simplistic but effective tips.",
        Topic: "Health",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 9,
        PersonName: "Ethan Wilson",
        Avatar: "logo.png",
        PubDate: "2023-12-25",
        Rating: 4.2,
        Commentary: "Engaging and thought-provoking discussions.",
        Topic: "Education",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 10,
        PersonName: "Isabella Garcia",
        Avatar: "logo.png",
        PubDate: "2023-08-19",
        Rating: 4.9,
        Commentary: "Loved the depth and clarity.",
        Topic: "Sports",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 11,
        PersonName: "Jack Martinez",
        Avatar: "logo.png",
        PubDate: "2024-03-01",
        Rating: 3.8,
        Commentary: "Could use more visual aids.",
        Topic: "Technology",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 12,
        PersonName: "Mia Anderson",
        Avatar: "logo.png",
        PubDate: "2023-09-08",
        Rating: 4.4,
        Commentary: "Well-rounded and concise material.",
        Topic: "Finance",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 13,
        PersonName: "Oliver Thomas",
        Avatar: "logo.png",
        PubDate: "2023-11-11",
        Rating: 4.7,
        Commentary: "Engaged me right from the start.",
        Topic: "Health",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 14,
        PersonName: "Amelia White",
        Avatar: "logo.png",
        PubDate: "2023-10-22",
        Rating: 3.6,
        Commentary: "Interesting perspective, worth exploring.",
        Topic: "Education",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 15,
        PersonName: "Lucas Harris",
        Avatar: "logo.png",
        PubDate: "2023-09-27",
        Rating: 4.1,
        Commentary: "Solid advice for beginners.",
        Topic: "Sports",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 16,
        PersonName: "Charlotte Clark",
        Avatar: "logo.png",
        PubDate: "2024-02-18",
        Rating: 4.5,
        Commentary: "Exceptional clarity in every section.",
        Topic: "Technology",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 17,
        PersonName: "Henry Lewis",
        Avatar: "logo.png",
        PubDate: "2023-12-07",
        Rating: 3.9,
        Commentary: "A good mix of theory and practice.",
        Topic: "Finance",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 18,
        PersonName: "Ella Walker",
        Avatar: "logo.png",
        PubDate: "2023-11-30",
        Rating: 4.3,
        Commentary: "A few areas could use more detail.",
        Topic: "Health",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 19,
        PersonName: "Liam Hall",
        Avatar: "logo.png",
        PubDate: "2023-08-12",
        Rating: 4.0,
        Commentary: "Balanced and informative content.",
        Topic: "Education",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 20,
        PersonName: "Emma Allen",
        Avatar: "logo.png",
        PubDate: "2024-01-25",
        Rating: 4.8,
        Commentary: "Really resonated with me, excellent!",
        Topic: "Sports",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 1001,
        PersonName: "User 12",
        Avatar: "logo.png",
        PubDate: "2024-11-15",
        Rating: 4.5,
        Commentary: "Excellent insights on the topic!",
        Topic: "Technology",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 1002,
        PersonName: "User 24",
        Avatar: "logo.png",
        PubDate: "2024-11-18",
        Rating: 3.8,
        Commentary: "Helpful and well-structured.",
        Topic: "Finance",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 1003,
        PersonName: "User 36",
        Avatar: "logo.png",
        PubDate: "2024-11-20",
        Rating: 4.2,
        Commentary: "Good balance of information.",
        Topic: "Health",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 1004,
        PersonName: "User 48",
        Avatar: "logo.png",
        PubDate: "2024-11-12",
        Rating: 4.0,
        Commentary: "Clear and easy to follow.",
        Topic: "Education",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 1005,
        PersonName: "User 52",
        Avatar: "logo.png",
        PubDate: "2024-11-22",
        Rating: 3.7,
        Commentary: "Some parts could be more detailed.",
        Topic: "Sports",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 1006,
        PersonName: "User 67",
        Avatar: "logo.png",
        PubDate: "2024-11-08",
        Rating: 4.3,
        Commentary: "Engaging and insightful.",
        Topic: "Technology",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 1007,
        PersonName: "User 72",
        Avatar: "logo.png",
        PubDate: "2024-11-10",
        Rating: 4.8,
        Commentary: "Very practical advice.",
        Topic: "Finance",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 1008,
        PersonName: "User 84",
        Avatar: "logo.png",
        PubDate: "2024-11-19",
        Rating: 4.6,
        Commentary: "Loved the clarity and structure.",
        Topic: "Health",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 1009,
        PersonName: "User 91",
        Avatar: "logo.png",
        PubDate: "2024-11-25",
        Rating: 3.9,
        Commentary: "Informative but slightly rushed.",
        Topic: "Education",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 1010,
        PersonName: "User 45",
        Avatar: "logo.png",
        PubDate: "2024-11-28",
        Rating: 4.4,
        Commentary: "Great for beginners.",
        Topic: "Sports",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 1011,
        PersonName: "User 12",
        Avatar: "logo.png",
        PubDate: "2024-12-03",
        Rating: 4.7,
        Commentary: "Fantastic and well-organized content.",
        Topic: "Technology",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 1012,
        PersonName: "User 23",
        Avatar: "logo.png",
        PubDate: "2024-12-02",
        Rating: 4.1,
        Commentary: "Good examples and practical advice.",
        Topic: "Finance",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 1013,
        PersonName: "User 37",
        Avatar: "logo.png",
        PubDate: "2024-12-04",
        Rating: 4.5,
        Commentary: "Engaging and informative.",
        Topic: "Health",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 1014,
        PersonName: "User 56",
        Avatar: "logo.png",
        PubDate: "2024-12-01",
        Rating: 3.9,
        Commentary: "Interesting perspective.",
        Topic: "Education",
        isLiked: false,
        isFavorite: false,
      },
      {
        id: 1015,
        PersonName: "User 64",
        Avatar: "logo.png",
        PubDate: "2024-12-05",
        Rating: 4.3,
        Commentary: "Loved the attention to detail.",
        Topic: "Sports",
        isLiked: false,
        isFavorite: false,
      },
      ],
      selectedTopic: '',
      filteredPersons: [],
      currentPage: 1,
      itemsPerPage: 4
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
        console.log("Loaded persons from localStorage:", this.persons);
      } else {
        localStorage.setItem("persons", JSON.stringify(this.persons));
        console.log("Saved new persons to localStorage:", this.persons);
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
      this.filteredPersons = _.orderBy(this.filteredPersons, ["PubDate"], ["desc"]);
      this.currentPage = 1;
    },
    sortByRating() {
      this.filteredPersons = _.orderBy(this.filteredPersons, ["Rating"], ["desc"]);
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
.person-list {
  padding: 20px;
}

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

.cards-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  gap: 20px;
}

.card {
  display: flex;
  background-color: #eaf6ff;
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  align-items: center;
}

.avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}

.info {
  flex-grow: 1;
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
}

.rating p {
  font-size: 1.2rem;
  color: #2c3e50;
  margin: 5px 0;
  font-weight: bold;
}

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
