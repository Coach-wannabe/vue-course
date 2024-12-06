export const state = () => ({
    messages: [],
  });
  
  export const mutations = {
    SEND_MESSAGE(state, message) {
      state.messages.push(message);
    },
  };
  
  export const getters = {
    getMessages: (state) => (userId, recipientId) =>
      state.messages.filter(
        (m) =>
          (m.senderId === userId && m.recipientId === recipientId) ||
          (m.senderId === recipientId && m.recipientId === userId)
      ),
  };
  