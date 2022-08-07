<template>
  <q-card flat class="q-mt-sm">
    <q-card-section class="notosanskr-medium">
      전체 매물
      <span class="text-primary">{{ saleList.length }} </span>개
    </q-card-section>

    <q-card-section
      class="sort-section row bg-positive q-pa-none notosanskr-regular"
    >
      <toolbar-filter
        class="q-pt-xs q-px-sm"
        v-model="text"
        @focus="onFocus"
        @search="onSearch"
      />
    </q-card-section>

    <q-card-section class="list-items q-pa-none notosanskr-regular">
      <q-list class="q-pt-md">
        <div v-for="(item, i) of saleList" :key="i">
          <area-item
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
import AreaItem from "./AreaItem.vue";
import ToolbarFilter from "./ToolbarFilter.vue";
import infiniteScroll from "vue-infinite-scroll";

import { mapGetters } from "vuex";

export default {
  directives: {
    infiniteScroll
  },
  components: {
    // "area-transaction": AreaTransaction,
    "area-item": AreaItem,
    "toolbar-filter": ToolbarFilter
    // InfiniteLoading
  },
  data() {
    return {
      tab: "지역",
      text: "",
      selectedIndex: 0,
      type: "transaction" /** sell  */,
      saleList: [],
      currentItem: {},
      page: 1,
      busy: false
    };
  },
  // watch: {
  //   $route: {
  //     handler({ query }) {
  //       console.log(query, "query");
  //       const _key = Object.keys(query)[0];
  //       this.text = this.$route.query.title || "";
  //       switch (_key) {
  //         case "search":
  //           this.getSearchData(query, undefined, this.page);
  //           break;
  //         case "redevelopment_area":
  //           this.getRedevData(query, undefined, this.page);
  //           break;
  //         case "location":
  //           this.getLocationData(query, undefined, this.page);
  //           break;
  //         default:
  //           this.getApiHouses(query, undefined, this.page);
  //       }
  //     },
  //     immediate: true
  //   }
  // },
  computed: {
    ...mapGetters("map", ["getMapMode"])
  },
  methods: {
    onFocus(e) {
      // this.getApiHouses();
    },
    infiniteHandler() {
      const { query } = this.$route;
      const _key = Object.keys(query)[0];
      this.text = this.$route.query.title || "";
      this.busy = true;
      switch (_key) {
        case "search":
          this.getSearchData(query, this.page);
          break;
        case "redevelopment_area":
          this.getRedevData(query, this.page);
          break;
        case "location":
          this.getLocationData(query, this.page);
          break;
        default:
          this.getApiHouses(query, undefined, this.page);
      }
    },
    onSearch(type, id, label) {
      console.log("onSearch");
      if (id.length === 0) {
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
      console.log(page);
      const { data } = await Vue.prototype.$axios.get(`/houses/`, { params });
      this.saleList = [...this.saleList, ...data.results];
      this.page += 1;
      this.busy = false;
    },

    async getRedevData(params, page) {
      console.log(page);
      const { data } = await Vue.prototype.$axios.get(`/houses/`, {
        params: { ...params, page, page_size: 10 }
      });
      this.saleList = [...this.saleList, ...data.results];
      this.page += 1;
      this.busy = false;
    },

    async getLocationData(params, page) {
      console.log(page);
      const { data } = await Vue.prototype.$axios.get(`/houses/`, {
        params: { ...params, page, page_size: 10 }
      });
      this.saleList = [...this.saleList, ...data.results];
      this.page += 1;
      this.busy = false;
    },
    async getApiHouses(params, label, page) {
      console.log("getApiHouses", params);
      const { data } = await Vue.prototype.$axios.get(`/houses/`, {
        params: { ...params, page, page_size: 10 }
      });
      // const _query = this.$route.query;

      // if (Object.keys(_query).length > 0) {
      //   this.$router.push({
      //     query: {}
      //   });
      // }
      this.saleList = [...this.saleList, ...data.results];
      this.page += 1;
      this.busy = false;
    },

    setSearchQuery(search, label, page) {
      this.$router.push({
        query: { search }
      });
    },
    setRedevQuery(redevelopmentArea, title) {
      this.$router.push({
        query: { redevelopment_area: redevelopmentArea, title }
      });
    },
    setLocationQuery(location, label, page) {
      this.$router.push({
        query: { location }
      });
    }
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
