import Vue from 'vue';
import { markersArea } from '../../pages/MapCity/Area/sample-area';
const initState = {
  areas: [],
  selectedArea: {}
};
export const areaStore = {
  namespaced: true,
  state: { ...initState },
  getters: {
    getMapAreas: state => state.areas,
    getMapSelectedArea: state => state.selectedArea
  },
  mutations: {
    setMapAreas: (state, payload) => (state.areas = payload),
    setMapSelectedArea: (state, payload) => (state.selectedArea = payload)
  },
  actions: {
    fetchMapAreas: async (context) => {
      try {
        const result = await Vue.prototype.$axios.get("/redevelopment_areas", {
          timeout: 10000
        });
        console.log(result.data.results);
        context.commit('setMapAreas', result.data.results)
      } catch (error) {
        // if CORS error we use dummy data
        context.commit(markersArea)
        console.log(error)
      }

      // context.commit("setMapAreas", data);
    },
    changeMapSelectedArea: (context, area) =>
      context.commit("setMapSelectedArea", area)
  }
};
