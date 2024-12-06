export const state = () => ({
  friends: [], 
});

export const mutations = {
  SET_FRIENDS(state, friends) {
    state.friends = friends;
  },
  ADD_FRIEND(state, friendId) {
    state.friends.push(friendId);
    if (process.client) {
      localStorage.setItem("friends", JSON.stringify(state.friends));
    }
  },
  REMOVE_FRIEND(state, friendId) {
    state.friends = state.friends.filter((id) => id !== friendId);
    if (process.client) {
      localStorage.setItem("friends", JSON.stringify(state.friends));
    }
  },
};

export const actions = {
  nuxtServerInit({ commit }) {
    if (process.client) {
      const friends = JSON.parse(localStorage.getItem("friends")) || [];
      commit("SET_FRIENDS", friends);
    }
  },
  subscribe({ commit }, friendId) {
    commit("ADD_FRIEND", friendId);
  },
  unsubscribe({ commit }, friendId) {
    commit("REMOVE_FRIEND", friendId);
  },
};

export const getters = {
  isFriend: (state) => (friendId) => state.friends.includes(friendId),
  getFriends: (state) => state.friends,
};
