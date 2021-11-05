// Main Section
import Vue from "vue";

export const estateStore = {
  state: {
    simple_houses: [],
    detail_houses: [],
    distinct_houses: [],
    interest_houses: [],
    current_house: {},
    recently_viewed_houses: [],
    count_estate: 0,
    simple_houses_type: "",
    viewRedevOnly: true,
    latitude: [],
    longitude: [],
    requestUrl: ""
  },
  getters: {
    simple_houses: (state, getters) => {
      return state.simple_houses;
    },
    detail_houses: (state, getters) => {
      return state.detail_houses;
    },
    distinct_houses: (state, getters) => {
      return state.distinct_houses;
    },
    recently_viewed_houses: (state, getters) => {
      return state.recently_viewed_houses;
    },
    interest_houses: (state, getters) => state.interest_houses,
    current_house: (state, getters) => {
      return state.current_house;
    }
  },
  mutations: {
    setSimpleHousesType: function(state, payload) {
      state.simple_houses_type = payload;
    },
    setSimpleHouses: function(state, payload) {
      state.simple_houses = payload;
    },
    setDetailHouses: function(state, payload) {
      state.detail_houses = payload;
    },
    setDistinctHouses: function(state, payload) {
      state.distinct_houses = payload;
    },
    setCountEstate: function(state, payload) {
      state.count_estate = payload;
    },
    setSelectedHouse: function(state, payload) {
      state.current_house = payload;
    },
    setRecentlyViewedHouses: function(state, payload) {
      state.recently_viewed_houses = payload;
    },
    setInterestHouses: function(state, payload) {
      state.interest_houses = payload;
    },
    addInterestHouse: function(state, payload) {
      state.current_house.interest.house = true
    },
    removeInterestHouse: function(state, payload) {
      state.current_house.interest.house = null;
    },
    removeInterestHouses: function(state, payload) {
      state.interest_houses = state.interest_houses.filter(house => !payload.some(id => id === house.id))
      console.log('removeInterestHouses', payload)
    },
    setLatitude: function(state, payload) {
      state.latitude = payload;
    },
    setLongitude: function(state, payload) {
      state.longitude = payload;
    },
    setRequestUrl: function(state, payload) {
      state.requestUrl = payload;
    }
  },
  actions: {
    setViewRedevOnly: (context, parameter) => {
      context.commit("setViewRedevOnly");
    },
    getSimpleHouses: async function(context, payload) {
      const statusQuery = "redevelopment_area__status=운영";
      const redevelopQuery = context.getters["map/getIsCone"]
        ? statusQuery
        : "" +
          `redevelopment_area__isnull=${!context.getters["map/getIsCone"]}`;
      const getQueryString = context.getters["searchQuery/getQueryString"];
      const query =
        getQueryString("categories", "type_house__in", "valueHouse") +
        "&" +
        redevelopQuery;
      const encodedUrl = encodeURI(query);
      if (payload.latitude) {
        await context.commit("setLatitude", payload.latitude);
        await context.commit("setLongitude", payload.longitude);
      }
      const lat = context.state.latitude;
      const long = context.state.longitude;
      const rangeQuery = `latitude__range=${lat[0]},${lat[1]}&longitude__range=${long[0]},${long[1]}&${encodedUrl}`;
      switch (payload.type) {
        case "city":
          await context.commit("setRequestUrl", "cities");
          break;
        case "subcity":
          await context.commit("setRequestUrl", "sub_cities");
          break;
        case "locations":
          await context.commit("setRequestUrl", "locations");
          break;
        case "transaction_groups":
          await context.commit("setRequestUrl", "transaction_groups");
          break;
        case "houses":
          await context.commit("setRequestUrl", "houses");
          break;
        // default:
        //   await context.commit("setRequestUrl", context.state.requestUrl)
      }

      const data = await Vue.prototype.$axios.get(
        `/${context.state.requestUrl}/?${rangeQuery}`
      );
      // if (payload.query) {
      //   data = await Vue.prototype.$axios.get(
      //     `/${requestUrl}/?page_size=1000&${payload.query}`,
      //     { timeout: 10000 }
      //   );
      // } else {

      // }
      context.dispatch("map/setLocationLoading", true);
      context.commit(
        "setSimpleHouses",
        data.data.results.map(item => ({
          ...item,
          position: {
            lat: Number(item.latitude),
            lng: Number(item.longitude)
          }
        }))
      );
      context.commit("setSimpleHousesType", payload.type);
    },
    getDistinctHouses: async function(context, paramter) {
      const response = await Vue.prototype.$axios.get(
        `/houses/distinct${paramter ? `?${paramter}` : ""}`,
        {
          timeout: 100000
        }
      );
      const results = response.data.apartments.map(item => ({
        ...item,
        position: {
          lat: Number(item.latitude),
          lng: Number(item.longitude)
        }
      }));
      context.commit("setDistinctHouses", results);
      context.commit("setCountEstate", response.data.houses_count);
    },
    getDetailHouses: async function(context, paramter) {
      const response = await Vue.prototype.$axios.get(
        `/houses/${paramter ? `?${paramter}` : ""}`,
        {
          timeout: 10000
        }
      );
      const results = response.data.results.map(item => ({
        ...item,
        position: {
          lat: Number(item.latitude),
          lng: Number(item.longitude)
        }
      }));
      context.commit("setCountEstate", response.data.count);
      context.commit("setDetailHouses", results);
    },
    getInterestHouses: async function(context, paramter) {
      const response = await Vue.prototype.$axios.get(`/houses/interests/`);
      const results = response.data.results.map(item => ({
        ...item,
        position: {
          lat: Number(item.latitude),
          lng: Number(item.longitude)
        }
      }));
      context.commit("setInterestHouses", results);
    },
    getContactHouses: async function(context, paramter) {
      const response = await Vue.prototype.$axios.get(`/houses/contacts/`, {
        timeout: 10000
      });
      const results = response.data.results.map(item => ({
        ...item,
        position: {
          lat: Number(item.latitude),
          lng: Number(item.longitude)
        }
      }));
      context.commit("setDetailHouses", results);
    },
    addRecentlyViewedHouse: (context, parameter) => {
      context.commit("setSelectedHouse", parameter);
      if (
        context.state.recently_viewed_houses.some(
          house => house.id === parameter.id
        )
      ) {
        return;
      }
      Vue.prototype.$axios
        .post(`/houses/${parameter.id}/recent/`)
        .then(result => {
          context.commit(
            "setRecentlyViewedHouses",
            context.state.recently_viewed_houses.concat(result.data.house)
          );
        });
    },
    toggleInterestHouse: (context, parameter) => {
      const house = context.state.current_house;
      if (house.interest.house) {
        Vue.prototype.$axios
          .delete(`/houses/${house.id}/interest/`)
          .then(() => {
            context.commit("removeInterestHouse", house);
          });
        return;
      }
      Vue.prototype.$axios
        .post(`/houses/${house.id}/interest/`)
        .then(result => {
          context.commit("addInterestHouse", result.data.house);
        });
    },
    deleteInterestHouses: async (context, parameter) => {
      await Vue.prototype.$axios.post('interests/delete/', { houses: parameter })
      context.commit('removeInterestHouses', parameter)
    },
    getRecentlyViewedHouses: async (context, parameter) => {
      const {
        data,
        status
      } = await Vue.prototype.$axios.get(
        `houses/recents/?ordering=${parameter}`,
        { timeout: 60000 }
      );
      if (status !== 200) return;
      context.commit("setRecentlyViewedHouses", data.results);
    },
    filterHousesType: (context, parameter) => {}
  }
};
