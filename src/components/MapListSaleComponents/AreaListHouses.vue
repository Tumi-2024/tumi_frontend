<template>
  <q-card flat class="q-mt-sm">
    <q-card-section class="notosanskr-medium">
      전체 매물
      <span class="text-primary">{{ estateCount }} </span>개
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
      <div style="display: flex; gap: 5px; padding: 10px 10px">
        <Badge value="개발유형" recommend />
        <Badge value="주택유형" houseType />
        <Badge value="전용면적" pyeong />
        <Badge value="희망매매가" price />
        <Badge value="매물등록일자" date />
      </div>
      <q-separator />
      <q-list>
        <div v-for="(item, i) of simple_houses" :key="i">
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
// import AreaTransaction from "./AreaTransaction.vue";
import AreaItemHouse from "./AreaItemHouse.vue";
import ToolbarFilter from "./ToolbarFilter.vue";
import infiniteScroll from "vue-infinite-scroll";

import { mapGetters, mapActions } from "vuex";
import Badge from "../Utilities/Badges/Badge.vue";

export default {
  directives: {
    infiniteScroll
  },
  components: {
    // "area-transaction": AreaTransaction,
    "area-item-house": AreaItemHouse,
    "toolbar-filter": ToolbarFilter, // InfiniteLoading

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
    ])
  },
  methods: {
    ...mapActions(["setSimpleHouses", "setCountEstate", "setRequestUrl"]),
    onFocus(e) {
      // this.getApiHouses();
    },
    changeFilter() {
      console.log("changeFilter");
    },
    infiniteHandler() {
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
      this.text = this.$route.query.title || "";
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
      if (id?.length === 0) {
        return;
      }
      if (!type && !id && !label) {
        this.page = 1;
        const { data } = await Vue.prototype.$axios.get(`/houses/`);
        this.setSimpleHouses(data.results);
        this.setCountEstate(data.count);

        this.$router.push({ name: "listHouses" });
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
      const { data } = await Vue.prototype.$axios.get(`/houses/`, { params });
      this.saleList = [...this.saleList, ...data.results];
      this.setSimpleHouses(this.saleList);
      this.setCountEstate(data.count);
      // context.commit("setSimpleHouses", estateData(data.data.results));
      this.page += 1;
      this.busy = false;
    },

    async getRedevData(params, page) {
      const { data } = await Vue.prototype.$axios.get(`/houses/`, {
        params: { ...params, page, page_size: 10 }
      });
      if (this.prevSearch === params.title) {
        this.saleList = [...this.saleList, ...data.results];
      } else {
        this.saleList = data.results;
      }
      this.prevSearch = params.title;

      this.setSimpleHouses(this.saleList);
      this.setCountEstate(data.count);
      this.page += 1;
      this.busy = false;
    },

    async getLocationData(params, page) {
      const { data } = await Vue.prototype.$axios.get(`/houses/`, {
        params: { ...params, page, page_size: 10 }
      });

      if (this.prevSearch === params.title) {
        this.saleList = [...this.saleList, ...data.results];
      } else {
        this.saleList = data.results;
      }
      this.prevSearch = params.title;

      this.setSimpleHouses(this.saleList);
      this.setCountEstate(data.count);
      this.page += 1;
      this.busy = false;
    },
    async getApiHouses(params, label, page) {
      const { data } = await Vue.prototype.$axios.get(`/houses/`, {
        params: { ...params, page, page_size: 10 }
      });
      if (this.prevSearch === params.title) {
        this.saleList = [...this.saleList, ...data.results];
      } else {
        this.saleList = data.results;
      }
      this.prevSearch = params.title;
      this.setSimpleHouses(this.saleList);
      this.setCountEstate(data.count);
      this.page += 1;
      this.busy = false;
    },

    setSearchQuery(search, label, page) {
      this.page = 1;
      this.$router.push({
        query: { search }
      });
      this.getSearchData({ search }, this.page);
    },
    setRedevQuery(redevelopmentArea, title) {
      this.page = 1;
      this.$router.push({
        query: { redevelopment_area: redevelopmentArea, title }
      });
      this.getRedevData(
        { redevelopment_area: redevelopmentArea, title },
        this.page
      );
    },
    setLocationQuery(location, label, page) {
      this.page = 1;
      this.$router.push({
        query: { location, title: label }
      });
      this.getLocationData({ location }, this.page);
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
