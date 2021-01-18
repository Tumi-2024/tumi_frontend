export const mapStore = {
  namespaced: true,
  state: {
    mode: "default",
    mapZoom: 12,
    mapCenter: { lat: 37.5326, lng: 127.024612 },
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
  },
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
      context.commit("setMapMode", "default");
      context.commit("setMapZoom", 12);
      context.commit("setMapCenter", { lat: 37.5326, lng: 127.024612 });
      context.commit("setMapOptions", {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        scrollwheel: true,
        fullscreenControl: false,
        disableDefaultUI: true
      });
    },
    changeMapMode: (context, data) => context.commit("setMapMode", data),
    changeMapZoom: (context, data) => context.commit("setMapZoom", data),
    changeMapCenter: (context, data) => context.commit("setMapCenter", data),
    changeMapOptions: (context, data) => context.commit("setMapOptions", data)
  }
};
