<template>
    <nav class="nav">
      <div v-if="isChatPage" class="back-arrow">
        <nuxt-link :to="`/person/${chatUserId}`">← Back</nuxt-link>
      </div>
  
      <div v-else>
        <nuxt-link
          to="/"
          class="nav-link"
          :class="{ active: $route.path === '/' }"
        >Home</nuxt-link>
        <nuxt-link
          to="/profile"
          class="nav-link"
          :class="{ active: $route.path === '/profile' }"
        >Profile</nuxt-link>
        <nuxt-link
          to="/friends"
          class="nav-link"
          :class="{ active: $route.path === '/friends' }"
        >Friends</nuxt-link>
        <nuxt-link
          to="/favorites"
          class="nav-link"
          :class="{ active: $route.path === '/favorites' }"
        >Favorites</nuxt-link>
        <nuxt-link
          to="/statistics"
          class="nav-link"
          :class="{ active: $route.path === '/statistics' }"
        >Statistics</nuxt-link>
        <nuxt-link
          to="/login"
          class="nav-link"
          :class="{ active: $route.path === '/login' }"
        >Login</nuxt-link>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
    computed: {
      isChatPage() {
        return this.$route.path.startsWith("/chat/");
      },
      chatUserId() {
        return this.$route.params.id || "";
      },
    },
  };
  </script>
  
  <style scoped>
  .nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    background-color: #3498db;
    color: white;
  }
  
  .nav-link {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    margin: 0 10px;
    padding: 5px 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .nav-link:hover {
    background-color: #2980b9;
  }
  
  .nav-link.active {
    background-color: #1e6f99;
  }
  
  .back-arrow a {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
  }
  </style>
  