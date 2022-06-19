<template>
  <q-card flat class="q-mt-sm">
    <q-card-section class="notosanskr-medium">
      전체 매물
      <span class="text-primary"> {{ saleList.length }} </span>개
    </q-card-section>
    <q-card-section
      class="sort-section row bg-positive q-pa-none notosanskr-regular"
    >
      <toolbar-filter
        class="q-pt-xs q-px-sm"
        :text="text"
        @input="onChangeText"
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

    <!-- Transactions -->
    <!-- <q-card-section class="list-items q-pa-none notosanskr-regular" v-else>
      <q-list class="q-pt-md">
        <area-transaction
          v-for="(item, i) of saleList"
          :key="i"
          :item="item"
          v-bind="{
            ctgr: item.category,
            type: item.type,
            isRedevelop
          }"
        >
        </area-transaction>
      </q-list>
    </q-card-section> -->
  </q-card>
</template>

<script>
import Vue from "vue";
// import AreaTransaction from "./AreaTransaction.vue";
import AreaItem from "./AreaItem.vue";
import ToolbarFilter from "./ToolbarFilter.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    // "area-transaction": AreaTransaction,
    "area-item": AreaItem,
    "toolbar-filter": ToolbarFilter
  },
  data() {
    return {
      tab: "지역",
      text: "",
      selectedIndex: 0,
      type: "transaction" /** sell  */,
      saleList: [],
      currentItem: {}
    };
  },
  computed: {
    ...mapGetters("map", ["getMapMode"])
  },
  created() {
    this.getApiHouses();
  },
  methods: {
    onChangeText(e) {
      this.text = e;
    },
    onSearch(e) {
      console.log("onSearch", e);
      if (e.length === 0) {
        return;
      }
      switch (this.tab) {
        case "지역":
          this.getLocations(e);
          break;
        case "정비사업":
          this.getRedevelopment(e);
          break;
        case "건물/단지":
          this.searchHouse(e);
          break;
        default:
          this.searchHouse(e);
      }
    },

    async searchHouse(searchText) {
      console.log("searchHouse");
      const { data } = await Vue.prototype.$axios.get(
        `/houses/?redevelopment_area=${searchText}`
      );
      this.saleList = data.results;
    },
    async getApiHouses(query) {
      const { data } = await Vue.prototype.$axios.get(`/houses/`, {
        params: query
      });

      this.saleList = data.results;
    },
    async getApiTransactions(query) {
      const { data } = await Vue.prototype.$axios.get(
        `/transaction_groups/${this.$route.query.transactionid}/transactions/`,
        {
          params: query
        }
      );

      this.saleList = data;
    },
    async getRedevelopment(e) {
      const { data } = await Vue.prototype.$axios.get(
        `/redevelopment_areas/?search=${e}`
      );
      this.saleList = data.results
        .map(({ latitude, longitude, title }) => {
          return { value: { latitude, longitude }, label: title };
        })
        .filter((obj) => obj.value)
        .slice(0, 4);
    },
    async getLocations(e) {
      const { data } = await Vue.prototype.$axios.get(
        `/locations/?search=${e}`
      );
      this.saleList = data.results
        .map(({ latitude, longitude, title }) => {
          return { value: { latitude, longitude }, label: title };
        })
        .filter((obj) => obj.value)
        .slice(0, 4);
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
