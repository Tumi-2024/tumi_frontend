import Vue from "vue";
// import { markersArea } from "../../pages/MapCity/Area/sample-area";
const initState = {
  areas: [],
  selectedArea: null
};
export const areaStore = {
  namespaced: true,
  state: { ...initState, payload: {} },
  getters: {
    getMapAreas: (state) => {
      return state.areas;
    },
    getMapSelectedArea: (state) => {
      return state.selectedArea;
    }
  },
  mutations: {
    setMapAreas: (state, payload) => (state.areas = payload),
    setMapSelectedArea: (state, payload) => (state.selectedArea = payload),
    setMapInterest: (state, payload) => (state.selectedArea.interest = payload),
    setRedevelopmentSteps: (state, payload) =>
      (state.selectedArea.steps = payload),
    setPayload: (state, payload) => (state.payload = payload)
  },
  actions: {
    fetchMapAreas: async (context, payload) => {
      try {
        const area = context.rootGetters["search/area"];
        const price = context.rootGetters["search/price"];
        const initPrice = context.rootGetters["search/initPrice"];
        const person = context.rootGetters["search/person"];
        const category = context.rootGetters["search/getCategoriesByKorean"];

        const lat = context.rootState.estate.latitude;
        const long = context.rootState.estate.longitude;
        const getQueryArray = (keyName, params) => {
          if (keyName === "type_house__in" && params.length === 8) {
            return {};
          }
          if (Array.isArray(params)) {
            const hasValue = params.every((value) => value !== undefined);
            if (!hasValue || params.length === 0) return {};
            return {
              [keyName]: params.join(",")
            };
          }
          if (!params) return {};
          return {
            [keyName]: params
          };
        };

        if (payload) {
          context.commit("setPayload", payload);
        }

        const getAreaTypeString = () => {
          switch (context.rootState.map.areaType) {
            case null:
              return "";
            case "재개발":
            case "재건축":
            case "일반":
              return context.rootState.map.areaType;
            case "기타":
              return "기타";
            default:
              return context.rootState.map.areaType;
          }
        };

        const { data } = await Vue.prototype.$axios.get(
          "redevelopment_areas/",
          {
            params: {
              latitude__range: `${lat[0]},${lat[1]}`,
              longitude__range: `${long[0]},${long[1]}`,
              page_size: 1000,
              ...getQueryArray("type_house__in", category),
              ...getQueryArray("price_selling_hope__range", [
                price.min,
                price.max
              ]),
              ...getQueryArray("price_initial_investment__range", [
                initPrice.min,
                initPrice.max
              ]),
              ...getQueryArray([`${area.value}__range`], [area.min, area.max]),
              ...getQueryArray("user__in", person),
              ...getQueryArray(
                "redevelopment_area__category",
                getAreaTypeString()
              ),
              ...areaStore.state.payload
            }
          }
        );

        context.commit("setMapAreas", data.results);
        // context.commit("setMapAreas", data.results);
        // context.commit("setMapAreas", markersArea);
      } catch (error) {
        // if CORS error we use dummy data
        // context.commit("setMapAreas", markersArea);
      }
      // context.commit("setMapAreas", data);
    },
    interestSelectedArea: async (context) => {
      try {
        const area = context.state.selectedArea;
        // if (area.interest?.redevelopment_area) {
        //   await Vue.prototype.$axios.delete(
        //     `/redevelopment_areas/${area.id}/interest/`
        //   );
        //   // context.state.selectedArea.interest = { redevelopment_area: false };
        //   return;
        // }
        const { data } = await Vue.prototype.$axios.post(
          `/redevelopment_areas/${area.id}/interest/`
        );
        context.commit("setMapInterest", data);
      } catch (error) { }
    },
    uninterestSelectedArea: async (context) => {
      try {
        const id = context.state.selectedArea.id;
        await Vue.prototype.$axios.delete(
          `/redevelopment_areas/${id}/interest/`
        );
        context.commit("setMapInterest", null);
      } catch (error) { }
    },
    changeMapSelectedArea: (context, area) =>
      context.commit("setMapSelectedArea", area),
    fetchRedevelopmentSteps: async (context, id) => {
      try {
        const result = await Vue.prototype.$axios.get(
          `/redevelopment_areas/${id}/`
        );

        context.commit(
          "setRedevelopmentSteps",
          result.data.redevelopment_steps
        );
      } catch (error) {
        // if CORS error we use dummy data
        context.commit("setRedevelopmentSteps", []);
      }
    }
  }
};
