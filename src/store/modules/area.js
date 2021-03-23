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
    getMapSelectedArea: state => state.selectedArea
  },
  mutations: {
    setMapAreas: (state, payload) => (state.areas = payload),
    setMapSelectedArea: (state, payload) => (state.selectedArea = payload),
    setRedevelopmentSteps: (state, payload) =>
      (state.selectedArea.steps = payload)
  },
  actions: {
    fetchMapAreas: async context => {
      try {
        let areas = []
        let url = "/redevelopment_areas";
        while (true) {
          console.log(url);
          const result = await Vue.prototype.$axios.get(url, {
            timeout: 10000
          });
          areas = areas.concat(result.data.results);
          context.commit("setMapAreas", context.state.areas.concat(result.data.results));
          if (!result.data.next) {
            break;
          } else {
            url = result.data.next;
          }
        }
        context.commit("setMapAreas", areas);
        // context.commit("setMapAreas", markersArea);
      } catch (error) {
        // if CORS error we use dummy data
        // context.commit("setMapAreas", markersArea);
        console.log(error, "error");
      }
      // context.commit("setMapAreas", data);
    },
    changeMapSelectedArea: (context, area) =>
      context.commit("setMapSelectedArea", area),
    fetchRedevelopmentSteps: async (context, id) => {
      try {
        const result = await Vue.prototype.$axios.get(
          `/redevelopment_areas/${id}/steps`,
          {
            timeout: 10000
          }
        );
        // console.log(result.data);
        context.commit("setRedevelopmentSteps", result.data);
      } catch (error) {
        // if CORS error we use dummy data
        context.commit("setRedevelopmentSteps", []);
        console.log(error, "error");
      }
    }
  }
};
