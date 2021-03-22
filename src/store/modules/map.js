// Import Section
import Vue from 'vue'

const initState = {
  mode: "default",
  mapZoom: 12,
  mapCenter: {
    lat: 37.5326,
    lng: 127.024612
  },
  mapAddress: '',
  mapOptions: {
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    scrollwheel: true,
    fullscreenControl: false,
    disableDefaultUI: true
  },
  toolbarTitle: "서울시 종로구",
  interest: [],
  isInterest: false
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
    getToolbarTitle: state => state.toolbarTitle
  },
  mutations: {
    setMapMode: (state, payload) => (state.mode = payload),
    setMapZoom: (state, payload) => (state.mapZoom = payload),
    setMapCenter: (state, payload) => (state.mapCenter = payload),
    setMapAddress: (state, payload) => (state.mapAddress = payload),
    setMapOptions: (state, payload) => (state.mapOptions = payload),
    setToolbarTitle: (state, payload) => (state.toolbarTitle = payload),
    setInterest: (state, payload) => (state.interest = payload),
    setIsInterest: (state, payload) => (state.isInterest = payload)
  },
  actions: {
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
      context.commit("setMapCenter", data)
      Vue.prototype.$axios.post(`/locations/find/`, Vue.prototype.$qs.stringify({ latitude: data.lat, longitude: data.lng })).then(result => {
        const string = result.data.address.split(' ');
        context.commit("setMapAddress", `${string[1]} ${string[2]}`)
        context.commit("setToolbarTitle", `${string[1]} ${string[2]}`)
        console.log(`${string[1]} ${string[2]}`);
        console.log(result.data.location);
        context.commit("setIsInterest", !!result.data.location.interest.location);
        console.log('context.state');
        // console.log(context.state);
        // context.commit("");
        // data.lat, longitude: data.lng
      })
    },
    changeMapOptions: (context, data) => context.commit("setMapOptions", data),
    changeToolbarTitle: (context, data) => context.commit("setToolbarTitle", data),
    addInterestLocation: (context) => {
      if (!context.state.isInterest) {
        Vue.prototype.$axios.post(`/locations/interest/address/`, Vue.prototype.$qs.stringify({
          latitude: context.state.mapCenter.lat,
          longitude: context.state.mapCenter.lng
        })).then(result => {
          context.commit("setInterest", context.state.interest.concat(result.data.location));
          context.commit("setIsInterest", true);
        })
      } else {
        Vue.prototype.$axios.post(`/locations/uninterest/address/`, Vue.prototype.$qs.stringify({
          latitude: context.state.mapCenter.lat,
          longitude: context.state.mapCenter.lng
        })).then(result => {
          context.commit("setIsInterest", false);
        })
      }
    },
    removeLocationInterest: (context, payload) => {
      Vue.prototype.$axios.delete(`locations/${payload}/interest/`).then(result => {
        console.log(context);
        context.dispatch('getLocationInterest');
        // context.commit("setIsInterest", false);
      })
    },
    getLocationInterest: async (context) => {
      const response = await Vue.prototype.$axios.get(
        `/locations/interests/`, {
          timeout: 10000
        })
      // console.log('vuex getLocationInterest');
      // console.log(response.data.results);
      context.commit("setInterest", response.data.results)
    }
  }
};
