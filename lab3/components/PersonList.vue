<template>
<div class="container">
    <!-- Header with dynamically set date and topic -->
    <div class="header">
    <div class="date">{{ currentDate }}</div>
    <h2 class="topic">{{ currentTopic }}</h2>
    </div>

    <!-- Filter buttons -->
    <div class="filter-controls">
    <button @click="filterByDate" class="filter-button">
        Sort by Date
    </button>
    <button @click="filterByRating" class="filter-button">
        Sort by Rating
    </button>
    </div>

    <!-- Card display section -->
    <div class="cards-wrapper">
    <div
        class="card"
        v-for="(person, index) in paginatedPersons"
        :key="person.id"
        :class="getCardClass(index)"
    >
        <div class="card-content">
        <div class="avatar">
            <img :src="getAvatarUrl(person.Avatar)" alt="avatar" />
        </div>
        <div class="info">
            <h4>{{ person.PersonName }}</h4>
            <div class="rating">
            <span v-for="n in Math.floor(person.Rating)" :key="n">★</span>
            <span v-for="n in (5 - Math.floor(person.Rating))" :key="n" class="empty-star">★</span>
            </div>
            <p>{{ person.Commentary }}</p>
            <div class="date-time">{{ formatDate(person.PubDate) }}</div>
        </div>
        <!-- Favorite and Like Buttons -->
        <div class="action-buttons">
            <button class="like-button">LIKE</button>
            <button class="favorite-button" @click="toggleFavorite(person)">
            {{ isFavorited(person) ? 'Remove Favorite' : 'Add to Favorites' }}
            </button>
        </div>
        </div>
    </div>
    </div>

    <!-- Pagination with arrows -->
    <div class="pagination">
    <button
        class="arrow-button"
        @click="prevPage"
        :disabled="currentPage === 1"
    >
        ←
    </button>
    <span>{{ currentPage }}/{{ totalPages }}</span>
    <button
        class="arrow-button"
        @click="nextPage"
        :disabled="currentPage === totalPages"
    >
        →
    </button>
    </div>
</div>
</template>

<script>
import _ from 'lodash';

