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
    onSearch(type, text) {
      // console.log(type, text, "search");
    }
  }
};
</script>

<style lang="scss" scoped></style>
