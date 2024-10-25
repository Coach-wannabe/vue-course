<template>
    <div class="person-profile" v-if="person">
      <h1>{{ person.PersonName }}</h1>
      <img :src="getAvatarUrl(person.Avatar)" alt="Avatar" />
      <p>Email: {{ person.Email }}</p>
      <p>Rating: {{ person.Rating }}</p>
      <p>{{ person.Commentary }}</p>
    </div>
  
    <div v-else>
      <p>Person not found. <nuxt-link to="/">Go back to the list</nuxt-link></p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        person: null
      };
    },
    mounted() {
      // Get the person's ID from the route parameters
      const id = this.$route.params.id;
  
      // Retrieve persons array from localStorage
      const persons = JSON.parse(localStorage.getItem('persons'));
  
      // Check if persons data exists in localStorage
      if (persons && persons.length > 0) {
        // Find the person with the matching ID
        this.person = persons.find(p => p.id == id);
      } else {
        // Handle case where persons data is not found (redirect or show error)
        console.error('Persons data not found in localStorage.');
      }
    },
    methods: {
      getAvatarUrl(avatar) {
        return require(`@/assets/${avatar}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .person-profile {
    padding: 20px;
    text-align: center;
  }
  
  img {
    width: 150px;
    border-radius: 50%;
  }
  </style>
  