// Main Section
import Vue from "vue";

export const estateStore = {
  state: {
    simple_houses: [],
    detail_houses: [],
    distinct_houses: []
  },
  getters: {
    simple_houses: (state, getters) => {
      return state.simple_houses
    },
    detail_houses: (state, getters) => {
      return state.detail_houses
    },
    distinct_houses: (state, getters) => {
      return state.distinct_houses
    }
  },
  mutations: {
    setSimpleHouses: function (state, payload) {
      state.simple_houses = payload
    },
    setDetailHouses: function (state, payload) {
      state.detail_houses = payload
    },
    setDistinctHouses: function (state, payload) {
      state.distinct_houses = payload
    }
  },
  actions: {
    getSimpleHouses: async function (context, payload) {
      const response = await Vue.prototype.$axios.get(
        `/houses/simple${payload ? `?${payload}` : ""}`, {
          timeout: 10000
        }
      );
      context.commit('setSimpleHouses', response.data.filter(item => item.latitude && item.longitude).map(item =>
        ({
          ...item,
          position: {
            lat: Number(item.latitude),
            lng: Number(item.longitude)
          }
        }))
      )
    },
    getDistinctHouses: async function (context, paramter) {
      const response = await Vue.prototype.$axios.get(
        `/houses/distinct${paramter ? `?${paramter}` : ''}`, {
          timeout: 10000
        })
      const results = response.data.map(item =>
        ({
          ...item,
          position: {
            lat: Number(item.latitude),
            lng: Number(item.longitude)
          }
        })
      )
      context.commit('setDistinctHouses', results)
    },
    getDetailHouses: async function (context, paramter) {
      const response = await Vue.prototype.$axios.get(
        `/houses/${paramter ? `?${paramter}` : ''}`, {
          timeout: 10000
        })
      const results = response.data.results.map(item =>
        ({
          ...item,
          position: {
            lat: Number(item.latitude),
            lng: Number(item.longitude)
          }
        }))
      context.commit('setDetailHouses', results)
    },
    getInterestHouses: async function (context, paramter) {
      const response = await Vue.prototype.$axios.get(
        `/houses/interests/`, {
          timeout: 10000
        })
      const results = response.data.results.map(item =>
        ({
          ...item,
          position: {
            lat: Number(item.latitude),
            lng: Number(item.longitude)
          }
        }))
      context.commit('setDetailHouses', results)
    },
    getContactHouses: async function (context, paramter) {
      const response = await Vue.prototype.$axios.get(
        `/houses/contacts/`, {
          timeout: 10000
        })
      const results = response.data.results.map(item =>
        ({
          ...item,
          position: {
            lat: Number(item.latitude),
            lng: Number(item.longitude)
          }
        }))
      context.commit('setDetailHouses', results)
    }
  }
}
