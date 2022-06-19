// Import Section
import Vue from "vue";

const initState = {
  isMapLoaded: true,
  mode: "default",
  mapZoom: 12,
  mapCenter: {
    lat: 37.547,
    lng: 126.997
  },
  mapAddress: "",
  mapOptions: {
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    scrollwheel: true,
    fullscreenControl: false,
    disableDefaultUI: true,
    minZoom: 12
  },
  toolbarTitle: "서울시 종로구",
  toolbarLabel: "지금 보고있는 지역",
  interest: [],
  isInterest: false,
  locationLoading: false,
  areaType: null,
  isCone: true
};
export const mapStore = {
  namespaced: true,
  state: { ...initState },
  getters: {
    getMapMode: (state) => state.mode,
    getMapZoom: (state) => state.mapZoom,
    getMapCenter: (state) => state.mapCenter,
    getMapOptions: (state) => state.mapOptions,
    getToolbarLabel: (state) => state.toolbarLabel,
    // you lookint at | information viewing
    //   return state.mode !== "default"
    //     ? "지금 보고있는 정보"
    //     : "지금 보고있는 지역";
    // },
    getToolbarTitle: (state) => state.toolbarTitle,
    getIsCone: (state) => state.isCone,
    getAreaType: (state) => state.areaType,
    myInterestArea: (state) => state.interest
  },
  mutations: {
    setMapMode: (state, payload) => (state.mode = payload),
    setMapZoom: (state, payload) => (state.mapZoom = payload),
    setMapCenter: (state, payload) => (state.mapCenter = payload),
    setMapAddress: (state, payload) => (state.mapAddress = payload),
    setMapOptions: (state, payload) => (state.mapOptions = payload),
    setToolbarTitle: (state, payload) => (state.toolbarTitle = payload),
    setToolbarLabel: (state, payload) => (state.toolbarLabel = payload),
    setInterest: (state, payload) => (state.interest = payload),
    setIsInterest: (state, payload) => (state.isInterest = payload),
    setLocationLoading: (state, payload) => (state.locationLoading = payload),
    setAreaType: (state, payload) => (state.areaType = payload),
    // setIsCone: (state, payload) => (state.isCone = payload),
    removeLocationInterest: (state, payload) => {
      const index = state.interest.findIndex((area) => area.id === payload);
      state.interest.splice(index, 1);
    }
  },
  actions: {
    setAreaType: (context, payload) => context.commit("setAreaType", payload),
    setMapCenter: (context, payload) => context.commit("setMapCenter", payload),
    setMapZoom: (context, payload) => context.commit("setMapZoom", payload),
    setMapMode: (context, payload) => context.commit("setMapMode", payload),
    setIsCone: (context, payload) => context.commit("setIsCone", payload),
    setLocationLoading: (context, payload) =>
      context.commit("setLocationLoading", payload),
    resetMap: (context) => {
      context.commit("setMapMode", initState.mode);
      context.commit("setMapZoom", initState.mapZoom);
      context.commit("setMapCenter", initState.mapCenter);
      context.commit("setMapOptions", initState.mapOptions);
      context.commit("setToolbarTitle", initState.toolbarTitle);
    },
    /**
     * Set the mode of the map
     * @param context
     * @param {('default'|'transaction'|'apartment'|'redevelop-area'|'redevelop-estate')} mode - options
     */
    changeMapMode: (context, mode = "default") => {
      const possibleValues = [
        "default",
        "transaction",
        "apartment",
        "redevelop-area",
        "redevelop-estate"
      ];
      if (possibleValues.includes(mode)) {
        context.commit("setMapMode", mode);
      }
    },
    changeMapZoom: (context, data) => context.commit("setMapZoom", data),
    changeMapCenter: async (context, data) => {
      context.commit("setMapCenter", data);
      Vue.prototype.$axios
        .post(
          `/locations/find/`,
          Vue.prototype.$qs.stringify({
            latitude: data.lat,
            longitude: data.lng
          })
        )
        .then((result) => {
          const string = result.data.address.split(" ");
          const redevTitle = result.data.redevelopment_area.title;

          context.commit("setMapAddress", `${string[1]} ${string[2]}`);
          context.commit(
            "setToolbarTitle",
            redevTitle || `${string[1]} ${string[2]}`
          );
          context.commit(
            "setToolbarLabel",
            redevTitle ? "지금 보고있는 정비사업" : "지금 보고있는 지역"
          );

          // context.commit("setToolbarTitle", `${string[1]} ${string[2]}`);

          if (result?.data?.location?.subcity?.interest?.subcity) {
            context.commit("setIsInterest", true);
          } else {
            context.commit("setIsInterest", false);
          }
          // context.commit("");
          // data.lat, longitude: data.lng
        })
        .catch((thrown) => {
          if (Vue.prototype.$axios.isCancel(thrown)) {
          }
        });
    },
    changeMapOptions: (context, data) => context.commit("setMapOptions", data),
    changeToolbarTitle: (context, data) =>
      context.commit("setToolbarTitle", data),
    addInterestLocation: (context) => {
      if (!context.state.isInterest) {
        Vue.prototype.$axios
          .post(
            `/sub_cities/interest/address/`,
            Vue.prototype.$qs.stringify({
              latitude: context.state.mapCenter.lat,
              longitude: context.state.mapCenter.lng
            })
          )
          .then((result) => {
            context.commit(
              "setInterest",
              context.state.interest.concat(result.data.subcity)
            );
            context.commit("setIsInterest", true);
          });
      } else {
        Vue.prototype.$axios
          .post(
            `/sub_cities/uninterest/address/`,
            Vue.prototype.$qs.stringify({
              latitude: context.state.mapCenter.lat,
              longitude: context.state.mapCenter.lng
            })
          )
          .then((result) => {
            context.commit("setIsInterest", false);
          });
      }
    },
    removeLocationInterest: (context, payload) => {
      Vue.prototype.$axios
        .delete(`redevelopment_areas/${payload}/interest/`)
        .then((result) => {
          context.commit("removeLocationInterest", payload);
        });
    },
    fetchLocationInterest: async (context) => {
      try {
        const response = await Vue.prototype.$axios.get(
          `/sub_cities/interests/`
        );
        context.commit("setInterest", response.data.results);
      } catch (error) {}
    }
  }
};
