<template>
  <div class="register-page">
    <div class="register-card">
      <h1>Register</h1>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="username" class="form-label">Username:</label>
          <input
            v-model="username"
            type="text"
            id="username"
            class="form-input"
            required
          />
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
        </div>

        <div class="form-group">
          <label for="confirm-password" class="form-label">Confirm Password:</label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirm-password"
            class="form-input"
            required
          />
        </div>

        <button type="submit" class="register-btn">Register</button>
      </form>

      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <p class="login-link">
        <nuxt-link to="/login">Already have an account? Login here</nuxt-link>
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
      confirmPassword: "",
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    registerUser() {
      if (!this.username || !this.password || !this.confirmPassword) {
        this.errorMessage = "Please fill in all fields.";
        this.successMessage = "";
        return;
      }

      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match.";
        this.successMessage = "";
        return;
      }

      const user = {
        username: this.username,
        password: this.password,
      };

      localStorage.setItem("user", JSON.stringify(user));

      this.successMessage = "Registration successful! Redirecting to login...";
      this.errorMessage = "";
      setTimeout(() => {
        this.$router.push("/login");
      }, 2000); 
    },
  },
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
}

.register-card {
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

.success-message {
  color: green;
  background-color: #eaf6e9;
  border: 1px solid green;
  padding: 10px;
  border-radius: 5px;
  margin-top: 15px;
}

.error-message {
  color: red;
  background-color: #fdecea;
  border: 1px solid red;
  padding: 10px;
  border-radius: 5px;
  margin-top: 15px;
}

.register-btn {
  display: inline-block;
  background-color: #2ecc71;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.register-btn:hover {
  background-color: #27ae60;
}


.login-link {
  margin-top: 20px;
  font-size: 0.95rem;
  color: #2c3e50;
}

.login-link a {
  color: #3498db;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
