<template>
  <div class="login-page">
    <h1>Login</h1>
    <form @submit.prevent="loginUser">
      <div>
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <nuxt-link to="/register">Don't have an account? Register here</nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    loginUser() {
      // Check for user in localStorage
      const user = JSON.parse(localStorage.getItem('user'));

      // Ensure that user exists and credentials match
      if (user && user.username === this.username && user.password === this.password) {
        // Store a "logged in" state (you could store a token instead)
        localStorage.setItem('loggedIn', true);

        // Redirect to the profile page
        this.$router.push('/profile');
      } else {
        // Display an error message if login fails
        this.errorMessage = 'Invalid username or password.';
      }
    }
  }
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
