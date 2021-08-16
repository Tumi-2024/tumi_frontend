// Main Section
export const searchQueryStore = {
  namespaced: true,
  state: {
    query: [{ categories: "APARTMENT" }]
  },
  getters: {
    getQueryString: (state, getters) => {
      const test = state.query.reduce((acc, curr) => {
        const keyName = Object.keys(curr)[0];
        return acc + `${keyName}=${curr[keyName]}`;
      }, "");
      console.log(test);
      return ``;
      // return `${test}`;
    },
    getQuery: (state, getters) => key => {
      const obj = state.query.find(obj => Object.keys(obj)[0] === key);
      if (obj) {
        return Object.values(obj)[0];
      } else {
        return undefined;
      }
    }
  },
  mutations: {
    SET_QUERY: (state, payload) => {
      const keyName = Object.keys(payload)[0];
      const keyObj = state.query.find(obj => Object.keys(obj)[0] === keyName);
      if (keyObj) {
        keyObj[keyName] = payload[keyName];
      } else {
        state.query.push(payload);
      }
    }
  },
  actions: {
    setQuery: (context, data) => context.commit("SET_QUERY", data)
  }
};
