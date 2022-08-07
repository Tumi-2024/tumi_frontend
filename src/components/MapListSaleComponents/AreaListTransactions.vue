<template>
  <q-card flat class="q-mt-sm">
    <q-card-section class="notosanskr-medium">
      전체 실거래가
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
  </q-card>
</template>

<script>
import Vue from "vue";
import AreaTransaction from "./AreaTransaction.vue";
import ToolbarFilter from "./ToolbarFilter.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    "area-transaction": AreaTransaction,
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
    this.getAllTransactions();
  },
  methods: {
    onChangeText(e) {
      this.text = e;
    },
    onSearch(type, id) {
      console.log("onSearch", type, id);
      console.log(type, id);
      if (id.length === 0) {
        return;
      }
      switch (type) {
        case "지역":
          this.getTransactionsFromLocation(id);
          break;
        case "개발정비사업":
          this.getTransactionsFromRedev(id);
          break;
        case "건물/단지":
          this.getTransactionsFromSearch(id);
          break;
        default:
          this.getAllTransactions(id);
      }
    },
    async getAllTransactions() {
      const { data } = await Vue.prototype.$axios.get(`/transaction_groups/`);
      this.saleList = data.results.map((item) => {
        return {
          ...item,
          ...item.recent_transactions?.[item.types[0]]
        };
      });
    },

    async getTransactionsFromSearch(query) {
      const { data } = await Vue.prototype.$axios.get(
        `/transaction_groups/?search=${query}`
      );
      this.saleList = data.results.map((item) => {
        return {
          ...item,
          ...item.recent_transactions?.[item.types[0]]
        };
      });
    },
    async getTransactionsFromRedev(id) {
      const { data } = await Vue.prototype.$axios.get(
        `/redevelopment_areas/${id}/transaction_groups/`
      );
      this.saleList = data.results.map((item) => {
        return {
          ...item,
          ...item.recent_transactions?.[item.types[0]]
        };
      });
    },
    async getTransactionsFromLocation(query) {
      const { data } = await Vue.prototype.$axios.get(
        `/transaction_groups/?subcity=${query}`
      );
      this.saleList = data.results.map((item) => {
        return {
          ...item,
          ...item.recent_transactions?.[item.types[0]]
        };
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
