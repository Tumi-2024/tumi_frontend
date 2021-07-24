<template>
  <q-card flat class="q-mt-sm">
    <q-card-section class=" notosanskr-medium">
      전체 {{ this.type === "transaction" ? "실거래가" : "매물" }}
      <span class="text-primary">
        {{
          this.type === "transaction"
            ? saleList.length
            : $store.state.estate.detail_houses.length
        }} </span
      >개
    </q-card-section>
    <q-card-section
      class="sort-section row bg-positive q-pa-none notosanskr-regular"
    >
      <toolbar-filter
        class="q-pt-xs q-px-sm"
        :disable="getMapMode === 'redevelop-area'"
      />
      <div class="flex row justify-between">
        <template v-for="(btn, btnIndex) of sortButtons">
          <div class="flex items-center" :key="btnIndex">
            <q-btn flat :class="btn.class">
              {{ btn.text }}
            </q-btn>
            <q-separator v-if="btnIndex !== sortButtons.length - 1" vertical />
          </div>
        </template>
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
          :item="item"
          v-bind="{
            ctgr: item.category,
            type: item.type,
            isRedevelop
          }"
        ></area-item>
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
import ToolbarFilter from "components/Utilities/ToolbarFilter";

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
  async mounted() {
    console.log(this.$route);
    if (this.$route.query && this.$route.query.transactionid) {
      this.type = "transaction";
      console.log("transaction");

      const { data } = await Vue.prototype.$axios.get(
        `/transaction_groups/${this.$route.query.transactionid}/transactions`
      );

      this.saleList = data;
      console.log(data);
    } else if (this.$route.query && this.$route.query.sellid) {
      this.type = "sell";
      const { data } = await Vue.prototype.$axios.get(
        `/transaction_groups/${this.$route.query.sellid}/transactions`
      );

      this.saleList = data;
      console.log(data);
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
