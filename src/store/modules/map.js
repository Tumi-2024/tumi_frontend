const initState = {
  mode: "default",
  mapZoom: 12,
  mapCenter: {
    lat: 37.5326,
    lng: 127.024612
  },
  mapOptions: {
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    scrollwheel: true,
    fullscreenControl: false,
    disableDefaultUI: true
  }
};
export const mapStore = {
  namespaced: true,
  state: { ...initState },
  getters: {
    getMapMode: state => state.mode,
    getMapZoom: state => state.mapZoom,
    getMapCenter: state => state.mapCenter,
    getMapOptions: state => state.mapOptions
  },
  mutations: {
    setMapMode: (state, payload) => (state.mode = payload),
    setMapZoom: (state, payload) => (state.mapZoom = payload),
    setMapCenter: (state, payload) => (state.mapCenter = payload),
    setMapOptions: (state, payload) => (state.mapOptions = payload)
  },
  actions: {
    resetMap: context => {
      context.commit("setMapMode", initState.mode);
      context.commit("setMapZoom", initState.mapZoom);
      context.commit("setMapCenter", initState.mapCenter);
      context.commit("setMapOptions", initState.mapOptions);
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
    changeMapCenter: (context, data) => context.commit("setMapCenter", data),
    changeMapOptions: (context, data) => context.commit("setMapOptions", data)
  }
};
