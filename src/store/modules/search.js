// Import Section
// import Vue from 'vue'

// Main Section
export const searchStore = {
  state: {
    typeSale: '전체',
    typeHouse: '아파트',
    typeHouseDetail: '전체',
    area: '10평대',
    salePrice: {
      text: '전체',
      min: 0,
      max: 0
    },
    depositPrice: {
      text: '전체',
      min: 0,
      max: 0
    },
    monthlyRentPrice: {
      text: '전체',
      min: 0,
      max: 0
    }
  },
  getters: {
    search: (state, getters) => {
      return state
    }
  },
  mutations: {
    SET_TYPE_SALE: (state, payload) => (state.typeSale = payload),
    SET_TYPE_HOUSE: (state, payload) => (state.typeHouse = payload),
    SET_TYPE_HOUSE_DETAIL: (state, payload) => (state.typeHouseDetail = payload),
    SET_AREA: (state, payload) => (state.area = payload),
    SET_SALE_PRICE: (state, payload) => (state.salePrice = payload),
    SET_DEPOSIT_PRICE: (state, payload) => (state.depositPrice = payload),
    SET_MONTHLY_RENT_PRICE: (state, payload) => (state.monthlyRentPrice = payload),
    INITIALIZE: (state) => {
      state = {
        typeSale: '전체',
        typeHouse: '아파트',
        typeHouseDetail: '전체',
        area: '10평대',
        salePrice: {
          text: '전체',
          min: 0,
          max: 0
        },
        depositPrice: {
          text: '전체',
          min: 0,
          max: 0
        },
        monthlyRentPrice: {
          text: '전체',
          min: 0,
          max: 0
        }
      }
    }
  },
  actions: {
    setTypeSale: (context, data) => context.commit("SET_TYPE_SALE", data),
    setTypeHouse: (context, data) => context.commit("SET_TYPE_HOUSE", data),
    setTypeHouseDetail: (context, data) => context.commit("SET_TYPE_HOUSE_DETAIL", data),
    setArea: (context, data) => context.commit("SET_AREA", data),
    setSalePrice: (context, data) => context.commit("SET_SALE_PRICE", data),
    setDepositPrice: (context, data) => context.commit("SET_DEPOSIT_PRICE", data),
    setMonthlyRentPrice: (context, data) => context.commit("SET_MONTHLY_RENT_PRICE", data),
    initialize: (context) => context.commit("INITIALIZE")
  }
}