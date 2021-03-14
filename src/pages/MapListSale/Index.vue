<template>
  <div>
    <area-list-items :params="$route.params" />
    <floating-button />
  </div>
</template>

<script>
import {
  AreaListItems,
  FloatingButton
} from "components/MapListSaleComponents";
export default {
  components: {
    "area-list-items": AreaListItems,
    "floating-button": FloatingButton
  },
  mounted() {
    // console.log(this.$route.params);
  }
};
</script>

<style lang="scss" scoped></style>
