<template>
    <div class="profile-page">
      <h1>Your Profile</h1>
      <div v-if="user">
        <!-- Profile Form -->
        <form @submit.prevent="updateProfile">
          <!-- Name Field -->
          <div>
            <label for="name">Name:</label>
            <input v-model="user.name" type="text" id="name" :disabled="!isEditing" />
          </div>
  
          <!-- Username Field -->
          <div>
            <label for="username">Username:</label>
            <input v-model="user.username" type="text" id="username" :disabled="!isEditing" />
          </div>
  
          <!-- Address Field -->
          <div>
            <label for="address">Address:</label>
            <input v-model="user.address" type="text" id="address" :disabled="!isEditing" />
          </div>
  
          <!-- Rating Display (Non-editable) -->
          <div>
            <label for="rating">Rating:</label>
            <input :value="user.rating" type="text" id="rating" disabled />
          </div>
  
          <!-- Show Save button if editing, otherwise show Edit Profile button -->
          <div>
            <button type="button" v-if="!isEditing" @click="enableEdit">Edit Profile</button>
            <button v-if="isEditing" type="submit">Save</button>
            <button v-if="isEditing" type="button" @click="cancelEdit">Cancel</button>
          </div>
        </form>
  
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
  
        <!-- Logout Button -->
        <button @click="logout">Logout</button>
      </div>
  
      <div v-else>
        <p>You are not logged in. <nuxt-link to="/login">Login here</nuxt-link>.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: null,
        isEditing: false, // Controls edit mode
        successMessage: '',
        originalUserData: {} // Store original data for canceling edits
      };
    },
    mounted() {
      // Check if the user is logged in
      const isLoggedIn = localStorage.getItem('loggedIn');
      const user = JSON.parse(localStorage.getItem('user'));
  
      if (!isLoggedIn || !user) {
        this.$router.push('/login');
      } else {
        // Add default values if not present
        if (!user.name) user.name = '';
        if (!user.address) user.address = '';
        if (!user.rating) user.rating = 4.5; // Default rating
        this.user = user;
        this.originalUserData = { ...user }; // Store original data for canceling edits
      }
    },
    methods: {
      enableEdit() {
        this.isEditing = true; // Enable edit mode
      },
      cancelEdit() {
        this.isEditing = false; // Disable edit mode
        // Restore the original data if edit is canceled
        this.user = { ...this.originalUserData };
        this.successMessage = '';
      },
      updateProfile() {
        // Save changes to localStorage
        localStorage.setItem('user', JSON.stringify(this.user));
  
        // Update the original data with new values
        this.originalUserData = { ...this.user };
  
        // Disable edit mode after saving
        this.isEditing = false;
  
        // Show success message
        this.successMessage = 'Profile updated successfully!';
      },
      logout() {
        // Clear logged-in state and redirect to login
        localStorage.removeItem('loggedIn');
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  .profile-page {
    padding: 20px;
    text-align: center;
  }
  
  form {
    margin-bottom: 20px;
  }
  
  form div {
    margin-bottom: 15px;
  }
  
  input {
    padding: 8px;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    display: block;
  }
  
  input[disabled] {
    background-color: #e0e0e0;
    color: #555;
  }
  
  button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #2980b9;
  }
  
  .success {
    color: green;
    margin-top: 10px;
  }
  </style>
  