<template>
  <q-card flat class="q-mt-sm">
    <q-card-section class="nanum-square">
      전체 매물
      <span class="text-primary">{{ estateCount.toLocaleString() }} </span>개
    </q-card-section>

    <q-card-section
      style="gap: 8px"
      class="sort-section bg-positive justify-end q-pa-none q-ma-none flex"
    >
      <house-toolbar-filter
        :devType="devType"
        :areaType="getAreaType"
        class="q-pt-xs q-px-sm"
        @changeFilter="changeFilter"
        />
    </q-card-section>

    <q-card-section class="list-items q-pa-none notosanskr-regular">
      <div style="display: flex; gap: 2px" class="q-pa-sm">
        <Badge value="개발유형" recommend />
        <Badge value="주택유형" houseType />
        <Badge value="건물면적" pyeong />
        <Badge value="매매가" price />
        <Badge value="매물수정일자" date />
      </div>
      <q-separator />
      <q-list>
        <div v-for="(item, i) of this.saleList" :key="i">
          <area-item-house
            class="q-py-sm"
            :query="{ sellid: item.id }"
            v-bind="{ item: item }"
          />
          <q-separator />
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
import AreaItemHouse from "./AreaItemHouse.vue";
import HouseToolbarFilter from "./HouseToolbarFilter.vue";

import { mapGetters, mapActions } from "vuex";
import Badge from "../Utilities/Badges/Badge.vue";

export default {
  directives: {
    infiniteScroll
  },
  components: {
    // "area-transaction": AreaTransaction,
    "area-item-house": AreaItemHouse,

    Badge,
    HouseToolbarFilter
  },
  watch: {
    $route(val) {
      this.page = 1
      this.getHouseList(val.query)
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
      const query = this.$route.query
      this.page = 1;
      this.$router.replace({
        name: "listHouses",
        query: { ...params, page_size: 20, page: 1 }
      });
    },
    infiniteHandler() {
      const query = this.$route.query
      this.getHouseList({ ...query, page: this.page })
    },
    async getHouseList (query) {
      try {
        const { data } = await Vue.prototype.$axios.get(`/houses/`, { params: { page: this.page, page_size: 20, ...query } })
        this.setCountEstate(data.count)
        if (this.page === 1) {
          this.saleList = data.results
        } else {
          this.saleList = [...this.saleList, ...data.results]
        }
        this.page += 1
      } catch (e) {
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
