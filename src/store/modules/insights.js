// Main Section
import Vue from "vue";

export const insightsStore = {
  state: {
    estateResponse: {},
    estateResults: [],
    policyResponse: {},
    policyResults: [],
    marketResponse: {},
    marketResults: []
  },
  getters: {
    estateInsights: (state, getters) => {
      return state.estateResults;
    },
    policyInsights: (state, getters) => {
      return state.policyResults;
    },
    marketInsights: (state, getters) => {
      return state.marketResults;
    },
    allInsights: (state) => {
      return state.estateResults.concat(
        state.policyResults,
        state.marketResults
      );
    }
  },
  mutations: {
    setEstateResponse: function (state, payload) {
      state.estateResponse = payload;
      state.estateResults = state.estateResults.concat(payload.results);
    },
    setPolicyResponse: function (state, payload) {
      state.policyResponse = payload;
      state.policyResults = state.policyResults.concat(payload.results);
    },
    setMarketResponse: function (state, payload) {
      state.marketResponse = payload;
      state.marketResults = state.marketResults.concat(payload.results);
    }
  },
  actions: {
    getEstate: async function (context) {
      const { data } = await Vue.prototype.$axios.get(
        "/insights/"
      );
      context.commit("setEstateResponse", data);
    },
    getPolicy: async function (context) {
      const { data } = await Vue.prototype.$axios.get(
        "/insights/"
      );
      context.commit("setPolicyResponse", data);
    },
    getMarket: async function (context) {
      const { data } = await Vue.prototype.$axios.get(
        "/insights/"
      );
      context.commit("setMarketResponse", data);
    }
  }
};
