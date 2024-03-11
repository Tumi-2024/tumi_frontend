export const searchStore = {
  namespaced: true,
  state: {
    // 주택 유형
    categories: [
      "아파트",
      "연립다세대",
      "단독다가구",
      "오피스텔",
      "상업업무용",
      "토지",
      "무허가건축물",
      "입주권"
    ],

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
    /**
     *  기간
     */
    period: [],
    // 다중선택 Param
    isMultiSelect: false
  },
  getters: {
    categories: (_state) => {
      return _state.categories;
    },
    getCategoriesByKorean: (_state) => {
      const _kr = [
        {
          label: "아파트",
          value: "아파트"
        },
        {
          label: "연립다세대",
          value: "연립다세대"
        },
        {
          label: "단독다가구",
          value: "단독다가구"
        },
        {
          label: "오피스텔",
          value: "오피스텔"
        },
        {
          label: "상업|업무용",
          value: "상업업무용"
        },
        {
          label: "토지",
          value: "토지"
        },
        {
          label: "무허가건축물",
          value: "무허가건축물"
        },
        {
          label: "입주권",
          value: "입주권"
        }
      ];
      return _state.categories
        .map((item) => {
          const data = _kr.filter(({ value }) => value === item);
          return data.length > 0 ? data[0].label : null;
        })
        .filter((item) => item !== null);
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
    },
    period(_state) {
      return _state.period;
    }
  },
  mutations: {
    initialize: (_state) => {
      _state = {
        // 주택 유형
        // 다중선택 가능
        categories: ["아파트"],
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
        person: []
      };
    },
    setCategories: (_state, payload) => {
      _state.categories = payload;
    },
    removeCategories: (_state, payload) => {
      _state.categories = _state.categories.filter((obj) => obj !== payload);
    },
    setArea: (_state, payload) => {
      _state.area = payload;
    },
    setPrice: (_state, payload) => (_state.price = payload),
    setInitPrice: (_state, payload) => (_state.initPrice = payload),
    setIsMultiSelect: (_state, payload) => {
      _state.isMultiSelect = payload;
    },
    setPerson: (_state, payload) => (_state.person = payload),
    setPeriod: (_state, payload) => (_state.period = payload)
  },
  actions: {
    initialize: (context) => context.commit("initialize"),
    // addCategories: (context, data) => context.commit("addCategories", data),
    setCategories: (context, data) => context.commit("setCategories", data),
    removeCategories: (context, data) =>
      context.commit("removeCategories", data),

    setArea: (context, data) => context.commit("setArea", data),
    // setAreaType: (context, data) => context.commit("setAreaType", data),
    // setAreaPrice: (context, data) => context.commit("setAreaPrice", data),
    setPrice: (context, data) => context.commit("setPrice", data),
    setInitPrice: (context, data) => context.commit("setInitPrice", data),
    setPerson: (context, data) => context.commit("setPerson", data),
    setIsMultiSelect: (context, data) => {
      context.commit("setIsMultiSelect", data);
    },
    setPeriod: (context, data) => context.commit("setPeriod", data)
  }
};
