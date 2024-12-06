<template>
  <div class="login-page">
    <div class="login-card">
      <h1>Login</h1>
      <form @submit.prevent="loginUser">
        <div class="form-group">
          <label for="username" class="form-label">Username:</label>
          <input
            v-model="username"
            type="text"
            id="username"
            class="form-input"
            required
          />
          <p v-if="usernameError" class="error-message">{{ usernameError }}</p>
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Password:</label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="form-input"
            required
          />
          <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
        </div>

        <button type="submit" class="login-btn">Login</button>
      </form>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <p class="register-link">
        <nuxt-link to="/register">Don't have an account? Register here</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    loginUser() {
      const user = JSON.parse(localStorage.getItem("user"));

      if (user && user.username === this.username && user.password === this.password) {
        localStorage.setItem("loggedIn", true);
        this.$router.push("/profile");
      } else {
        this.errorMessage = "Invalid username or password.";
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.form-label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #2c3e50;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.form-input:focus {
  border-color: #3498db;
  outline: none;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}

.login-btn {
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.login-btn:hover {
  background-color: #2980b9;
}

.register-link {
  margin-top: 20px;
  font-size: 0.95rem;
  color: #2c3e50;
}

.register-link a {
  color: #3498db;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
