// Import Section
import Vue from "vue";

const initState = {
  isMapLoaded: true,
  mode: "default",
  mapZoom: 14,
  mapCenter: {
    lat: 37.5326,
    lng: 127.024612
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
    minZoom: 11
  },
  toolbarTitle: "서울시 종로구",
  interest: [],
  isInterest: false,
  locationLoading: false,
  isCone: true
};
export const mapStore = {
  namespaced: true,
  state: { ...initState },
  getters: {
    getMapMode: state => state.mode,
    getMapZoom: state => state.mapZoom,
    getMapCenter: state => state.mapCenter,
    getMapOptions: state => state.mapOptions,
    getToolbarLabel: state => {
      // you lookint at | information viewing
      return state.mode !== "default"
        ? "지금 보고 있는 정보"
        : "지금 보고있는 지역";
    },
    getToolbarTitle: state => state.toolbarTitle,
    getIsCone: state => state.isCone,
    myInterestArea: state => state.interest
  },
  mutations: {
    setMapMode: (state, payload) => (state.mode = payload),
    setMapZoom: (state, payload) => (state.mapZoom = payload),
    setMapCenter: (state, payload) => (state.mapCenter = payload),
    setMapAddress: (state, payload) => (state.mapAddress = payload),
    setMapOptions: (state, payload) => (state.mapOptions = payload),
    setToolbarTitle: (state, payload) => (state.toolbarTitle = payload),
    setInterest: (state, payload) => (state.interest = payload),
    setIsInterest: (state, payload) => (state.isInterest = payload),
    setLocationLoading: (state, payload) => (state.locationLoading = payload),
    setIsCone: (state, payload) => (state.isCone = payload),
    removeLocationInterest: (state, payload) => {
      const index = state.interest.findIndex(area => area.id === payload);
      state.interest.splice(index, 1);
    }
  },
  actions: {
    setMapMode: (context, payload) => context.commit("setMapMode", payload),
    setIsCone: (context, payload) => context.commit("setIsCone", payload),
    setLocationLoading: (context, payload) =>
      context.commit("setLocationLoading", payload),
    resetMap: context => {
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
        .then(result => {
          const string = result.data.address.split(" ");
          context.commit("setMapAddress", `${string[1]} ${string[2]}`);
          context.commit("setToolbarTitle", `${string[1]} ${string[2]}`);
          // console.log('changeMapCenter', result.data)
          if (
            result.data.location &&
            result.data.location.subcity &&
            result.data.location.subcity.interest &&
            result.data.location.subcity.interest.subcity
          ) {
            context.commit("setIsInterest", true);
          } else {
            context.commit("setIsInterest", false);
          }
          // console.log(context.state);
          // context.commit("");
          // data.lat, longitude: data.lng
        })
        .catch(thrown => {
          if (Vue.prototype.$axios.isCancel(thrown)) {
            console.log("request canceled");
          }
        });
    },
    changeMapOptions: (context, data) => context.commit("setMapOptions", data),
    changeToolbarTitle: (context, data) =>
      context.commit("setToolbarTitle", data),
    addInterestLocation: context => {
      if (!context.state.isInterest) {
        Vue.prototype.$axios
          .post(
            `/sub_cities/interest/address/`,
            Vue.prototype.$qs.stringify({
              latitude: context.state.mapCenter.lat,
              longitude: context.state.mapCenter.lng
            })
          )
          .then(result => {
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
          .then(result => {
            context.commit("setIsInterest", false);
          });
      }
    },
    removeLocationInterest: (context, payload) => {
      Vue.prototype.$axios
        .delete(`redevelopment_areas/${payload}/interest/`)
        .then(result => {
          context.commit("removeLocationInterest", payload);
        });
    },
    fetchLocationInterest: async context => {
      try {
        const response = await Vue.prototype.$axios.get(
          `/redevelopment_areas/interests/`
        );
        context.commit("setInterest", response.data.results);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
