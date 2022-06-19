<template>
  <div>
    <AreaListTransactions :list="list" />
    <floating-button />
  </div>
</template>

<script>
import {
  AreaListTransactions,
  FloatingButton
} from "components/MapListSaleComponents";

import Vue from "vue";
import { mapActions } from "vuex";

export default {
  components: {
    AreaListTransactions,
    "floating-button": FloatingButton
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    ...mapActions("map", ["changeToolbarTitle"]),
    onSearch(e) {
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
          this.getTransactions(e);
          break;
        default:
          this.getAllTransactions(e);
      }
    },
    async getAllTransactions() {
      const { data } = await Vue.prototype.$axios.get(`/transaction_groups/`);
      this.list = data.results.map((item) => {
        return {
          ...item,
          ...item.recent_transactions?.[item.types[0]]
        };
      });
    },

    async getTransactions(query) {
      const { data } = await Vue.prototype.$axios.get(
        `/transaction_groups/${this.$route.query.transactionid}/transactions/`,
        {
          params: query
        }
      );
    },
    async getRedevelopment(e) {
      const { data } = await Vue.prototype.$axios.get(
        `/redevelopment_areas/?search=${e}`
      );
    },
    async getLocations(e) {
      const { data } = await Vue.prototype.$axios.get(
        `/locations/?search=${e}`
      );
    }
  },
  async beforeMount() {
    this.changeToolbarTitle("실거래가");
    if (this.$route.query?.transactionid) {
      const { data } = await Vue.prototype.$axios.get(
        `/transaction_groups/${this.$route.query.transactionid}`
      );
      this.list = data.results;
    } else {
      this.getAllTransactions();
    }
  }
};
</script>
