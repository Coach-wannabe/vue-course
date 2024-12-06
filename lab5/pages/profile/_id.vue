<template>
    <div>
      <h1>{{ user.name }}'s Profile</h1>
      <p><strong>About:</strong> {{ user.about }}</p>
      <button @click="subscribeToUser" :disabled="isSubscribed">
        {{ isSubscribed ? 'Subscribed' : 'Subscribe' }}
      </button>
      <p v-if="subscribedMessage" class="success">{{ subscribedMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userId: 1, 
        subscribedMessage: '',
      };
    },
    computed: {
      user() {
        const id = this.$route.params.id;
        return { id, name: `User ${id}`, about: 'Lorem ipsum about user.' }; 
      },
      isSubscribed() {
        return this.$store.getters['friends/getFriends'](this.userId).includes(this.user.id);
      },
    },
    methods: {
      subscribeToUser() {
        if (!this.isSubscribed) {
          this.$store.commit('friends/ADD_FRIEND', { userId: this.userId, friendId: this.user.id });
          this.subscribedMessage = `Subscribed to ${this.user.name}!`;
          setTimeout(() => (this.subscribedMessage = ''), 3000);
        }
      },
    },
  };
  </script>
  
<style>
  .success {
    color: green;
    margin-top: 10px;
  }
</style>
  