<template>
  <q-card flat class="q-mt-sm">
    <q-card-section class="nanum-square">
      전체 실거래가
      <span class="text-primary">{{ getNumberWithCommas(estateCount) }} </span
      >개
    </q-card-section>

    <q-card-section
      class="sort-section row bg-positive q-pa-none notosanskr-regular"
    >
      <toolbar-filter
        class="q-pt-xs q-px-sm"
        @focus="onFocus"
        @search="onSearch"
        @changeFilter="changeFilter"
      />
    </q-card-section>

    <q-card-section class="list-items q-pa-none notosanskr-regular">
      <div style="display: flex; gap: 2px" class="q-pa-sm">
        <Badge value="주택유형" houseType />
        <Badge value="전용면적" label="전용면적" area />
        <Badge value="매매가" label="매매가" price />
        <Badge value="거래일자" label="거래일자" date />
      </div>
      <q-separator />
      <q-list class="q-pt-md">
        <template v-for="(item, i) of saleList">
          <area-transaction
            v-if="item.latitude"
            :key="i"
            :item="item"
            v-bind="{
              ctgr: item.category,
              type: item.type,
              isRedevelop: true
            }"
          ></area-transaction>
        </template>
      </q-list>
    </q-card-section>
    <div
      v-infinite-scroll="infiniteHandler"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    ></div>
  </q-card>
</template>

<script>
import Vue from "vue";
import AreaTransaction from "./AreaItemTransaction.vue";
import ToolbarFilter from "./ToolbarFilter.vue";
import infiniteScroll from "vue-infinite-scroll";

import { mapGetters, mapActions } from "vuex";
import Badge from "../Utilities/Badges/Badge.vue";

