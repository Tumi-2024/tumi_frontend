// Main Section
const initState = {
  query: {
    categories: [
      {
        icon: require("assets/iconsNew/11.png"),
        label: "아파트",
        valueTransaction: "APARTMENT",
        valueHouse: "아파트"
      },
      {
        icon: require("assets/iconsNew/12.png"),
        label: "연립/다세대",
        valueTransaction: "ALLIANCE",
        valueHouse: "연립ￜ다세대"
      },
      {
        icon: require("assets/iconsNew/13.png"),
        label: "단독/다가구",
        valueTransaction: "SINGLE",
        valueHouse: "단독ￜ다가구"
      },
      {
        icon: require("assets/iconsNew/14.png"),
        label: "원룸/오피스텔",
        valueTransaction: "OFFICETEL",
        valueHouse: "오피스텔"
      },
      {
        icon: require("assets/iconsNew/16.png"),
        label: "상업업무용",
        valueTransaction: "COMMERCIAL",
        valueHouse: "상업ￜ업무용"
      },
      {
        icon: require("assets/iconsNew/15.png"),
        label: "토지",
        valueTransaction: "LAND",
        valueHouse: "토지"
      },
      {
        icon: require("assets/iconsNew/17.png"),
        label: "무허가 건축물",
        valueTransaction: "noname01",
        valueHouse: "무허가 건축물"
      },
      {
        icon: require("assets/iconsNew/18.png"),
        label: "입주권",
        valueTransaction: "noname02",
        valueHouse: "입주권"
      }
    ]
  }
};
export const searchQueryStore = {
  namespaced: true,
  state: {
    query: {
      categories: [
        {
          icon: require("assets/iconsNew/11.png"),
          label: "아파트",
          valueTransaction: "APARTMENT",
          valueHouse: "아파트"
        },
        {
          icon: require("assets/iconsNew/12.png"),
          label: "연립/다세대",
          valueTransaction: "ALLIANCE",
          valueHouse: "연립ￜ다세대"
        },
        {
          icon: require("assets/iconsNew/13.png"),
          label: "단독/다가구",
          valueTransaction: "SINGLE",
          valueHouse: "단독ￜ다가구"
        },
        {
          icon: require("assets/iconsNew/14.png"),
          label: "원룸/오피스텔",
          valueTransaction: "OFFICETEL",
          valueHouse: "오피스텔"
        },
        {
          icon: require("assets/iconsNew/16.png"),
          label: "상업업무용",
          valueTransaction: "COMMERCIAL",
          valueHouse: "상업ￜ업무용"
        },
        {
          icon: require("assets/iconsNew/15.png"),
          label: "토지",
          valueTransaction: "LAND",
          valueHouse: "토지"
        },
        {
          icon: require("assets/iconsNew/17.png"),
          label: "무허가 건축물",
          valueTransaction: "noname01",
          valueHouse: "무허가 건축물"
        },
        {
          icon: require("assets/iconsNew/18.png"),
          label: "입주권",
          valueTransaction: "noname02",
          valueHouse: "입주권"
        }
      ]
    }
  },
  getters: {
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
      // const test = state.query.reduce((acc, curr) => {
      //   const keyName = Object.keys(curr)[0];
      //   return acc + `${keyName}=${curr[keyName]}`;
      // }, "");
      // return `${test}`;
    },
    getQuery: (state, getters) => key => {
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
    INIT_QUERY: state => {
      state = initState;
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
