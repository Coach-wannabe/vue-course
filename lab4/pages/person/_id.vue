<template>
  <div class="person-profile" v-if="person">
    <h1>{{ person.PersonName }}</h1>
    <img :src="getAvatarUrl(person.Avatar)" alt="Avatar" class="avatar" />
    <p>Email: {{ person.Email || "Not provided" }}</p>
    <p>Rating: {{ person.Rating.toFixed(1) }}</p>
    <p>{{ person.Commentary }}</p>

    <button @click="toggleSubscription" class="subscribe-btn">
      {{ isSubscribed ? "Unsubscribe" : "Subscribe" }}
    </button>

    <nuxt-link
      v-if="isSubscribed"
      :to="`/chat/${person.id}`"
      class="chat-btn"
    >
      Chat
    </nuxt-link>
  </div>

  <div v-else>
    <p>Person not found. <nuxt-link to="/">Go back to the list</nuxt-link></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      person: null,
      isSubscribed: false, 
    };
  },
  mounted() {
    const id = this.$route.params.id;

    const persons = JSON.parse(localStorage.getItem("persons"));

    if (persons && persons.length > 0) {
      this.person = persons.find((p) => p.id == id);
    } else {
      console.error("Persons data not found in localStorage.");
    }

    this.updateSubscriptionState();
  },
  methods: {
    toggleSubscription() {
      let friends = JSON.parse(localStorage.getItem("friends")) || [];

      if (this.isSubscribed) {
        friends = friends.filter((friend) => friend.id !== this.person.id);
        this.isSubscribed = false;
      } else {
        friends.push(this.person);
        this.isSubscribed = true;
      }

      localStorage.setItem("friends", JSON.stringify(friends));
    },
    updateSubscriptionState() {
      const friends = JSON.parse(localStorage.getItem("friends")) || [];
      this.isSubscribed = friends.some((friend) => friend.id == this.person.id);
    },
    getAvatarUrl(avatar) {
      try {
        return require(`@/assets/${avatar || "logo.png"}`);
      } catch (error) {
        console.error("Avatar not found, using default:", error);
        return require("@/assets/logo.png");
      }
    },
  },
  watch: {
    isSubscribed() {
      this.updateSubscriptionState();
    },
  },
};
</script>

<style scoped>
.person-profile {
  padding: 20px;
  text-align: center;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.subscribe-btn {
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

.subscribe-btn:hover {
  background-color: #2980b9;
}

.chat-btn {
  display: inline-block;
  margin-top: 15px;
  background-color: #2ecc71;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.chat-btn:hover {
  background-color: #27ae60;
}
</style>