export default {
data() {
    return {
    currentDate: '', // Dynamically calculated current date
    currentTopic: 'Adventure',
    currentPage: 1, // Track the current page
    itemsPerPage: 4, // We want to show 4 persons at a time
    persons: [
        {
        id: 1,
        PersonName: 'John Doe',
        Avatar: 'logo.png',
        PubDate: '2023-08-21',
        Rating: 4.5,
        Commentary: 'Great service and attention to detail.',
        Topic: 'Technology'
        },
        {
        id: 2,
        PersonName: 'Jane Smith',
        Avatar: 'logo.png',
        PubDate: '2022-12-10',
        Rating: 3.8,
        Commentary: 'Good experience overall.',
        Topic: 'Finance'
        },
        {
        id: 3,
        PersonName: 'Sam Green',
        Avatar: 'logo.png',
        PubDate: '2024-01-15',
        Rating: 4.9,
        Commentary: 'Absolutely amazing! Will recommend.',
        Topic: 'Health'
        },
        {
        id: 4,
        PersonName: 'Emily Clark',
        Avatar: 'logo.png',
        PubDate: '2023-06-14',
        Rating: 4.0,
        Commentary: 'Pretty good, I liked the support.',
        Topic: 'Education'
        },
        {
        id: 5,
        PersonName: 'Michael Jordan',
        Avatar: 'logo.png',
        PubDate: '2023-09-01',
        Rating: 4.2,
        Commentary: 'Solid performance, no complaints.',
        Topic: 'Sports'
        },
        {
        id: 6,
        PersonName: 'Anna Lee',
        Avatar: 'logo.png',
        PubDate: '2024-03-22',
        Rating: 4.7,
        Commentary: 'Amazing product! High quality.',
        Topic: 'Beauty'
        },
        {
        id: 7,
        PersonName: 'Chris Martin',
        Avatar: 'logo.png',
        PubDate: '2023-02-05',
        Rating: 3.5,
        Commentary: 'Could be better, but decent experience.',
        Topic: 'Music'
        },
        {
        id: 8,
        PersonName: 'Samantha Brown',
        Avatar: 'logo.png',
        PubDate: '2023-07-17',
        Rating: 4.6,
        Commentary: 'Fantastic customer service.',
        Topic: 'Hospitality'
        },
        {
        id: 9,
        PersonName: 'David Wilson',
        Avatar: 'logo.png',
        PubDate: '2023-04-08',
        Rating: 3.9,
        Commentary: 'A few hiccups, but overall satisfied.',
        Topic: 'Marketing'
        },
        {
        id: 10,
        PersonName: 'Jessica Adams',
        Avatar: 'logo.png',
        PubDate: '2022-11-23',
        Rating: 4.3,
        Commentary: 'Would definitely come back!',
        Topic: 'Travel'
        },
        {
        id: 11,
        PersonName: 'Mark Spencer',
        Avatar: 'logo.png',
        PubDate: '2023-09-17',
        Rating: 4.1,
        Commentary: 'Great food, slightly pricey.',
        Topic: 'Food'
        },
        {
        id: 12,
        PersonName: 'Olivia Thompson',
        Avatar: 'logo.png',
        PubDate: '2023-05-19',
        Rating: 4.4,
        Commentary: 'Loved the atmosphere!',
        Topic: 'Events'
        },
        {
        id: 13,
        PersonName: 'Ethan Johnson',
        Avatar: 'logo.png',
        PubDate: '2024-02-09',
        Rating: 4.8,
        Commentary: 'Everything went smoothly, would recommend.',
        Topic: 'Logistics'
        },
        {
        id: 14,
        PersonName: 'Chloe Davis',
        Avatar: 'logo.png',
        PubDate: '2023-10-25',
        Rating: 4.0,
        Commentary: 'Very reliable and punctual.',
        Topic: 'Transportation'
        },
        {
        id: 15,
        PersonName: 'Daniel Evans',
        Avatar: 'logo.png',
        PubDate: '2023-01-30',
        Rating: 3.7,
        Commentary: 'Good effort, but room for improvement.',
        Topic: 'Construction'
        },
        {
        id: 16,
        PersonName: 'Sophia White',
        Avatar: 'logo.png',
        PubDate: '2023-12-04',
        Rating: 4.9,
        Commentary: 'Absolutely stunning work!',
        Topic: 'Design'
        },
        {
        id: 17,
        PersonName: 'William Harris',
        Avatar: 'logo.png',
        PubDate: '2024-04-18',
        Rating: 4.1,
        Commentary: 'Impressed with the efficiency.',
        Topic: 'Management'
        },
        {
        id: 18,
        PersonName: 'Lily Walker',
        Avatar: 'logo.png',
        PubDate: '2023-03-27',
        Rating: 4.6,
        Commentary: 'Really enjoyed the workshop.',
        Topic: 'Workshops'
        },
        {
        id: 19,
        PersonName: 'Benjamin Scott',
        Avatar: 'logo.png',
        PubDate: '2023-07-12',
        Rating: 3.8,
        Commentary: 'Decent experience overall.',
        Topic: 'Retail'
        },
        {
        id: 20,
        PersonName: 'Isabella Young',
        Avatar: 'logo.png',
        PubDate: '2022-09-15',
        Rating: 4.7,
        Commentary: 'Very professional, highly recommend.',
        Topic: 'Consulting'
        }
    ],
    filteredPersons: [], // Holds the currently filtered data
    favorites: [] // Store favorite profiles
    };
},
computed: {
    totalPages() {
    return Math.ceil(this.filteredPersons.length / this.itemsPerPage);
    },
    paginatedPersons() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = this.currentPage * this.itemsPerPage;
    return this.filteredPersons.slice(start, end);
    }
},
mounted() {
    this.filteredPersons = this.persons; // Initialize filteredPersons with the full list
    this.setCurrentDate(); // Set the current date dynamically
    this.loadFavorites(); // Load favorites from localStorage (optional)
},
methods: {
    setCurrentDate() {
    const today = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    this.currentDate = today.toLocaleDateString('en-GB', options).replace(/\//g, '.'); // Convert to 'dd.MM.yyyy' format
    },
    nextPage() {
    if (this.currentPage < this.totalPages) {
        this.currentPage++;
    }
    },
    prevPage() {
    if (this.currentPage > 1) {
        this.currentPage--;
    }
    },
    formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString('en-GB', options);
    },
    filterByDate() {
    // Use lodash to sort by PubDate, most recent first
    this.filteredPersons = _.orderBy(this.persons, ['PubDate'], ['desc']);
    this.currentPage = 1; // Reset to page 1 after filtering
    },
    filterByRating() {
    // Use lodash to sort by Rating, highest rating first
    this.filteredPersons = _.orderBy(this.persons, ['Rating'], ['desc']);
    this.currentPage = 1; // Reset to page 1 after filtering
    },
    getAvatarUrl(avatar) {
    // Dynamically get the avatar from assets folder
    return require(`@/assets/${avatar}`);
    },
    toggleFavorite(person) {
    if (this.isFavorited(person)) {
        // Remove from favorites
        this.favorites = this.favorites.filter(fav => fav.id !== person.id);
    } else {
        // Add to favorites
        this.favorites.push(person);
    }
    // Optionally, save favorites to localStorage or Vuex
    this.saveFavorites();
    },
    isFavorited(person) {
    return this.favorites.some(fav => fav.id === person.id);
    },
    saveFavorites() {
    // Optionally save to localStorage (or Vuex)
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    loadFavorites() {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
        this.favorites = JSON.parse(savedFavorites);
    }
    },
    getCardClass(index) {
    return index % 2 === 0 ? 'left-card' : 'right-card';
    }
}
};
</script>

