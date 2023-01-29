<template>
  <q-card flat class="q-mt-sm">
    <q-card-section class="notosanskr-medium">
      전체 실거래가
      <span class="text-primary">{{ getNumberWithCommas(estateCount) }} </span
      >개
    </q-card-section>

    <q-card-section
      class="sort-section row bg-positive q-pa-none notosanskr-regular"
    >
      <toolbar-filter
        class="q-pt-xs q-px-sm"
        v-model="text"
        @focus="onFocus"
        @search="onSearch"
        @changeFilter="changeFilter"
      />
    </q-card-section>

    <q-card-section class="list-items q-pa-none notosanskr-regular">
      <div style="display: flex; gap: 2px" class="q-pa-sm">
        <Badge value="주택유형" houseType />
        <Badge value="매매가" price />
        <Badge value="거래일자" date />
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
      text: "",
      prevSearch: "",
      selectedIndex: 0,
      saleList: [],
      currentItem: {},
      page: 1,
      busy: false
    };
  },
  computed: {
    ...mapGetters("map", ["getMapMode"]),
    ...mapGetters(["simple_houses", "estateCount"]),
    ...mapGetters("search", [
      "area",
      "price",
      "houseType",
      "pyeong",
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
      // this.getApiHouses();
    },
    changeFilter() {},
    infiniteHandler() {
      this.setRequestUrl("transactions");
      const getQueryArray = (keyName, params) => {
        if (keyName === "type_house__in" && params?.length === 8) {
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

      const getAllorUndefined = (param) => {
        if (param.length === 8) return undefined;
        return param;
      };

      const Dquery = {
        ...getQueryArray(
          "type_house__in",
          getAllorUndefined(this.getCategoriesByKorean)
        )
      };

      const { query } = this.$route;
      const _key = Object.keys(query)[0];
      this.text = this.$route.query.title || this.$route.query.search || "";
      this.busy = true;

      switch (_key) {
        case "search":
          this.getSearchData({ ...Dquery, ...query }, this.page);
          break;
        case "redevelopment_area":
          this.getRedevData({ ...Dquery, ...query }, this.page);
          break;
        case "location":
          this.getLocationData({ ...Dquery, ...query }, this.page);
          break;
        default:
          this.getApiHouses({ ...Dquery, ...query }, undefined, this.page);
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
        this.getApiHouses({}, undefined, this.page);
        return;
      }

      switch (type) {
        case "지역":
          this.setLocationQuery(id, label, this.page);
          break;
        case "개발정비사업":
          this.setRedevQuery(id, label, this.page);
          break;
        case "건물/단지":
          this.setSearchQuery(id, label, this.page);
          break;
        default:
          this.getApiHouses(id, label, this.page);
      }
    },

    async getSearchData(params, page) {
      const { data } = await Vue.prototype.$axios.get(`/transaction_groups`, {
        params
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
      // context.commit("setSimpleHouses", estateData(data.data.results));
      this.page += 1;
      this.busy = false;
    },

    async getRedevData(params, page) {
      const { data } = await Vue.prototype.$axios.get(`/transaction_groups`, {
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

    async getLocationData(params, page) {
      const { data } = await Vue.prototype.$axios.get(`/transaction_groups`, {
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
    async getApiHouses(params, label, page) {
      const { data } = await Vue.prototype.$axios.get(`/transaction_groups`, {
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
