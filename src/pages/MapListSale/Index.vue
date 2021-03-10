<template>
  <div>
    <area-list-items />
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
  }
};
</script>

<style lang="scss" scoped></style>
