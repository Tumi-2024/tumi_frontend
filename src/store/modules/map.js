// Import Section
import Vue from "vue";
import { estateStore } from "./estate";

const initState = {
  isMapLoaded: true,
  mode: "default",
  mapZoom: 12,
  mapCenter: {
    lat: 37.547,
    lng: 126.997
  },
  // mapAddress: "",
  mapOptions: {
    zoomControl: true,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    scrollwheel: true,
    fullscreenControl: false,
    disableDefaultUI: true,
    clickableIcons: false,
    minZoom: 12
  },
  toolbarTitle: "",
  toolbarLabel: "지금 보고있는 지역",
  interest: [],
  isInterest: false,
  locationLoading: false,
  areaType: "재개발",
  count: 0,
  redevId: 0,
  redevTitle: "",
  subcityId: 0,
  subcityTitle: "",
  prevPageLabel: ""
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
    getAreaType: (state) => state.areaType,
    myInterestArea: (state) => state.interest,
    getPrevPageLabel: (state) => state.prevPageLabel
  },
  mutations: {
    setMapMode: (state, payload) => (state.mode = payload),
    setRedevId: (state, payload) => (state.redevId = payload),
    setRedevTitle: (state, payload) => (state.redevTitle = payload),
    setMapZoom: (state, payload) => (state.mapZoom = payload),
    setMapCenter: (state, payload) => (state.mapCenter = payload),
    // setMapAddress: (state, payload) => (state.mapAddress = payload),
    setMapOptions: (state, payload) => (state.mapOptions = payload),
    setToolbarTitle: (state, payload) => {
      state.toolbarTitle = payload;
    },
    setToolbarLabel: (state, payload) => (state.toolbarLabel = payload),
    setCount: (state, payload) => (state.count = payload),
    setInterest: (state, payload) => {
      state.interest = payload;
    },
    setIsInterest: (state, payload) => (state.isInterest = payload),
    setLocationLoading: (state, payload) => (state.locationLoading = payload),
    setAreaType: (state, payload) => (state.areaType = payload),
    setSubcityId: (state, payload) => (state.subcityId = payload),
    setSubcityTitle: (state, payload) => (state.subcityTitle = payload),
    setPrevPageLabel: (state, payload) => (state.prevPageLabel = payload)
    // setIsCone: (state, payload) => (state.isCone = payload),
    // removeLocationInterest: (state, payload) => {
    //   const _state = state.interest.filter((obj) => obj.id !== payload);
    //   state.interest = _state;
    // }
  },
  actions: {
    setAreaType: (context, payload) => context.commit("setAreaType", payload),
    setSubcityId: (context, payload) => context.commit("setSubcityId", payload),
    setSubcityTitle: (context, payload) =>
      context.commit("setSubcityTitle", payload),
    setRedevId: (context, payload) => context.commit("setRedevId", payload),
    setRedevTitle: (context, payload) =>
      context.commit("setRedevTitle", payload),
    setMapCenter: (context, payload) => context.commit("setMapCenter", payload),
    setMapZoom: (context, payload) => context.commit("setMapZoom", payload),
    setMapMode: (context, payload) => context.commit("setMapMode", payload),
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
    setPrevPageLabel: (context, data) =>
      context.commit("setPrevPageLabel", data),
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
          context.commit("setSubcityId", result.data.subcity.id);
          context.commit("setSubcityTitle", result.data.subcity.title);

          context.commit("setRedevId", result.data.redevelopment_area.id);
          context.commit("setRedevTitle", result.data.redevelopment_area.title);

          context.commit(
            "setToolbarTitle",
            redevTitle || `${string[1]} ${string[2]}`
          );
          context.commit(
            "setToolbarLabel",
            redevTitle ? "지도상 인근 정비사업" : "지금 보고있는 지역"
          );
          // context.commit(
          //   "setCount",
          //   result.data.subcity.count_estates_filtered
          // );

          context.dispatch("changeEstateCount", result.data);

          if (result?.data?.location?.subcity?.interest?.subcity) {
            context.commit("setIsInterest", true);
          } else {
            context.commit("setIsInterest", false);
          }
        })
        .catch((thrown) => {
          // if (Vue.prototype.$axios.isCancel(thrown)) {
          // }
        });
    },
    changeEstateCount: (context, data) => {
      // console.log(
      //   "changeEstateCount",
      //   estateStore.state.simple_houses,
      //   context.state.subcityId
      // );
      const _arr = estateStore.state.simple_houses.filter(
        (obj) => obj.id === context.state.subcityId
      );
      if (Array.isArray(_arr) && _arr[0]?.count_estates_filtered > -1) {
        context.commit("setCount", _arr[0].count_estates_filtered);
      }
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
    removeLocationInterest: async (context, payload) => {
      try {
        await Vue.prototype.$axios.delete(
          `redevelopment_areas/${payload}/interest/`
        );
        context.commit(
          "setInterest",
          context.state.interest.filter((obj) => obj.id !== payload)
        );
      } catch (error) {}
    },
    fetchLocationInterest: async (context) => {
      try {
        const response = await Vue.prototype.$axios.get(
          `/redevelopment_areas/interests/`
        );
        context.commit("setInterest", response.data.results);
      } catch (error) {}
    }
  }
};
