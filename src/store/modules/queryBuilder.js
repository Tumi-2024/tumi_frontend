export const queryBuilderStore = {
  namespaced: true,
  state: {
    // 주택 유형
    // 다중선택 가능
    categories: ["APARTMENT"],

    // 전용면적
    // 무조건 1종류와 min, max
    area: {
      value: undefined,
      min: undefined,
      max: undefined
    },
    /**
     * 주택 가격
     */
    price: {
      min: undefined,
      max: undefined
    },
    /**
     * 초기 투자금
     */
    initPrice: {
      min: undefined,
      max: undefined
    },
    /**
     * 담당자 ID
     */
    person: [],
    isMultiSelect: false
  },
  getters: {
    categories: (_state) => {
      return _state.categories;
    },
    area: (_state) => {
      return _state.area;
    },
    price: (_state) => {
      return _state.price;
    },
    initPrice: (_state) => {
      return _state.initPrice;
    },
    person: (_state) => {
      return _state.person;
    },
    isMultiSelect: (_state) => {
      return _state.isMultiSelect;
    }
  },
  mutations: {
    initialize: (_state) => {
      _state = {
        // 주택 유형
        // 다중선택 가능
        categories: ["APARTMENT"],
        area: {
          value: undefined,
          min: undefined,
          max: undefined
        },
        price: {
          min: undefined,
          max: undefined
        },
        initPrice: {
          min: undefined,
          max: undefined
        },
        person: [],
        isMultiSelect: false
      };
    },
    addCategories: (_state, payload) => {
      if (_state.isMultiSelect) {
        _state.categories.push(payload);
      } else {
        _state.categories = [payload];
      }
    },
    removeCategories: (_state, payload) => {
      _state.categories = _state.categories.filter((obj) => obj !== payload);
    },
    setAreaType: (_state, payload) => {
      _state.area = payload;
    },
    setAreaPrice: (_state, payload) => {
      _state.area.min = payload.min;
      _state.area.max = payload.max;
    },
    setPrice: (_state, payload) => (_state.price = payload),
    setInitPrice: (_state, payload) => (_state.initPrice = payload),
    setIsMultiSelect: (_state, payload) => {
      _state.isMultiSelect = payload;
    }
  },
  actions: {
    initialize: (context) => context.commit("initialize"),
    addCategories: (context, data) => context.commit("addCategories", data),
    removeCategories: (context, data) =>
      context.commit("removeCategories", data),
    setAreaType: (context, data) => context.commit("setAreaType", data),
    setAreaPrice: (context, data) => context.commit("setAreaPrice", data),
    setPrice: (context, data) => context.commit("setPrice", data),
    setInitPrice: (context, data) => context.commit("setInitPrice", data),
    setIsMultiSelect: (context, data) => {
      console.log(data);
      context.commit("setIsMultiSelect", data);
    }
  }
};
