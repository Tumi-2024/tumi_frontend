// Main Section
import Vue from "vue";

export const estateStore = {
  state: {
    simple_houses: [],
    detail_houses: [],
    distinct_houses: [],
    interest_houses: [],
    current_house: {},
    recently_viewed_houses: [],
    count_estate: 0,
    simple_houses_type: ''
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
    },
    interest_houses: (state, getters) => state.interest_houses,
    current_house: (state, getters) => {
      return state.current_house
    }
  },
  mutations: {
    setSimpleHousesType: function (state, payload) {
      state.simple_houses_type = payload
    },
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
      state.current_house = payload
    },
    setRecentlyViewedHouses: function (state, payload) {
      state.recently_viewed_houses = payload
    },
    setInterestHouses: function (state, payload) {
      state.interest_houses = payload
    },
    removeInterestHouse: function (state, payload) {
      state.current_house.interest.house = null
    }
  },
  actions: {
    getSimpleHouses: async function (context, payload) {
      let data;
      console.log(context, payload)
      // if (context.state.simple_houses_type === payload.type) return
      if (payload.type === 'city') {
        data = await Vue.prototype.$axios.get(
          `/cities`, {
            timeout: 10000
          }
        );
      } else if (payload.type === 'subcity') {
        data = await Vue.prototype.$axios.get(
          `/sub_cities?latitude__range=${payload.latitude[0]},${payload.latitude[1]}&longitude__range=${payload.longitude[0]},${payload.longitude[1]}`, {
            timeout: 10000
          }
        );
      } else if (payload.type === 'locations') {
        data = await Vue.prototype.$axios.get(
          `/locations?page_size=1000&latitude__range=${payload.latitude[0]},${payload.latitude[1]}&longitude__range=${payload.longitude[0]},${payload.longitude[1]}`, {
            timeout: 10000
          }
        );
      } else {
        data = await Vue.prototype.$axios.get(
          `/transaction_groups/?page_size=1000&latitude__range=${payload.latitude[0]},${payload.latitude[1]}&longitude__range=${payload.longitude[0]},${payload.longitude[1]}`, {
            timeout: 10000
          }
        );
      }
      context.commit('setSimpleHouses', data.data.results.map(item =>
        ({
          ...item,
          position: {
            lat: Number(item.latitude),
            lng: Number(item.longitude)
          }
        }))
      )
      context.commit('setSimpleHousesType', payload.type)
    },
    getDistinctHouses: async function (context, paramter) {
      const response = await Vue.prototype.$axios.get(
        `/houses/distinct${paramter ? `?${paramter}` : ''}`, {
          timeout: 100000
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
      context.commit('setSelectedHouse', parameter)
      if (context.state.recently_viewed_houses.some(house => house.id === parameter.id)) return
      Vue.prototype.$axios.post(`/houses/${parameter.id}/recent/`).then(result => {
        context.commit('setRecentlyViewedHouses', context.state.recently_viewed_houses.concat(result.data.house))
      })
    },
    toggleInterestHouse: (context, parameter) => {
      const house = context.state.current_house
      if (house.interest.house) {
        Vue.prototype.$axios.delete(`/houses/${house.id}/interest/`).then(() => {
          context.commit('removeInterestHouse')
        })
        return
      }
      Vue.prototype.$axios.post(`/houses/${house.id}/interest/`).then(result => {
        context.commit('setSelectedHouse', result.data.house)
      })
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
