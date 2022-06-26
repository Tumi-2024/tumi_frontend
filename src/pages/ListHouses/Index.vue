<template>
  <div>
    <AreaListHouses
      :params="$route.query"
      :isRedevelop="false"
      @search="onSearch"
    />
    <floating-button />
  </div>
</template>

<script>
import {
  AreaListHouses,
  FloatingButton
} from "components/MapListSaleComponents";

import { mapActions } from "vuex";

export default {
  components: {
    AreaListHouses,
    "floating-button": FloatingButton
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    ...mapActions("map", ["changeToolbarTitle"]),
    onSearch(type, text) {
      console.log(type, text, "search");
    }
  }
};
</script>

<style lang="scss" scoped></style>
