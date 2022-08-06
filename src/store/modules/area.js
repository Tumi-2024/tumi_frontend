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
      (state.selectedArea.steps = payload)
  },
  actions: {
    fetchMapAreas: async (context, payload) => {
      try {
        const getQueryString2 =
          context.rootGetters["searchQuery/getQueryString2"];
        const users = getQueryString2("users", "");

        const area = context.rootGetters["queryBuilder/area"];
        const price = context.rootGetters["queryBuilder/price"];
        const ctgr = context.rootGetters["queryBuilder/getCategoriesByKorean"];

        // if (payload?.latitude) {
        //   await context.commit("estate/setLatitude", payload.latitude, {
        //     root: true
        //   });
        //   await context.commit("estate/setLongitude", payload.longitude, {
        //     root: true
        //   });
        // }
        const lat = context.rootState.estate.latitude;
        const long = context.rootState.estate.longitude;
        const getQueryArray = (keyname, params) => {
          const hasValue = params.every((value) => !!value);
          if (hasValue) {
            return { [keyname]: params };
          } else {
            return {};
          }
        };

        const getRedevQuery = () => {
          if (context.getters["map/getIsCone"]) {
            // return { redevelopment_area__status: "운영" };
            return {};
          } else {
            return { redevelopment_area__isnull: true };
          }
        };

        const getTypeHouseIn = () => {
          const _ctgr = ctgr.join(",");
          if (_ctgr.length === 0) {
            return null;
          }
          return { type_house__in: _ctgr };
        };

        const { data } = await Vue.prototype.$axios.get(
          "redevelopment_areas/",
          {
            params: {
              latitude__range: `${lat[0]},${lat[1]}`,
              longitude__range: `${long[0]},${long[1]}`,
              page_size: 1000,
              ...getTypeHouseIn(),
              ...getQueryArray("price_selling_hope__range", [
                price.min,
                price.max
              ]),
              ...getQueryArray([`${area.value}__range`], [area.min, area.max]),
              user__in: users.length === 0 ? undefined : users,
              ...getRedevQuery(),
              ...payload
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
      } catch (error) {}
    },
    uninterestSelectedArea: async (context) => {
      try {
        const id = context.state.selectedArea.id;
        await Vue.prototype.$axios.delete(
          `/redevelopment_areas/${id}/interest/`
        );
        context.commit("setMapInterest", null);
      } catch (error) {}
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
