<template>
  <q-card flat class="q-mt-sm">
    <q-card-section class="nanum-square">
      전체 실거래가
      <span class="text-primary">{{ estateCount.toLocaleString() }} </span>개
    </q-card-section>
    <q-card-section
      style="gap: 8px"
      class="sort-section bg-positive justify-end q-pa-none q-ma-none flex"
    >
      <TransactionToolbarFilter
        :devType="devType"
        :areaType="getAreaType"
        class="q-pt-xs q-px-sm"
        @changeFilter="changeFilter"
        />
    </q-card-section>

    <q-card-section class="list-items q-pa-none notosanskr-regular">
      <div style="display: flex; gap: 2px" class="q-pa-sm">
        <!-- <Badge value="개발유형" recommend /> -->
        <Badge value="주택유형" houseType />
        <Badge value="건물면적" pyeong />
        <Badge value="매매가" price />
        <Badge value="거래일자" date />
      </div>
      <q-separator />
      <q-list>
        <div v-for="(item, i) of this.saleList" :key="i">
          <AreaItemTransaction
            v-if="item.latitude"
            :key="i"
            :item="item"
            v-bind="{
              ctgr: item.category,
              type: item.type,
              isRedevelop: true
            }"
          ></AreaItemTransaction>
        </div>
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
import infiniteScroll from "vue-infinite-scroll";

// import AreaTransaction from "./AreaTransaction.vue";
// import AreaItemHouse from "./AreaItemHouse.vue";
import AreaItemTransaction from './AreaItemTransaction.vue'
import TransactionToolbarFilter from "./TransactionToolbarFilter.vue";

import { mapGetters, mapActions } from "vuex";
import Badge from "../Utilities/Badges/Badge.vue";

export default {
  directives: {
    infiniteScroll
  },
  components: {
    // "area-transaction": AreaTransaction,
    AreaItemTransaction,

    Badge,
    TransactionToolbarFilter
  },
  watch: {
    $route(val) {
      this.page = 1
      this.getTransactionList(val.query)
    }
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
      devType: "재개발"
    };
  },
  computed: {
    ...mapGetters("map", ["getMapMode", "getAreaType"]),
    ...mapGetters(["simple_houses", "estateCount"]),
    ...mapGetters("search", [
      "area",
      "price",
      "houseType",
      "pyeong",
      "date",
      "getCategoriesByKorean"
    ])
  },
  methods: {
    ...mapActions(["setSimpleHouses", "setCountEstate", "setRequestUrl"]),

    onFocus(e) {
      // this.getApiHouses();
    },
    changeFilter(params) {
      console.log('changeFilter', params)

      const query = this.$route.query
      const newQuery = { ...query }
      // params 의 값이 null 이면 객체에서 제외 시킨다. undefined 는 제외시키지 않는다.
      for (const key in params) {
        if (params[key] === null) {
          delete newQuery[key]
        } else {
          newQuery[key] = params[key]
        }
      }

      console.log(params, 'params')
      console.log(newQuery, 'newQuery')

      this.page = 1;
      this.$router.replace({
        name: "listTransactions",
        query: { ...newQuery, page_size: 20, page: 1 }
      });
    },
    infiniteHandler() {
      const query = this.$route.query
      this.getTransactionList({ ...query, page: this.page })
    },
    async getTransactionList (query) {
      try {
        const { data } = await Vue.prototype.$axios.get(`/transactions/?type=SALE`, { params: { page: this.page, page_size: 20, ...query } })
        this.setCountEstate(data.count)
        if (this.page === 1) {
          this.saleList = data.results
        } else {
          this.saleList = [...this.saleList, ...data.results]
        }
        this.page += 1
      } catch (e) {
        console.log(e)
      }
    }

  },
  created() {
    this.setSimpleHouses([]);
  },
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
