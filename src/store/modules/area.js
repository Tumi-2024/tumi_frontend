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
    getMapSelectedArea: state => { console.log(state.selectedArea); return state.selectedArea }
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
        // let areas = []
        if (context.state.areas.length > 0) {
          return;
        }
        const url = "/redevelopment_areas?page_size=100";
        const { data } = await Vue.prototype.$axios.get(url);
        console.log(data);
        context.commit("setMapAreas", data.results);
        // const areas = tconcat.results
        // const areas = results.reduce((acc, val) => acc.concat(val), [])
        // areas = areas.concat(result.data.results);
        // while (true) {
        //   console.log(url);
        //   const result = await Vue.prototype.$axios.get(url, {
        //     timeout: 10000
        //   });
        //   areas = areas.concat(result.data.results);
        //   context.commit("setMapAreas", context.state.areas.concat(result.data.results));
        //   if (!result.data.next) {
        //     break;
        //   } else {
        //     url = result.data.next;
        //   }
        // }
        // context.commit("setMapAreas", data.results);
        // context.commit("setMapAreas", markersArea);
      } catch (error) {
        // if CORS error we use dummy data
        // context.commit("setMapAreas", markersArea);
        console.log(error, "error");
      }
      // context.commit("setMapAreas", data);
    },
    interestSelectedArea: async (context) => {
      try {
        const area = context.state.selectedArea

        if (area.interest.redevelopment_area) {
          await Vue.prototype.$axios.delete(`/redevelopment_areas/${area.id}/interest/`)
          context.state.selectedArea.interest.redevelopment_area = false
          return
        }
        await Vue.prototype.$axios.post(`/redevelopment_areas/${area.id}/interest/`)
        context.state.selectedArea.interest.redevelopment_area = true
      } catch (error) {
        console.log(error, "error");
      }
    },
    uninterestSelectedArea: async (context) => {
      try {
        const id = context.state.selectedArea.id
        await Vue.prototype.$axios.delete(`/redevelopment_areas/${id}/interest/`)
      } catch (error) {
        console.log(error, "error");
      }
    },
    changeMapSelectedArea: (context, area) =>
      context.commit("setMapSelectedArea", area),
    fetchRedevelopmentSteps: async (context, id) => {
      try {
        const result = await Vue.prototype.$axios.get(
          `/redevelopment_areas/${id}/steps/`
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
