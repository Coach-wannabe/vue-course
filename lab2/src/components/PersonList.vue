<template>
<div class="container">
    <div class="header">
    <div class="date">{{ currentDate }}</div>
    <h2 class="topic">{{ currentTopic }}</h2>
    </div>

    <div class="filter-controls">
    <button @click="filterByDate" class="filter-button">
        Sort by Date
    </button>
    <button @click="filterByRating" class="filter-button">
        Sort by Rating
    </button>
    </div>

    <div class="cards-wrapper">
    <div
        class="card"
        v-for="(person, index) in paginatedPersons"
        :key="person.id"
        :class="getCardClass(index)"
    >
        <div class="card-content">
        <div class="avatar">
            <img :src="person.Avatar" alt="avatar" />
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
        <button class="like-button">LIKE</button>
        </div>
    </div>
    </div>

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
    currentDate: '13.09.2024',
    currentTopic: 'Adventure',
    currentPage: 1, 
    itemsPerPage: 4, 
    persons: [
        { id: 1, PersonName: 'John Doe', Avatar: require('@/assets/logo.png'), PubDate: '2023-08-21', Rating: 4.5, Commentary: 'Great service and attention to detail.', Topic: 'Technology' },
        { id: 2, PersonName: 'Jane Smith', Avatar: require('@/assets/logo.png'), PubDate: '2022-12-10', Rating: 3.8, Commentary: 'Good experience overall.', Topic: 'Finance' },
        { id: 3, PersonName: 'Sam Green', Avatar: require('@/assets/logo.png'), PubDate: '2024-01-15', Rating: 4.9, Commentary: 'Absolutely amazing! Will recommend.', Topic: 'Health' },
        { id: 4, PersonName: 'Emily Clark', Avatar: require('@/assets/logo.png'), PubDate: '2023-06-14', Rating: 4.0, Commentary: 'Pretty good, I liked the support.', Topic: 'Education' },
        { id: 5, PersonName: 'Michael Jordan', Avatar: require('@/assets/logo.png'), PubDate: '2023-09-01', Rating: 4.2, Commentary: 'Solid performance, no complaints.', Topic: 'Sports' },
        { id: 6, PersonName: 'Anna Lee', Avatar: require('@/assets/logo.png'), PubDate: '2024-03-22', Rating: 4.7, Commentary: 'Amazing product! High quality.', Topic: 'Beauty' },
        { id: 7, PersonName: 'Chris Martin', Avatar: require('@/assets/logo.png'), PubDate: '2022-11-05', Rating: 3.5, Commentary: 'Could be better, but it was decent.', Topic: 'Entertainment' },
        { id: 8, PersonName: 'Samantha Brown', Avatar: require('@/assets/logo.png'), PubDate: '2023-04-17', Rating: 4.6, Commentary: 'Fantastic customer service.', Topic: 'Hospitality' },
        { id: 9, PersonName: 'David Wilson', Avatar: require('@/assets/logo.png'), PubDate: '2023-07-08', Rating: 3.9, Commentary: 'A few hiccups, but overall satisfied.', Topic: 'Construction' },
        { id: 10, PersonName: 'Jessica Adams', Avatar: require('@/assets/logo.png'), PubDate: '2023-02-23', Rating: 4.3, Commentary: 'Would definitely come back!', Topic: 'Travel' },
        { id: 11, PersonName: 'Oliver White', Avatar: require('@/assets/logo.png'), PubDate: '2024-05-06', Rating: 4.8, Commentary: 'Highly recommend, exceeded expectations.', Topic: 'Automotive' },
        { id: 12, PersonName: 'Sophia Hernandez', Avatar: require('@/assets/logo.png'), PubDate: '2023-12-12', Rating: 4.4, Commentary: 'Good value for the money.', Topic: 'Fashion' },
        { id: 13, PersonName: 'Lucas Moore', Avatar: require('@/assets/logo.png'), PubDate: '2022-10-20', Rating: 3.7, Commentary: 'It was okay, but I expected more.', Topic: 'Real Estate' },
        { id: 14, PersonName: 'Ava Thompson', Avatar: require('@/assets/logo.png'), PubDate: '2023-11-30', Rating: 4.5, Commentary: 'Great environment and professional.', Topic: 'Healthcare' },
        { id: 15, PersonName: 'Mason Scott', Avatar: require('@/assets/logo.png'), PubDate: '2024-04-01', Rating: 4.9, Commentary: 'Top-notch! Would use again.', Topic: 'Consulting' },
        { id: 16, PersonName: 'Mia Harris', Avatar: require('@/assets/logo.png'), PubDate: '2023-03-15', Rating: 4.0, Commentary: 'Satisfied with the overall experience.', Topic: 'Retail' },
        { id: 17, PersonName: 'James Walker', Avatar: require('@/assets/logo.png'), PubDate: '2023-05-09', Rating: 4.6, Commentary: 'Excellent work, very impressed.', Topic: 'Marketing' },
        { id: 18, PersonName: 'Lily Young', Avatar: require('@/assets/logo.png'), PubDate: '2022-09-18', Rating: 3.4, Commentary: 'Service was okay, could be improved.', Topic: 'Hospitality' },
        { id: 19, PersonName: 'Henry Lewis', Avatar: require('@/assets/logo.png'), PubDate: '2023-10-25', Rating: 4.7, Commentary: 'Very happy with the service.', Topic: 'Technology' },
        { id: 20, PersonName: 'Ella Martinez', Avatar: require('@/assets/logo.png'), PubDate: '2024-02-14', Rating: 4.9, Commentary: 'Outstanding, best in the market.', Topic: 'Beauty' }
    ],
    filteredPersons: []
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
    this.filteredPersons = this.persons; 
    this.setCurrentDate(); 
},

methods: {
    setCurrentDate() {
    const today = new Date();
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    this.currentDate = today.toLocaleDateString('en-GB', options).replace(/\//g, '.');
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
    this.filteredPersons = _.orderBy(this.persons, ['PubDate'], ['desc']);
    this.currentPage = 1; 
    },
    
    filterByRating() {
    this.filteredPersons = _.orderBy(this.persons, ['Rating'], ['desc']);
    this.currentPage = 1; 
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

.like-button {
    background-color: #2ecc71;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
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
    