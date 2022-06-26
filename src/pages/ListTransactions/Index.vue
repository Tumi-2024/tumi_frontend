<template>
  <div>
    <AreaListTransactions />
    <floating-button />
  </div>
</template>

<script>
import {
  AreaListTransactions,
  FloatingButton
} from "components/MapListSaleComponents";

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
    ...mapActions("map", ["changeToolbarTitle"])
  },
  async beforeMount() {
    this.changeToolbarTitle("실거래가");
  }
};
</script>
