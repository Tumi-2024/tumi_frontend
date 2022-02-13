// Main Section
const initState = {
  query: {
    categories: [{
      icon: require("assets/iconsNew/11.png"),
      label: "아파트",
      valueTransaction: "APARTMENT",
      valueHouse: "아파트"
    }],
    prices: [
      { label: "최저가", value: 0 },
      { label: "최고가", key: "max", value: 999999 }

    ],
    areaType: [{
      label: "전용면적",
      value: "size_dedicated_area_m2",
      type: ["아파트", "연립/다세대", "원룸/오피스텔", "상업업무용", "입주권"]
    }],
    areas: [
      { label: '최소면적', value: 0 },
      { label: '최대면적', value: 100000 }
    ]
  }
};
export const searchQueryStore = {
  namespaced: true,
  state: {
    query: {
      categories: [{
        icon: require("assets/iconsNew/11.png"),
        label: "아파트",
        valueTransaction: "APARTMENT",
        valueHouse: "아파트"
      }],
      prices: [
        { label: "최저가", key: "min", value: 10000 },
        { label: "최고가", key: "max", value: 999999 }
      ],
      areaType: { label: "전용면적", value: "size_dedicated_area_m2" },
      areas: [
        { label: '최소면적', value: 0 },
        { label: '최대면적', value: 100000 }
      ]
    }
  },
  getters: {
    getQueryString2: (state, getters) => {
      return (key, contentKey) => {
        let query = ''
        if (Array.isArray(state.query[key])) {
          query = state.query[key].map(obj => {
            return obj[contentKey]
          })
        } else {
          query = state.query[key][contentKey];
        }
        return query;
      };
    },
    getQueryString: (state, getters) => {
      return (key, altkey, contentKey) => {
        // https://admin.tumi.sunwook.com/api/houses/?type_house__in=아파트,연립ￜ다세대
        const query = state.query[key]
          .map(obj => {
            return obj[contentKey];
          })
          .join(",");
        if (state.query[key].length) {
          return `${altkey || key}=${query}`;
        }
        return "";
      };
    },
    getOption: (state, getters) => key => {
      return state.query[key];
    }
  },
  mutations: {
    SET_QUERY: (state, { key, data }) => {
      const keyObj = state.query[key];
      if (keyObj) {
        state.query[key] = data;
      } else {
        state.query[key].push(data);
      }
    },
    INIT_QUERY: (state, getters) => {
      state.query[getters] = initState.query[getters];
    }
  },
  actions: {
    setQuery: (context, data) => {
      context.commit("SET_QUERY", data);
      context.dispatch("getSimpleHouses", {}, { root: true });
    },
    initializeQuery: (context, data) => {
      context.commit("INIT_QUERY", data);
      return initState.query[data];
    }
  }
};
