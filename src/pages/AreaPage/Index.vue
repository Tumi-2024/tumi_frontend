<template>
  <div class="q-mt-sm">
    <area-carousel></area-carousel>
    <area-filter-btns></area-filter-btns>
  </div>
</template>

<script>
import {
  AreaCarousel,
  AreaFilterBtns
} from "src/components/AreaPageComponents";
export default {
  name: "Area",
  components: {
    "area-carousel": AreaCarousel,
    "area-filter-btns": AreaFilterBtns
  },
  data() {
    return {};
  }
};
</script>

<style scoped></style>
