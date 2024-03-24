// Import Section
import Vue from 'vue'
import { Cookies } from "quasar";

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
      Cookies.set("tumi", payload.token, {
        expires: this.autoLogin ? "30d" : undefined
      });
      Cookies.set("tumi_id", payload.id, {
        expires: this.autoLogin ? "30d" : undefined
      });
      Cookies.set("team", payload.type, {
        expires: this.autoLogin ? "30d" : undefined
      });
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
      Cookies.remove("tumi", payload.token, {
        expires: this.autoLogin ? "30d" : undefined
      });
      Cookies.remove("tumi_id", payload.id, {
        expires: this.autoLogin ? "30d" : undefined
      });
      Cookies.remove("team", payload.type, {
        expires: this.autoLogin ? "30d" : undefined
      });
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
