<template>
  <div class="profile-page">
    <h1>Your Profile</h1>
    <div v-if="user" class="profile-card">
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="name" class="form-label">Name:</label>
          <input
            v-model="user.name"
            type="text"
            id="name"
            class="form-input"
            :disabled="!isEditing"
          />
        </div>

        <div class="form-group">
          <label for="username" class="form-label">Username:</label>
          <input
            v-model="user.username"
            type="text"
            id="username"
            class="form-input"
            :disabled="!isEditing"
          />
        </div>

        <div class="form-group">
          <label for="address" class="form-label">Address:</label>
          <input
            v-model="user.address"
            type="text"
            id="address"
            class="form-input"
            :disabled="!isEditing"
          />
        </div>

        <div class="form-group">
          <label for="rating" class="form-label">Rating:</label>
          <input
            :value="user.rating.toFixed(1)"
            type="text"
            id="rating"
            class="form-input non-editable"
            disabled
          />
        </div>

        <div class="form-buttons">
          <button
            v-if="!isEditing"
            type="button"
            @click="enableEdit"
            class="edit-btn"
          >
            Edit Profile
          </button>
          <button
            v-if="isEditing"
            type="submit"
            class="save-btn"
          >
            Save
          </button>
          <button
            v-if="isEditing"
            type="button"
            @click="cancelEdit"
            class="cancel-btn"
          >
            Cancel
          </button>
        </div>
      </form>

      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

      <button @click="logout" class="logout-btn">Logout</button>
    </div>

    <div v-else class="empty-state">
      <p>You are not logged in. <nuxt-link to="/login">Login here</nuxt-link>.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      isEditing: false,
      successMessage: '',
      originalUserData: {}, 
    };
  },
  mounted() {
    const isLoggedIn = localStorage.getItem('loggedIn');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!isLoggedIn || !user) {
      this.$router.push('/login');
    } else {
      if (!user.name) user.name = '';
      if (!user.address) user.address = '';
      if (!user.rating) user.rating = 4.5;
      this.user = user;
      this.originalUserData = { ...user };
    }
  },
  methods: {
    enableEdit() {
      this.isEditing = true;
    },
    cancelEdit() {
      this.isEditing = false;
      this.user = { ...this.originalUserData };
      this.successMessage = '';
    },
    updateProfile() {
      localStorage.setItem('user', JSON.stringify(this.user));
      this.originalUserData = { ...this.user };
      this.isEditing = false;
      this.successMessage = 'Profile updated successfully!';
    },
    logout() {
      localStorage.removeItem('loggedIn');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.profile-page {
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

.profile-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
  padding: 20px 30px; /* Adjusted padding for spacing */
  text-align: left;
}

.form-group {
  margin-bottom: 20px;
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
  color: #2c3e50;
  box-sizing: border-box; /* Ensures padding doesn't overflow */
}

.form-input:focus {
  border-color: #3498db;
  outline: none;
}

.non-editable {
  background-color: #e0e0e0;
  color: #555;
}

.form-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.edit-btn {
  background-color: #3498db;
  color: white;
}

.edit-btn:hover {
  background-color: #2980b9;
}

.save-btn {
  background-color: #2ecc71;
  color: white;
}

.save-btn:hover {
  background-color: #27ae60;
}

.cancel-btn {
  background-color: #e74c3c;
  color: white;
}

.cancel-btn:hover {
  background-color: #c0392b;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  margin-top: 20px;
}

.logout-btn:hover {
  background-color: #c0392b;
}

.success-message {
  color: green;
  font-weight: bold;
  text-align: center;
  margin-top: 10px;
}

.empty-state {
  margin-top: 50px;
  font-size: 1.2rem;
  color: #7f8c8d;
}

.empty-state a {
  color: #3498db;
  text-decoration: underline;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .profile-card {
    padding: 15px 20px;
  }

  h1 {
    font-size: 2rem;
  }

  button {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .profile-card {
    padding: 10px 15px;
  }

  .form-input {
    font-size: 0.9rem;
  }

  button {
    font-size: 0.8rem;
  }
}
</style>
