<template>
  <div class="q-mt-sm">
    <area-carousel></area-carousel>
    <area-filter-btns></area-filter-btns>
    <area-list-items></area-list-items>
  </div>
</template>

<script>
import {
  AreaCarousel,
  AreaFilterBtns,
  AreaListItems
} from "src/components/AreaPageComponents";
export default {
  name: "Area",
  components: {
    "area-carousel": AreaCarousel,
    "area-filter-btns": AreaFilterBtns,
    "area-list-items": AreaListItems
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
