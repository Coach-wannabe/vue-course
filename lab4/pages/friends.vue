<template>
  <div class="friends-page">
    <h1>My Friends</h1>

    <div v-if="friends.length > 0" class="friends-grid">
      <div v-for="friend in friends" :key="friend.id" class="friend-card">
        <nuxt-link
          :to="friend.id ? `/person/${friend.id}` : '/'"
          class="avatar-link"
        >
          <img :src="getAvatarUrl(friend.Avatar)" alt="Avatar" class="avatar" />
        </nuxt-link>

        <nuxt-link
          :to="friend.id ? `/person/${friend.id}` : '/'"
          class="friend-name-link"
        >
          <p class="friend-name">{{ friend.PersonName || "Unnamed User" }}</p>
        </nuxt-link>

        <button @click="unsubscribe(friend.id)" class="unsubscribe-btn">
          Unsubscribe
        </button>
      </div>
    </div>

    <div v-else class="empty-state">
      <p>You have no friends yet.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      friends: [], 
    };
  },
  mounted() {
    const storedFriends = JSON.parse(localStorage.getItem("friends")) || [];
    this.friends = storedFriends.map((friend) => ({
      ...friend,
      Avatar: friend.Avatar || "logo.png", 
      PersonName: friend.PersonName || "Unnamed User", 
    }));
  },
  methods: {
    unsubscribe(friendId) {
      this.friends = this.friends.filter((friend) => friend.id !== friendId);

      localStorage.setItem("friends", JSON.stringify(this.friends));

      alert("You have unsubscribed from this friend.");
    },
    getAvatarUrl(avatar) {
      try {
        return require(`@/assets/${avatar || "logo.png"}`);
      } catch (error) {
        console.error("Avatar not found, using default:", error);
        return require("@/assets/logo.png");
      }
    },
  },
};
</script>

<style scoped>
.friends-page {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); 
  gap: 20px;
  justify-items: center;
}

.friend-card {
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 200px;
}

.avatar-link {
  display: inline-block;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
  transition: transform 0.2s ease;
}

.avatar-link:hover .avatar {
  transform: scale(1.1); 
}

.friend-name-link {
  text-decoration: none;
  color: #2c3e50;
  font-size: 1.2rem;
  font-weight: bold;
  transition: color 0.3s ease;
}

.friend-name-link:hover {
  color: #3498db;
}

.unsubscribe-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.unsubscribe-btn:hover {
  background-color: #c0392b;
}

.empty-state {
  margin-top: 50px;
  font-size: 1.2rem;
  color: #7f8c8d;
}
</style>
