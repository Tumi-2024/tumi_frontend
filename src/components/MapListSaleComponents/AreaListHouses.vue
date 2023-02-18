<template>
  <q-card flat class="q-mt-sm">
    <q-card-section class="notosanskr-medium">
      전체 매물
      <span class="text-primary">{{ estateCount }} </span>개
    </q-card-section>

    <q-card-section
      class="sort-section row bg-positive q-pa-none notosanskr-regular items-center"
    >
      <div>
        <q-badge outline color="primary" @click="changeDevType">
          {{ getAreaType }}
        </q-badge>
      </div>
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
    ...mapActions("map", ["setAreaType"]),

    getDquery() {
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

      const getAreaTypeString = () => {
        switch (this.getAreaType) {
          case null:
            return "";
          case "재개발":
          case "재건축":
          case "일반":
            return this.getAreaType;
          case "기타사업":
            return "기타";
          default:
            return null;
        }
      };

      const Dquery = {
        ...getQueryArray(
          "type_house__in",
          getAllorUndefined(this.getCategoriesByKorean)
        ),
        ...getQueryArray("redevelopment_area__category", getAreaTypeString())
      };
      return Dquery;
    },

    changeDevType() {
      const devTypes = [
        { color: "primary", label: "재개발", key: "재개발" },
        { color: "blue", label: "재건축", key: "재건축" },
        { color: "green", label: "기타사업", key: "기타사업" },
        { color: "grey-6", label: "일반", key: "일반" }
      ];
      const index = devTypes.findIndex((item) => item.key === this.getAreaType);

      this.saleList = [];
      this.setAreaType(devTypes[index > 2 ? 0 : index + 1].key);
      this.page = 1;
      this.infiniteHandler();
    },
    onFocus(e) {
      // this.getApiHouses();
    },
    changeFilter() {},
    infiniteHandler() {
      this.setRequestUrl("houses");

      const { query } = this.$route;
      const _key = Object.keys(query)[0];
      this.text = this.$route.query.title || this.$route.query.search || "";
      this.busy = true;

      switch (_key) {
        case "search":
          this.getSearchData({ ...query }, this.page);
          break;
        case "redevelopment_area":
          this.getRedevData({ ...query }, this.page);
          break;
        case "location":
          this.getLocationData({ ...query }, this.page);
          break;
        default:
          this.getApiHouses({ ...query }, undefined, this.page);
      }
    },
    async onSearch(type, id, label, subCityId) {
      const { query } = this.$route;
      if (id?.length === 0) {
        return;
      }
      if (!type && !id && !label) {
        this.page = 1;
        if (Object.keys(query).length !== 0) {
          this.$router.replace({
            name: "listHouses"
          });
        }
        this.getApiHouses({}, undefined, this.page);
        return;
      }

      switch (type) {
        case "지역":
          if (!subCityId) {
            this.setSubCityQuery(id, label, this.page);
          } else {
            this.setLocationQuery(id, label, this.page);
          }
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
      const { data } = await Vue.prototype.$axios.get(`/houses/`, {
        params: {
          ...params,
          ...this.getDquery()
        }
      });
      if (!!params.title && this.prevSearch === params.title) {
        this.saleList = [...this.saleList, ...data.results];
      } else {
        this.saleList = data.results;
      }
      this.prevSearch = params.title;
      this.setSimpleHouses(this.saleList);
      this.setCountEstate(data.count);
      // context.commit("setSimpleHouses", estateData(data.data.results));
      this.page += 1;
      this.busy = false;
    },

    async getRedevData(params, page) {
      const { data } = await Vue.prototype.$axios.get(`/houses/`, {
        params: { ...params, ...this.getDquery(), page, page_size: 10 }
      });
      if (!!params.title && this.prevSearch === params.title) {
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
        params: { ...params, ...this.getDquery(), page, page_size: 10 }
      });

      if (!!params.title && this.prevSearch === params.title) {
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
        params: { ...params, ...this.getDquery(), page, page_size: 10 }
      });
      this.saleList = [...this.saleList, ...data.results];
      this.prevSearch = params.title;
      this.setSimpleHouses(this.saleList);
      this.setCountEstate(data.count);
      this.page += 1;
      this.busy = false;
    },

    setSearchQuery(search, label, page) {
      this.page = 1;
      this.$router.replace({
        name: "listHouses",
        query: { search }
      });
      this.getSearchData({ search }, this.page);
    },
    setRedevQuery(redevelopmentArea, title) {
      this.page = 1;
      this.$router.replace({
        name: "listHouses",
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
        name: "listHouses",
        query: { location, title: label }
      });
      this.getLocationData({ location }, this.page);
    },
    setSubCityQuery(subCities, label, page) {
      this.page = 1;
      this.$router.replace({
        name: "listHouses",
        query: { subcity: subCities, title: label }
      });
      console.log({ subCities, label, page });
      this.getLocationData({ subcity: subCities }, this.page);
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