export default {
  directives: {
    infiniteScroll
  },
  components: {
    "area-transaction": AreaTransaction,
    "toolbar-filter": ToolbarFilter,
    Badge
  },
  data() {
    return {
      tab: "지역",
      prevSearch: "",
      selectedIndex: 0,
      saleList: [],
      currentItem: {},
      page: 1,
      busy: false,
      params: {}
    };
  },
  computed: {
    ...mapGetters("map", ["getMapMode"]),
    ...mapGetters(["simple_houses", "estateCount"]),
    ...mapGetters("search", [
      "area",
      "price",
      "houseType",
      "date",
      "getCategoriesByKorean"
    ]),
    getNumberWithCommas() {
      return (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
    }
  },
  methods: {
    ...mapActions(["setCountEstate", "setRequestUrl"]),
    onFocus(e) {
      // this.getApiTransaction();
    },
    changeFilter(params) {
      this.params = params
      this.infiniteHandler(params, 1);
    },
    infiniteHandler(params, pageNumber) {
      if (pageNumber) {
        this.page = pageNumber;
      }
      this.setRequestUrl("transactions");
      const getQueryArray = (keyName, params) => {
        if (keyName === "type_house__in" && params?.length === 8) {
          return {};
        }
        if (keyName === "_categories" && params?.length === 8) {
          return {};
        }
        if (Array.isArray(params)) {
          const hasValue = params.every((value) => value !== undefined);
          if (!hasValue || params.length === 0) return {};
          return {
            [keyName]: params.join(",")
          };
        }
        if (!params) return {};
        return {
          [keyName]: params
        };
      };
      // Transaction API 만들기
      const Dquery = {
        ...getQueryArray(
          "_categories",
          this.getCategoriesByKorean.filter(obj => obj !== '무허가 건축물' && obj !== '입주권')
            .join(",")
            .replace("토지", "LAND")
            .replace("오피스텔", "OFFICETEL")
            .replace("연립ￜ다세대", "ALLIANCE")
            .replace("아파트", "APARTMENT")
            .replace("상업ￜ업무용", "COMMERCIAL")
            .replace("단독ￜ다가구", "SINGLE")
            .split(",")
        ),
        ...params
      };

      const { query } = this.$route;
      const _key = Object.keys(query)[0];
      this.busy = true;
      if (pageNumber === 1) {
        this.getApiTransaction({ ...Dquery, ...query, ...this.params }, this.page);
        return;
      }
      switch (_key) {
        case "search":
          this.getSearchData({ ...Dquery, ...query, ...this.params }, this.page);
          break;
        case "redevelopment_area":
          this.getRedevData({ ...Dquery, ...query, ...this.params }, this.page);
          break;
        case "location":
          this.getLocationData({ ...Dquery, ...query, ...this.params }, this.page);
          break;
        default:
          this.loadMoreApiTransaction(
            { ...Dquery, ...query, ...this.params },
            undefined,
            this.page
          );
      }
    },
    async onSearch(type, id, label) {
      const { query } = this.$route;
      if (id?.length === 0) {
        return;
      }
      if (!type && !id && !label) {
        this.page = 1;
        if (Object.keys(query).length !== 0) {
          this.$router.replace({
            name: "listTransactions"
          });
        }
        this.getApiTransaction({}, undefined, this.page);
        return;
      }

      switch (type) {
        case "지역":
          this.setLocationQuery(id, label, this.page);
          break;
        case "정비사업":
          this.setRedevQuery(id, label, this.page);
          break;
        case "건물/단지":
          this.setSearchQuery(id, label, this.page);
          break;
        default:
          this.getApiTransaction(id, label, this.page);
      }
    },

    async getSearchData(params, page) {
      const { data } = await Vue.prototype.$axios.get(`/transactions/`, {
        params
      });
      if (!!params.title && this.prevSearch === params.title) {
        this.saleList = [
          ...data.results,
          ...this.saleList
        ];
      } else {
        this.saleList = data.results.map((item) => {
          return {
            ...item
          };
        });
      }
      this.prevSearch = params.title;
      this.setCountEstate(data.count);
      // context.commit("setSimpleHouses", estateData(data.data.results));
      this.page += 1;
      this.busy = false;
    },

    async getRedevData(params, page) {
      const { data } = await Vue.prototype.$axios.get(`/transactions/`, {
        params: { ...params, page, page_size: 10 }
      });
      if (!!params.title && this.prevSearch === params.title) {
        this.saleList = [
          ...this.saleList,
          ...data.results
        ];
      } else {
        this.saleList = data.results.map((item) => {
          return {
            ...item

          };
        });
      }
      this.prevSearch = params.title;

      this.setCountEstate(data.count);
      this.page += 1;
      this.busy = false;
    },

    async getLocationData(params, page) {
      const { data } = await Vue.prototype.$axios.get(`/transactions/`, {
        params: { ...params, page, page_size: 10 }
      });

      if (!!params.title && this.prevSearch === params.title) {
        this.saleList = [
          ...this.saleList,
          ...data.results.map((item) => {
            return {
              ...item,
              ...item.recent_transactions?.[item.types[0]]
            };
          })
        ];
      } else {
        this.saleList = data.results.map((item) => {
          return {
            ...item,
            ...item.recent_transactions?.[item.types[0]]
          };
        });
      }
      this.prevSearch = params.title;
      this.setCountEstate(data.count);
      this.page += 1;
      this.busy = false;
    },
    async getApiTransaction(params, label, page) {
      const { data } = await Vue.prototype.$axios.get(`/transactions/`, {
        params: { ...params, page, page_size: 10 }
      });
      this.saleList = [
        // ...this.saleList,
        ...data.results.map((item) => {
          return {
            ...item
          };
        })
      ];
      this.prevSearch = params.title;
      this.setCountEstate(data.count);
      this.page += 1;
      this.busy = false;
    },
    async loadMoreApiTransaction(params, label, page) {
      const { data } = await Vue.prototype.$axios.get(`/transactions/`, {
        params: { ...params, page, page_size: 10 }
      });
      this.saleList = [
        ...this.saleList,
        ...data.results.map((item) => {
          return {
            ...item,
            ...item.recent_transactions?.[item.types[0]]
          };
        })
      ];
      this.prevSearch = params.title;
      this.setCountEstate(data.count);
      this.page += 1;
      this.busy = false;
    },

    setSearchQuery(search, label, page) {
      this.page = 1;
      this.$router.replace({
        name: "listTransactions",
        query: { search }
      });

      this.getSearchData({ search }, this.page);
    },
    setRedevQuery(redevelopmentArea, title) {
      this.page = 1;
      this.$router.replace({
        name: "listTransactions",
        query: { redevelopment_area: redevelopmentArea, title }
      });
      this.getRedevData(
        { redevelopment_area: redevelopmentArea, title },
        this.page
      );
    },
    setLocationQuery(location, label, page) {
      this.page = 1;
      this.$router.replace({
        name: "listTransactions",
        query: { location, title: label }
      });
      this.getLocationData({ location }, this.page);
    }
  },
  created() {},
  beforeMount() {
    this.setRequestUrl("houses");
    // this.setAreaType(null);
  }
};
</script>

<style lang="scss" scoped>
.sort-section {
  padding: 5px 0;
  justify-content: space-between;
  .q-btn {
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    letter-spacing: -1.05px;
    color: #707070;
  }
  .q-separator {
    margin-top: 20px;
    height: 14px;
  }
  .see-more {
    font-size: 17px;
    line-height: 52px;
    text-align: center;
    letter-spacing: -1.275px;
    color: #3a3a3a;
  }
}
</style>
