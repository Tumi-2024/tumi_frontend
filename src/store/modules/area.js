import Vue from "vue";
// import { markersArea } from "../../pages/MapCity/Area/sample-area";
const initState = {
  areas: [],
  selectedArea: null
};
export const areaStore = {
  namespaced: true,
  state: { ...initState },
  getters: {
    getMapAreas: state => {
      return state.areas;
    },
    getMapSelectedArea: state => {
      return state.selectedArea;
    }
  },
  mutations: {
    setMapAreas: (state, payload) => (state.areas = payload),
    setMapSelectedArea: (state, payload) => (state.selectedArea = payload),
    setRedevelopmentSteps: (state, payload) =>
      (state.selectedArea.steps = payload)
  },
  actions: {
    fetchMapAreas: async (context, payload) => {
      try {
        const url = `/redevelopment_areas/?${payload}&page_size=1000`;
        const { data } = await Vue.prototype.$axios.get(url);
        context.commit("setMapAreas", data.results);
        // context.commit("setMapAreas", data.results);
        // context.commit("setMapAreas", markersArea);
      } catch (error) {
        // if CORS error we use dummy data
        // context.commit("setMapAreas", markersArea);
      }
      // context.commit("setMapAreas", data);
    },
    interestSelectedArea: async context => {
      try {
        const area = context.state.selectedArea;

        if (area.interest.redevelopment_area) {
          await Vue.prototype.$axios.delete(
            `/redevelopment_areas/${area.id}/interest/`
          );
          context.state.selectedArea.interest.redevelopment_area = false;
          return;
        }
        await Vue.prototype.$axios.post(
          `/redevelopment_areas/${area.id}/interest/`
        );
        context.state.selectedArea.interest.redevelopment_area = true;
      } catch (error) {
      }
    },
    uninterestSelectedArea: async context => {
      try {
        const id = context.state.selectedArea.id;
        await Vue.prototype.$axios.delete(
          `/redevelopment_areas/${id}/interest/`
        );
      } catch (error) {
      }
    },
    changeMapSelectedArea: (context, area) =>
      context.commit("setMapSelectedArea", area),
    fetchRedevelopmentSteps: async (context, id) => {
      try {
        const result = await Vue.prototype.$axios.get(
          `/redevelopment_areas/${id}/steps/`
        );
        context.commit("setRedevelopmentSteps", result.data);
      } catch (error) {
        // if CORS error we use dummy data
        context.commit("setRedevelopmentSteps", []);
      }
    }
  }
};
