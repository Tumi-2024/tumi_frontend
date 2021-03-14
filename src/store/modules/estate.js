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
      const response = await Vue.prototype.$axios.get(`/house/simple${payload ? `?${payload}` : ''}`)
      context.commit('setSimpleHouses', response.data.filter(item => item.latitude && item.longitude).map(item =>
        ({
          ...item,
          position: {
            lat: item.latitude,
            lng: item.longitude
          }
        }))
      )
    },
    // getDetailHouses: async function (context, paramter) {
    //   console.log('contextcontextcontextcontextcontextcontextcontextcontextcontextcontext');
    //   console.log(paramter);
    //   console.log('contextcontextcontextcontextcontextcontextcontextcontextcontextcontext');
    //   const response = await Vue.prototype.$axios.get(`/house/?latitude__range=${paramter.latitude[0]},${paramter.latitude[1]}&longitude__range=${paramter.longitude[0]},${paramter.longitude[1]}`)
    //   const results = response.data.results.map(item =>
    //     ({
    //       ...item,
    //       position: {
    //         lat: item.latitude,
    //         lng: item.longitude
    //       }
    //     }))
    //   context.commit('setDetailHouses', results)
    //   if (results && results.length > 1) {
    //     let result = results.reduce((acc, cur) => {
    //       const key = `${cur.position.lat},${cur.position.lng}`;
    //       if (acc[key]) {
    //         acc[key] = acc[key].concat(cur);
    //       } else {
    //         acc[key] = [cur];
    //       }
    //       return acc;
    //     }, {});
    //     console.log(result);
    //     result = Object.keys(result).map(item => result[item]);
    //     console.log(result);
    //     context.commit('setDistinctHouses', result)
    //   }
    // }
    getDistinctHouses: async function (context, paramter) {
      const response = await Vue.prototype.$axios.get(`/house/distinct${paramter ? `?${paramter}` : ''}`)
      const results = response.data.map(item =>
        ({
          ...item,
          position: {
            lat: item.latitude,
            lng: item.longitude
          }
        })
      )
      console.log(results);
      context.commit('setDistinctHouses', results)
    },
    getDetailHouses: async function (context, paramter) {
      const response = await Vue.prototype.$axios.get(`/house/${paramter ? `?${paramter}` : ''}`)
      const results = response.data.results.map(item =>
        ({
          ...item,
          position: {
            lat: item.latitude,
            lng: item.longitude
          }
        }))
      context.commit('setDetailHouses', results)
    }
  }
}
