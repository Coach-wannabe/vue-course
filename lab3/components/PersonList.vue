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
  
      <!-- Person Cards -->
      <div class="cards-wrapper">
        <div
          class="card"
          v-for="person in filteredPersons"
          :key="person.id"
        >
          <div class="info">
            <!-- Clicking on the name takes you to the person's profile -->
            <h4>
              <nuxt-link :to="`/person/${person.id}`">{{ person.PersonName }}</nuxt-link>
            </h4>
            <p>{{ person.Commentary }}</p>
            <p>Topic: {{ person.Topic }}</p>
            <p>Date: {{ person.PubDate }}</p>
            <p>Rating: {{ person.Rating.toFixed(1) }}</p>
  
            <!-- Like/Unlike Button -->
            <button @click="toggleLike(person)">
              {{ person.isLiked ? 'Unlike' : 'Like' }}
            </button>
          </div>
        </div>
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
                Password: 'password123'
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
                Password: 'password123'
            },
            {
                id: 3,
                PersonName: 'Sam Green',
                Avatar: 'logo.png',
                PubDate: '2024-01-15',
                Rating: 4.9,
                Commentary: 'Absolutely amazing! Will recommend.',
                Topic: 'Health',
                Email: 'samgreen@example.com',
                Password: 'password123'
            },
            {
                id: 4,
                PersonName: 'Emily Clark',
                Avatar: 'logo.png',
                PubDate: '2023-06-14',
                Rating: 4.0,
                Commentary: 'Pretty good, I liked the support.',
                Topic: 'Education',
                Email: 'emilyclark@example.com',
                Password: 'password123'
            },
            {
                id: 5,
                PersonName: 'Michael Jordan',
                Avatar: 'logo.png',
                PubDate: '2023-09-01',
                Rating: 4.2,
                Commentary: 'Solid performance, no complaints.',
                Topic: 'Sports',
                Email: 'michaeljordan@example.com',
                Password: 'password123'
            },
            {
                id: 6,
                PersonName: 'Anna Lee',
                Avatar: 'logo.png',
                PubDate: '2024-03-22',
                Rating: 4.7,
                Commentary: 'Amazing product! High quality.',
                Topic: 'Beauty',
                Email: 'annalee@example.com',
                Password: 'password123'
            },
            {
                id: 7,
                PersonName: 'Chris Martin',
                Avatar: 'logo.png',
                PubDate: '2023-02-05',
                Rating: 3.5,
                Commentary: 'Could be better, but decent experience.',
                Topic: 'Music',
                Email: 'chrismartin@example.com',
                Password: 'password123'
            },
            {
                id: 8,
                PersonName: 'Samantha Brown',
                Avatar: 'logo.png',
                PubDate: '2023-07-17',
                Rating: 4.6,
                Commentary: 'Fantastic customer service.',
                Topic: 'Hospitality',
                Email: 'samanthabrown@example.com',
                Password: 'password123'
            },
            {
                id: 9,
                PersonName: 'David Wilson',
                Avatar: 'logo.png',
                PubDate: '2023-04-08',
                Rating: 3.9,
                Commentary: 'A few hiccups, but overall satisfied.',
                Topic: 'Marketing',
                Email: 'davidwilson@example.com',
                Password: 'password123'
            },
            {
                id: 10,
                PersonName: 'Jessica Adams',
                Avatar: 'logo.png',
                PubDate: '2022-11-23',
                Rating: 4.3,
                Commentary: 'Would definitely come back!',
                Topic: 'Travel',
                Email: 'jessicaadams@example.com',
                Password: 'password123'
            },
            {
                id: 11,
                PersonName: 'Mark Spencer',
                Avatar: 'logo.png',
                PubDate: '2023-09-17',
                Rating: 4.1,
                Commentary: 'Great food, slightly pricey.',
                Topic: 'Food',
                Email: 'markspencer@example.com',
                Password: 'password123'
            },
            {
                id: 12,
                PersonName: 'Olivia Thompson',
                Avatar: 'logo.png',
                PubDate: '2023-05-19',
                Rating: 4.4,
                Commentary: 'Loved the atmosphere!',
                Topic: 'Events',
                Email: 'oliviathompson@example.com',
                Password: 'password123'
            },
            {
                id: 13,
                PersonName: 'Ethan Johnson',
                Avatar: 'logo.png',
                PubDate: '2024-02-09',
                Rating: 4.8,
                Commentary: 'Everything went smoothly, would recommend.',
                Topic: 'Logistics',
                Email: 'ethanjohnson@example.com',
                Password: 'password123'
            },
            {
                id: 14,
                PersonName: 'Chloe Davis',
                Avatar: 'logo.png',
                PubDate: '2023-10-25',
                Rating: 4.0,
                Commentary: 'Very reliable and punctual.',
                Topic: 'Transportation',
                Email: 'chloedavis@example.com',
                Password: 'password123'
            },
            {
                id: 15,
                PersonName: 'Daniel Evans',
                Avatar: 'logo.png',
                PubDate: '2023-01-30',
                Rating: 3.7,
                Commentary: 'Good effort, but room for improvement.',
                Topic: 'Construction',
                Email: 'danielevans@example.com',
                Password: 'password123'
            },
            {
                id: 16,
                PersonName: 'Sophia White',
                Avatar: 'logo.png',
                PubDate: '2023-12-04',
                Rating: 4.9,
                Commentary: 'Absolutely stunning work!',
                Topic: 'Design',
                Email: 'sophiawhite@example.com',
                Password: 'password123'
            },
            {
                id: 17,
                PersonName: 'William Harris',
                Avatar: 'logo.png',
                PubDate: '2024-04-18',
                Rating: 4.1,
                Commentary: 'Impressed with the efficiency.',
                Topic: 'Management',
                Email: 'williamharris@example.com',
                Password: 'password123'
            },
            {
                id: 18,
                PersonName: 'Lily Walker',
                Avatar: 'logo.png',
                PubDate: '2023-03-27',
                Rating: 4.6,
                Commentary: 'Really enjoyed the workshop.',
                Topic: 'Workshops',
                Email: 'lilywalker@example.com',
                Password: 'password123'
            },
            {
                id: 19,
                PersonName: 'Benjamin Scott',
                Avatar: 'logo.png',
                PubDate: '2023-07-12',
                Rating: 3.8,
                Commentary: 'Decent experience overall.',
                Topic: 'Retail',
                Email: 'benjaminscott@example.com',
                Password: 'password123'
            },
            {
                id: 20,
                PersonName: 'Isabella Young',
                Avatar: 'logo.png',
                PubDate: '2022-09-15',
                Rating: 4.7,
                Commentary: 'Very professional, highly recommend.',
                Topic: 'Consulting',
                Email: 'isabellayoung@example.com',
                Password: 'password123'
            }
        ],
        selectedTopic: '', // Store the currently selected topic
        filteredPersons: [] // Holds the filtered list of persons
      };
    },
    computed: {
      uniqueTopics() {
        // Get unique topics from the list of persons
        return [...new Set(this.persons.map(person => person.Topic))];
      }
    },
    mounted() {
      // Save the persons array in localStorage if it's not already there
      if (!localStorage.getItem('persons')) {
        localStorage.setItem('persons', JSON.stringify(this.persons));
      }
  
      // Initialize with all persons
      this.filteredPersons = this.persons;
    },
    methods: {
      filterByTopic() {
        // Filter the persons based on the selected topic
        if (this.selectedTopic) {
          this.filteredPersons = this.persons.filter(
            person => person.Topic === this.selectedTopic
          );
        } else {
          // Show all persons if no topic is selected
          this.filteredPersons = this.persons;
        }
      },
      sortByDateTime() {
        // Use Lodash to sort the list of persons by PubDate (DateTime)
        this.filteredPersons = _.orderBy(this.filteredPersons, ['PubDate'], ['desc']); // Sorts by date in descending order (most recent first)
      },
      sortByRating() {
        // Use Lodash to sort the list of persons by Rating
        this.filteredPersons = _.orderBy(this.filteredPersons, ['Rating'], ['desc']); // Sorts by rating in descending order (highest first)
      },
      toggleLike(person) {
        // If the person is already liked, unlike them and decrease the rating by 0.1
        if (person.isLiked) {
            person.Rating = Math.max(0, person.Rating - 0.1); // Ensure rating doesn't go below 0
            person.isLiked = false;
        } else {
            // Otherwise, like them and increase the rating by 0.1
            person.Rating += 0.1;
            person.isLiked = true;
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

.filter-buttons {
  margin-bottom: 20px;
}

.filter-buttons button {
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
}

.filter-buttons button:hover {
  background-color: #2980b9;
}

.cards-wrapper {
  display: flex;
  flex-direction: column;
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

button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
  