<template>
    <div class="register-page">
      <h1>Register</h1>
      <form @submit.prevent="registerUser">
        <div>
          <label for="username">Username:</label>
          <input v-model="username" type="text" id="username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <nuxt-link to="/login">Already have an account? Login here</nuxt-link>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorMessage: '',
        successMessage: ''
      };
    },
    methods: {
      registerUser() {
        // Simulate registering the user (save to localStorage)
        const user = {
          username: this.username,
          password: this.password
        };
  
        if (this.username && this.password) {
          localStorage.setItem('user', JSON.stringify(user));
  
          // Success: Redirect to login page after a brief delay
          this.successMessage = 'Registration successful! Redirecting to login...';
          this.errorMessage = '';
          
          setTimeout(() => {
            this.$router.push('/login');
          }, 2000); // Redirect after 2 seconds
        } else {
          this.errorMessage = 'Please enter both a username and password.';
          this.successMessage = '';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .register-page {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .success {
    color: green;
    margin-top: 10px;
  }
  
  .error {
    color: red;
    margin-top: 10px;
  }
  </style>
  