<style scoped>
.container {
padding: 20px;
min-height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
}

.header {
text-align: center;
margin-bottom: 20px;
}

.date {
font-size: 2.5rem;
font-weight: bold;
color: #4a90e2;
}

.topic {
font-size: 2rem;
font-weight: bold;
color: #ffffff;
background-color: #3498db;
padding: 10px 20px;
border-radius: 10px;
}

.filter-controls {
margin-bottom: 20px;
}

.filter-button {
background-color: #3498db;
color: white;
padding: 10px 20px;
border: none;
cursor: pointer;
font-size: 1.2rem;
border-radius: 10px;
margin-right: 10px;
}

.cards-wrapper {
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: 20px;
max-width: 80%;
}

.card {
background-color: rgba(255, 255, 255, 0.8);
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
border-radius: 10px;
padding: 20px;
display: flex;
flex-direction: row;
align-items: center;
}

.card-content {
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
width: 100%;
}

.avatar img {
border-radius: 50%;
width: 70px;
height: 70px;
}

.info {
flex-grow: 1;
margin-left: 20px;
text-align: center;
}

.info h4 {
margin: 0;
font-size: 1.5rem;
color: #333;
}

.rating {
color: #f39c12;
}

.empty-star {
color: #ccc;
}

.date-time {
font-size: 0.9rem;
color: #7f8c8d;
}

.action-buttons {
display: flex;
justify-content: space-between;
}

.like-button,
.favorite-button {
background-color: #2ecc71;
color: white;
border: none;
padding: 10px 20px;
border-radius: 10px;
cursor: pointer;
margin-left: 10px;
}

.favorite-button {
background-color: #f1c40f;
}

.pagination {
display: flex;
align-items: center;
justify-content: center;
font-size: 1.5rem;
margin-top: 20px;
}

.arrow-button {
background-color: transparent;
border: none;
font-size: 2rem;
color: #3498db;
cursor: pointer;
}

.arrow-button:disabled {
color: #bdc3c7;
cursor: not-allowed;
}
</style>
