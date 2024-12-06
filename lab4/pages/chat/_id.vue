<template>
  <div class="chat">
    <div class="messages">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="['message', message.sender === 'user' ? 'user-message' : 'recipient-message']"
      >
        <p>{{ message.message }}</p>
        <span class="timestamp">{{ formatTimestamp(message.timestamp) }}</span>
      </div>
    </div>

    <div class="message-input">
      <input
        type="text"
        v-model="newMessage"
        placeholder="Type a message..."
        @keyup.enter="sendMessage"
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar
  },

  data() {
    return {
      chatId: this.$route.params.id, 
      messages: [], 
      newMessage: "", 
    };
  },
  mounted() {
    this.loadMessages();
  },
  methods: {
    loadMessages() {
      const allChats = JSON.parse(localStorage.getItem("chats")) || {};
      this.messages = allChats[this.chatId] || []; 
    },
    sendMessage() {
      if (!this.newMessage.trim()) return; 

      const userMessage = {
        id: Date.now(),
        sender: "user",
        message: this.newMessage.trim(),
        timestamp: new Date().toISOString(),
      };
      this.messages.push(userMessage);
      this.newMessage = "";

      this.saveMessages();

      this.simulateResponse();
    },
    simulateResponse() {
      const randomResponses = [
        "That's interesting!",
        "Could you tell me more?",
        "I'm not sure about that.",
        "Sounds good to me!",
        "Let me think about it.",
        "Can you explain that further?",
        "I totally agree with you.",
        "That’s a great point!",
        "Let’s discuss this later.",
        "I’ll get back to you on that."
      ];

      setTimeout(() => {
        const responseMessage = {
          id: Date.now() + 1, 
          sender: "recipient",
          message: randomResponses[Math.floor(Math.random() * randomResponses.length)],
          timestamp: new Date().toISOString(),
        };

        this.messages.push(responseMessage);
        this.saveMessages();
      }, 1000); 
    },
    saveMessages() {
      const allChats = JSON.parse(localStorage.getItem("chats")) || {};
      allChats[this.chatId] = this.messages; 
      localStorage.setItem("chats", JSON.stringify(allChats));
    },
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    },
  },
};
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  max-width: 60%;
}

.user-message {
  background-color: #d1f7d1;
  align-self: flex-end;
}

.recipient-message {
  background-color: #f1f1f1;
  align-self: flex-start;
}

.timestamp {
  font-size: 0.8rem;
  color: gray;
  margin-top: 5px;
}

.message-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  margin-left: 10px;
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
