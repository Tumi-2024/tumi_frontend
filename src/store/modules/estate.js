// Main Section
import Vue from "vue";

export const estateStore = {
  state: {
    simple_houses: [],
    detail_houses: [],
    distinct_houses: [],
    selected_house: {},
    recently_viewed_houses: [],
    count_estate: 0
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
    },
    recently_viewed_houses: (state, getters) => {
      return state.recently_viewed_houses
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
    },
    setCountEstate: function (state, payload) {
      state.count_estate = payload
    },
    setSelectedHouse: function (state, payload) {
      state.selected_house = payload
    },
    setRecentlyViewedHouses: function (state, payload) {
      state.recently_viewed_houses = payload
    }
  },
  actions: {
    getSimpleHouses: async function (context, payload) {
      const response = await Vue.prototype.$axios.get(
        `/houses/simple${payload ? `?${payload}` : ""}`, {
          timeout: 60000
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
      console.log('getDistinctHouses', paramter)
      const response = await Vue.prototype.$axios.get(
        `/houses/distinct${paramter ? `?${paramter}` : ''}`, {
          timeout: 600000
        })
      const results = response.data.apartments.map(item =>
        ({
          ...item,
          position: {
            lat: Number(item.latitude),
            lng: Number(item.longitude)
          }
        })
      )
      context.commit('setDistinctHouses', results);
      context.commit('setCountEstate', response.data.houses_count);
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
      context.commit('setCountEstate', response.data.count);
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
    },
    addRecentlyViewedHouse: (context, parameter) => {
      if (context.state.recently_viewed_houses.some(house => house.id === parameter)) return
      Vue.prototype.$axios.post(`/houses/${parameter}/recent/`)
    },
    getRecentlyViewedHouses: async (context, parameter) => {
      const { data, status } = await Vue.prototype.$axios.get(`houses/recents/?ordering=${parameter}`, { timeout: 60000 })
      if (status !== 200) return
      context.commit("setRecentlyViewedHouses", data.results)
    },
    filterHousesType: (context, parameter) => {
      console.log(parameter)
    }
  }
}
