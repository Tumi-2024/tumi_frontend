<template>
  <q-card flat class="q-mt-sm">
    <q-card-section class="notosanskr-medium">
      전체 {{ this.type === "transaction" ? "실거래가" : "매물" }}
      <span class="text-primary"> {{ saleList.length }} </span>개
    </q-card-section>
    <q-card-section
      class="sort-section row bg-positive q-pa-none notosanskr-regular"
    >
      <toolbar-filter class="q-pt-xs q-px-sm" @search="onSearch" />
      <div class="flex row justify-between">
        <div
          class="flex items-center"
          v-for="(btn, btnIndex) of sortButtons"
          :key="btnIndex"
        >
          <q-btn flat :class="btn.class">
            {{ btn.text }}
          </q-btn>
          <q-separator v-if="btnIndex !== sortButtons.length - 1" vertical />
        </div>
      </div>
    </q-card-section>

    <q-card-section
      class="list-items q-pa-none notosanskr-regular"
      v-if="type !== 'transaction'"
    >
      <q-list class="q-pt-md">
        <area-item
          v-for="(item, i) of saleList"
          :key="i"
          :query="{ sellid: item.id }"
          v-bind="{
            item,
            ctgr: item.category,
            type: item.type,
            isRedevelop,
            address: item.address
          }"
        />
      </q-list>
    </q-card-section>

    <!-- Transactions -->
    <q-card-section class="list-items q-pa-none notosanskr-regular" v-else>
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
    </q-card-section>
  </q-card>
</template>

<script>
import Vue from "vue";
import AreaTransaction from "./AreaTransaction.vue";
import AreaItem from "./AreaItem.vue";
import ToolbarFilter from "./ToolbarFilter.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    "area-transaction": AreaTransaction,
    "area-item": AreaItem,
    "toolbar-filter": ToolbarFilter
  },
  data() {
    return {
      sortButtons: [
        { text: "최신순", class: "text-primary" },
        { text: "추천순" },
        { text: "면적순" },
        { text: "가격순" }
      ],
      type: "transaction" /** sell  */,
      saleList: [],
      currentItem: {}
    };
  },
  props: {
    isRedevelop: { type: Boolean, default: false }
  },
  computed: {
    ...mapGetters("map", ["getMapMode"])
  },
  methods: {
    onSearch(e) {
      console.log(e);
      if (e.length !== 0) {
        this.getHouseData(e);
      }
    },
    async getHouseData(searchText) {
      const { data } = await Vue.prototype.$axios.get(
        `/houses/?search=${searchText}`
      );
      this.saleList = data.results;
    }
  },
  async beforeMount() {
    this.type = this.$route?.query?.transactionid ? "transaction" : "sell";
    if (this.$route?.query?.transactionid) {
      const { data } = await Vue.prototype.$axios.get(
        `/transaction_groups/${this.$route.query.transactionid}/transactions`
      );

      this.saleList = data;
    } else if (this.$route?.query?.sellid) {
      this.type = "sell";
      const { data } = await Vue.prototype.$axios.get(
        `/houses/${this.$route.query.sellid}/transactions`
      );

      this.saleList = data.results;
    } else {
      // const { data } = await Vue.prototype.$axios.get(
      //   `/houses`
      // );
      const {
        data: { results: houses }
      } = await Vue.prototype.$axios.get("/houses/");
      this.saleList = houses;
      // this.saleList = data.results;
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
