export const state = () => ({
    favoriteProfiles: []
});

export const mutations = {
ADD_TO_FAVORITES(state, profile) {
    state.favoriteProfiles.push(profile);
},
REMOVE_FROM_FAVORITES(state, profileId) {
    state.favoriteProfiles = state.favoriteProfiles.filter(p => p.id !== profileId);
}
};

export const actions = {
addToFavorites({ commit }, profile) {
    commit('ADD_TO_FAVORITES', profile);
},
removeFromFavorites({ commit }, profileId) {
    commit('REMOVE_FROM_FAVORITES', profileId);
}
};

export const getters = {
getFavoriteProfiles(state) {
    return state.favoriteProfiles;
}
};
  