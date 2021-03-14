// Import Section
import Vue from 'vue'

// Main Section
export const userStore = {
  state: {
    data: {

    },
    location: null
  },
  getters: {
    user: (state, getters) => {
      return state.data
    },
    getUserLocation: state => state.location
  },
  mutations: {
    setUser: function (state, payload) {
      state.data = payload
    },
    patchUser: async function (state, payload) {
      const { data: user } = await Vue.prototype.$axios.patch(
        `/users/${this.getters.user.id}/`,
        Vue.prototype.$qs.stringify(payload)
      )
      this.commit('setUser', user)
      Vue.prototype.$axios.defaults.headers.common.Authorization = `token ${user.token}`
    },
    logout: function (state, payload) {
      state.data = {};
      state.location = null;
    },
    setUserLocation: function (state, location) {
      state.location = location
    }

  },
  actions: {
    changeUserLocation: function (context, payload) {
      context.commit("setUserLocation", payload);
    }
  }
}
