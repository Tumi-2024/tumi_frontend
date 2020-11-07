<template>
  <div class="q-mt-sm"><area-carousel></area-carousel></div>
</template>

<script>
import { AreaCarousel } from "src/components/AreaPageComponents";
export default {
  name: "Area",
  components: {
    "area-carousel": AreaCarousel
  },
  data() {
    return {};
  }
};
</script>

<style scoped></style>
