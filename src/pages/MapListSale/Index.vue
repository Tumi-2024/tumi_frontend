<template>
  <div>
    <area-list-items :params="$route.params" :isRedevelop="isRedevelop" />
    <floating-button />
  </div>
</template>

<script>
import Vue from "vue";
import {
  AreaListItems,
  FloatingButton
} from "components/MapListSaleComponents";

export default {
  components: {
    "area-list-items": AreaListItems,
    "floating-button": FloatingButton
  },
  data() {
    return {
      isRedevelop: false
    };
  },
  async beforeMount() {
    if (!this.$route.query?.transactionid) {
      return;
    }
    const { data } = await Vue.prototype.$axios.get(
      `/transaction_groups/${this.$route.query.transactionid}`
    );
    this.isRedevelop = !!data.redevelopment_area;
  }
};
</script>

<style lang="scss" scoped></style>
