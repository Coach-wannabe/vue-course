<template>
  <div class="statistics-page">
    <h1>Statistics</h1>

    <div class="statistics-card">
      <div class="date-range">
        <label for="start-date">Start Date:</label>
        <input id="start-date" type="date" v-model="startDate" class="date-input" />
        <label for="end-date">End Date:</label>
        <input id="end-date" type="date" v-model="endDate" class="date-input" />
        <button @click="getStatistics" class="get-statistics-btn">Get Statistics</button>
      </div>

      <div v-if="statistics" class="statistics-grid">
        <div class="stat-item">
          <p class="stat-title">Total Posts</p>
          <p class="stat-value">{{ statistics.totalPosts }}</p>
        </div>
        <div class="stat-item">
          <p class="stat-title">Liked Posts</p>
          <p class="stat-value">{{ statistics.likedPosts }}</p>
        </div>
        <div class="stat-item">
          <p class="stat-title">Average Rating</p>
          <p class="stat-value">{{ statistics.averageRating }}</p>
        </div>
        <div class="stat-item">
          <h3>Posts by Topic</h3>
          <ul>
            <li v-for="(count, topic) in statistics.postsByTopic" :key="topic">
              {{ topic }}: {{ count }}
            </li>
          </ul>
        </div>
      </div>

      <div v-else class="empty-state">
        <p>No data available for the selected date range.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startDate: "", 
      endDate: "", 
      statistics: null, 
    };
  },
  methods: {
    getStatistics() {
      if (!this.startDate || !this.endDate) {
        alert("Please select both start and end dates.");
        return;
      }

      const posts = JSON.parse(localStorage.getItem("persons")) || [];

      const filteredPosts = posts.filter((post) => {
        const postDate = new Date(post.PubDate);
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        return postDate >= start && postDate <= end;
      });

      this.statistics = this.calculateStatistics(filteredPosts);
    },
    calculateStatistics(posts) {
      if (posts.length === 0) {
        return null; 
      }

      const totalPosts = posts.length;
      const likedPosts = posts.filter((post) => post.isLiked).length;
      const averageRating =
        posts.reduce((sum, post) => sum + post.Rating, 0) / totalPosts;

      const postsByTopic = posts.reduce((acc, post) => {
        acc[post.Topic] = (acc[post.Topic] || 0) + 1;
        return acc;
      }, {});

      return {
        totalPosts,
        likedPosts,
        averageRating: averageRating.toFixed(2),
        postsByTopic,
      };
    },
  },
};
</script>

<style scoped>
.statistics-page {
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  min-height: 100vh;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

.statistics-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.date-range {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.date-input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.get-statistics-btn {
  padding: 10px 15px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.get-statistics-btn:hover {
  background-color: #2980b9;
}

.statistics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  text-align: center;
  margin-top: 20px;
}

.stat-item {
  background-color: #eaf6ff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.stat-title {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 10px;
  font-weight: bold;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3498db;
}

.stat-item ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.stat-item ul li {
  margin: 5px 0;
  color: #2c3e50;
}

.empty-state {
  text-align: center;
  margin-top: 30px;
  color: #7f8c8d;
  font-size: 1.2rem;
}
</style>
