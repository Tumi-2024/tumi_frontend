import Vue from "vue";
import { markersArea } from "../../pages/MapCity/Area/sample-area";
const initState = {
  areas: [],
  selectedArea: null
};
export const areaStore = {
  namespaced: true,
  state: { ...initState },
  getters: {
    getMapAreas: state => {
      return state.areas
    },
    getMapSelectedArea: state => state.selectedArea
  },
  mutations: {
    setMapAreas: (state, payload) => (state.areas = payload),
    setMapSelectedArea: (state, payload) => (state.selectedArea = payload)
  },
  actions: {
    fetchMapAreas: async context => {
      try {
        const result = await Vue.prototype.$axios.get("/redevelopment_areas", {
          timeout: 10000
        });
        context.commit("setMapAreas", result.data.results);
        // context.commit("setMapAreas", markersArea);
      } catch (error) {
        // if CORS error we use dummy data
        context.commit("setMapAreas", markersArea);
        console.log(error, "error");
      }

      // context.commit("setMapAreas", data);
    },
    changeMapSelectedArea: (context, area) =>
      context.commit("setMapSelectedArea", area)
  }
};
