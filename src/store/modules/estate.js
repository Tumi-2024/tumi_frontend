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
    // simple_houses_type: "",
    viewRedevOnly: true,
    latitude: [],
    longitude: [],
    requestUrl: "sub_cities"
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
    currentHouse: (state, getters) => {
      return state.current_house.interest;
    }
  },
  mutations: {
    // setSimpleHousesType: function (state, payload) {
    //   state.simple_houses_type = payload;
    // },
    setSimpleHouses: function (state, payload) {
      state.simple_houses = payload;
    },
    setDetailHouses: function (state, payload) {
      state.detail_houses = payload;
    },
    setDistinctHouses: function (state, payload) {
      state.distinct_houses = payload;
    },
    setCountEstate: function (state, payload) {
      state.count_estate = payload;
    },
    setSelectedHouse: function (state, payload) {
      state.current_house = payload;
    },
    setRecentlyViewedHouses: function (state, payload) {
      state.recently_viewed_houses = payload;
    },
    setInterestHouses: function (state, payload) {
      state.interest_houses = payload;
    },
    addInterestHouse: function (state, payload) {
      state.current_house.interest = payload;
    },
    removeInterestHouse: function (state, payload) {
      state.current_house.interest = null;
    },
    removeInterestHouses: function (state, payload) {
      state.interest_houses = state.interest_houses.filter(
        (house) => !payload.some((id) => id === house.id)
      );
    },
    setLatitude: function (state, payload) {
      state.latitude = payload;
    },
    setLongitude: function (state, payload) {
      state.longitude = payload;
    },
    setRequestUrl: function (state, payload) {
      state.requestUrl = payload;
    }
  },
  actions: {
    setViewRedevOnly: (context, parameter) => {
      context.commit("setViewRedevOnly");
    },
    initSimpleHouses: (context, parameter) => {
      context.commit("setSimpleHouses", []);
    },
    getSimpleHouses: async function (context, payload) {
      context.commit("setSimpleHouses", []);

      const getQueryString2 = context.getters["searchQuery/getQueryString2"];

      const users = getQueryString2("users", "");

      const areaNew = context.getters["queryBuilder/area"];
      const priceNew = context.getters["queryBuilder/price"];
      const ctgrNew = context.getters["queryBuilder/getCategoriesByKorean"];

      const getQueryArray = (keyname, params) => {
        const hasValue = params.every((value) => !!value);
        if (hasValue) {
          return { [keyname]: params };
        } else {
          return {};
        }
      };

      // const query = Vue.prototype.$qs.stringify(
      //   {
      //     type_house__in: ctgrNew,
      //     ...getQueryArray("price_selling_hope__range", [
      //       priceNew.min,
      //       priceNew.max
      //     ]),
      //     ...getQueryArray(
      //       [`${areaNew.value}__range`],
      //       [areaNew.min, areaNew.max]
      //     ),
      //     user__in: users.length === 0 ? undefined : users
      //   },
      //   { arrayFormat: "comma" }
      // );

      // const encodedUrl = query + "&" + redevelopQuery;
      if (payload?.latitude) {
        await context.commit("setLatitude", payload.latitude);
        await context.commit("setLongitude", payload.longitude);
      }
      const lat = context.state.latitude;
      const long = context.state.longitude;

      if (payload?.type) {
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
          default:
            await context.commit("setRequestUrl", "houses");
        }
      } else {
        await context.commit("setRequestUrl", context.state.requestUrl);
      }

      const getRedevQuery = () => {
        if (context.getters["map/getIsCone"]) {
          // return { redevelopment_area__status: "운영" };
          return {};
        } else {
          return { redevelopment_area__isnull: true };
        }
      };

      const getTypeHouseIn = () => {
        const _ctgr = ctgrNew.join(",");
        if (_ctgr.length === 0) {
          return null;
        }
        return { type_house__in: _ctgr };
      };

      const data = await Vue.prototype.$axios.get(
        `/${context.state.requestUrl}/`,
        {
          params: {
            latitude__range: `${lat[0]},${lat[1]}`,
            longitude__range: `${long[0]},${long[1]}`,
            page_size: 1000,
            ...getTypeHouseIn(),
            ...getQueryArray("price_selling_hope__range", [
              priceNew.min,
              priceNew.max
            ]),
            ...getQueryArray(
              [`${areaNew.value}__range`],
              [areaNew.min, areaNew.max]
            ),
            user__in: users.length === 0 ? undefined : users,
            ...getRedevQuery()
          }
        }
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
        data.data.results
          .reduce((acc, cur) => {
            const hasValue = acc.some(() => {
              return (
                cur.latitude === acc.latitude && cur.longitude === acc.longitude
              );
            });
            if (!hasValue) {
              return [...acc, cur];
            } else {
              return acc;
            }
          }, [])
          .map((item) => ({
            ...item,
            position: {
              lat: Number(item.latitude),
              lng: Number(item.longitude)
            }
          }))
      );
      // context.commit("setSimpleHousesType", payload?.type);
    },
    getDistinctHouses: async function (context, paramter) {
      const response = await Vue.prototype.$axios.get(
        `/houses/distinct${paramter ? `?${paramter}` : ""}`,
        {
          timeout: 100000
        }
      );
      const results = response.data.apartments.map((item) => ({
        ...item,
        position: {
          lat: Number(item.latitude),
          lng: Number(item.longitude)
        }
      }));
      context.commit("setDistinctHouses", results);
      context.commit("setCountEstate", response.data.houses_count);
    },
    getDetailHouses: async function (context, paramter) {
      const response = await Vue.prototype.$axios.get(
        `/houses/${paramter ? `?${paramter}` : ""}`,
        {
          timeout: 10000
        }
      );
      const results = response.data.results.map((item) => ({
        ...item,
        position: {
          lat: Number(item.latitude),
          lng: Number(item.longitude)
        }
      }));
      context.commit("setCountEstate", response.data.count);
      context.commit("setDetailHouses", results);
    },
    getInterestHouses: async function (context, paramter) {
      const response = await Vue.prototype.$axios.get(`/houses/interests/`);
      const results = response.data.results.map((item) => ({
        ...item,
        position: {
          lat: Number(item.latitude),
          lng: Number(item.longitude)
        }
      }));
      context.commit("setInterestHouses", results);
    },
    getContactHouses: async function (context, paramter) {
      const response = await Vue.prototype.$axios.get(`/houses/contacts/`, {
        timeout: 10000
      });
      const results = response.data.results.map((item) => ({
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
          (house) => house.id === parameter.id
        )
      ) {
        return;
      }
      Vue.prototype.$axios
        .post(`/houses/${parameter.id}/recent/`)
        .then((result) => {
          context.commit(
            "setRecentlyViewedHouses",
            context.state.recently_viewed_houses.concat(result.data.house)
          );
        });
    },
    toggleInterestHouse: (context, parameter) => {
      const house = context.state.current_house;
      if (house.interest) {
        Vue.prototype.$axios
          .delete(`/houses/${house.id}/interest/`)
          .then(() => {
            context.commit("removeInterestHouse", house);
          });
      } else {
        Vue.prototype.$axios
          .post(`/houses/${house.id}/interest/`)
          .then((result) => {
            context.commit("addInterestHouse", result.data.house);
          });
      }
    },
    deleteInterestHouses: async (context, parameter) => {
      await Vue.prototype.$axios.post("interests/delete/", {
        houses: parameter
      });
      context.commit("removeInterestHouses", parameter);
    },
    getRecentlyViewedHouses: async (context, parameter) => {
      const { data, status } = await Vue.prototype.$axios.get(
        `houses/recents/`,
        { timeout: 60000 }
      );
      if (status !== 200) return;
      context.commit("setRecentlyViewedHouses", data.results);
    },
    filterHousesType: (context, parameter) => {}
  }
};
