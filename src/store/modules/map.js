export const mapStore = {
  namespaced: true,
  state: {
    mode: "default"
  },
  getters: {
    getMapCity: state => {
      return state.mode;
    }
  },
  mutations: {
    setMapMode: function(state, payload) {
      state.data = payload;
    }
  },
  actions: {
    changeMapMode(context, data) {
      context.commit("setMapMode", data);
    }
  }
};
