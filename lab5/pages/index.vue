<template>
  <div class="container">
    <header>
      <h1>Welcome to the Blogs</h1>
    </header>

    <section class="person-list">
      <PersonList />
    </section>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import PersonList from '@/components/PersonList.vue';

export default {
  components: {
    NavBar,
    PersonList
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

header h1 {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

.nav {
  margin-bottom: 30px;
}

.nav-link {
  margin: 0 15px;
  text-decoration: none;
  color: #3498db;
  font-size: 1.2rem;
}

.nav-link:hover {
  color: #2980b9;
  text-decoration: underline;
}

.person-list {
  margin-top: 40px;
}
</style>
