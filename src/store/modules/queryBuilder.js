// Import Section
const initState = {
  // 주택 유형
  // 다중선택 가능
  categories: {
    value: []
  },
  // 전용면적
  // 무조건 1종류와 min, max
  area: {
    value: [],
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
  person: {
    value: []
  }
};

// Main Section
export const searchStore = {
  namespaced: true,
  state: {
    // 주택 유형
    // 다중선택 가능
    categories: {
      value: []
    },
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
    person: {
      value: []
    }
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
    }
  },
  mutations: {
    initialize: (_state) => {
      _state = initState;
    },
    setCategories: (_state, payload) => {
      _state.categories = payload;
    },
    setAreaType: (_state, payload) => {
      _state.area.value = payload;
    },
    setAreaPrice: (_state, payload) => {
      _state.area.min = payload.min;
      _state.area.max = payload.max;
    },
    setPrice: () => (_state, payload) => (_state.price = payload),
    setInitPrice: () => (_state, payload) => (_state.initPrice = payload)
  },
  actions: {
    initialize: (context) => context.commit("initialize"),
    setPrice: (context, data) => context.commit("setPrice", data)
  }
};
