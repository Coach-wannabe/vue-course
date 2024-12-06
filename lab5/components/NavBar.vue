<template>
  <div class="navbar">
    <!-- Logo -->
    <div class="logo">
      <nuxt-link to="/">MySite</nuxt-link>
    </div>

    <!-- Hamburger Menu Icon (for small screens) -->
    <div class="hamburger" @click="toggleSidebar">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <!-- Links for Large Screens -->
    <nav class="nav-links">
      <nuxt-link to="/" exact-active-class="active">Home</nuxt-link>
      <nuxt-link to="/profile" exact-active-class="active">Profile</nuxt-link>
      <nuxt-link to="/friends" exact-active-class="active">Friends</nuxt-link>
      <nuxt-link to="/favorites" exact-active-class="active">Favorites</nuxt-link>
      <nuxt-link to="/statistics" exact-active-class="active">Statistics</nuxt-link>
      <nuxt-link to="/login" exact-active-class="active">Login</nuxt-link>
    </nav>

    <!-- Sidebar (for small screens) -->
    <div class="sidebar" :class="{ open: isSidebarOpen }">
      <!-- Close Button -->
      <button class="close-btn" @click="closeSidebar">X</button>
      <div class="sidebar-links">
        <nuxt-link to="/" @click="closeSidebar">Home</nuxt-link>
        <nuxt-link to="/profile" @click="closeSidebar">Profile</nuxt-link>
        <nuxt-link to="/friends" @click="closeSidebar">Friends</nuxt-link>
        <nuxt-link to="/favorites" @click="closeSidebar">Favorites</nuxt-link>
        <nuxt-link to="/statistics" @click="closeSidebar">Statistics</nuxt-link>
        <nuxt-link to="/login" @click="closeSidebar">Login</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarOpen: false, // Tracks whether the sidebar is open
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
    },
    handleResize() {
      // Automatically close sidebar if transitioning to fullscreen
      if (window.innerWidth > 768) {
        this.isSidebarOpen = false;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
/* Navbar Styling */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #3498db;
  color: white;
}

/* Logo */
.logo a {
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
  font-weight: bold;
}

/* Nav Links (Large Screens) */
.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;
  padding: 10px 15px;
  border-radius: 5px;
}

.nav-links a:hover,
.nav-links .active {
  background-color: #b3e5fc;
  color: #2c3e50;
}

/* Hamburger Menu (Small Screens) */
.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;
}

.hamburger span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: white;
  border-radius: 2px;
}

/* Sidebar (Small Screens) */
.sidebar {
  position: fixed;
  top: 0;
  right: -100%;
  height: 100%;
  width: 250px;
  background-color: #3498db;
  color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: center; /* Center sidebar content */
}

.sidebar.open {
  right: 0;
}

/* Close Button in Sidebar */
.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  align-self: flex-end;
  cursor: pointer;
  margin-bottom: 20px;
}

.close-btn:hover {
  color: #e74c3c;
}

/* Sidebar Links */
.sidebar-links {
  display: flex;
  flex-direction: column; /* Ensure links are in a single column */
  width: 100%; /* Full width for better touch interaction */
  gap: 10px; /* Space between links */
  margin-top: 20px;
}

.sidebar-links a {
  text-decoration: none;
  color: white;
  font-size: 1.2rem;
  text-align: center;
  padding: 10px 0; /* Top and bottom padding for touch interaction */
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.sidebar-links a:hover {
  background-color: #b3e5fc;
  color: #2c3e50;
}

/* Responsive Styling */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .hamburger {
    display: flex;
  }
}

@media (max-width: 576px) {
  .sidebar-links a {
    font-size: 1rem;
  }
}
</style>
