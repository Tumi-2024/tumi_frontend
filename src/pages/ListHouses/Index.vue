<template>
  <div>
    <area-list-items :params="$route.query" :isRedevelop="false" :list="list" />
    <floating-button />
  </div>
</template>

<script>
import {
  AreaListItems,
  FloatingButton
} from "components/MapListSaleComponents";

import Vue from "vue";
import { mapActions } from "vuex";

export default {
  components: {
    "area-list-items": AreaListItems,
    "floating-button": FloatingButton
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    ...mapActions("map", ["changeToolbarTitle"])
  },
  async beforeMount() {
    this.changeToolbarTitle("매물");
    if (this.$route.query?.sellid) {
      const { data } = await Vue.prototype.$axios.get(
        `/houses/${this.$route.query.sellid}`
      );
      this.list = data.results;
    } else {
      const { data } = await Vue.prototype.$axios.get(`/houses`);
      this.list = data.results.map((item) => {
        return {
          item
        };
      });
    }

    // if (this.$route.query?.sellid) {
    //   this.isRedevelop = !!data.redevelopment_area;
    // }
    // if (this.$route.query?.transactionid) {
    //   const { data } = await Vue.prototype.$axios.get(
    //     `/transaction_groups/${this.$route.query.transactionid}`
    //   );
    //   this.isRedevelop = !!data.redevelopment_area;
    // }
  }
};
</script>

<style lang="scss" scoped></style>
