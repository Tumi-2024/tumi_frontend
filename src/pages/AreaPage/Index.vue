<template>
  <div class="q-mt-sm">
    <section v-if="getMyInterestArea.length">
      <area-carousel></area-carousel>
      <area-filter-btns></area-filter-btns>
      <area-list-items></area-list-items>
    </section>
    <!-- IF USER DONT HAVE ANY INTEREST -->
    <section
      class="row justify-center items-center"
      style="min-height: 50vh"
      v-else
    >
      <div>You dont have any Area of Interest.</div>
    </section>
  </div>
</template>

<script>
import {
  AreaCarousel,
  AreaFilterBtns,
  AreaListItems
} from "src/components/AreaPageComponents";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Area",
  components: {
    "area-carousel": AreaCarousel,
    "area-filter-btns": AreaFilterBtns,
    "area-list-items": AreaListItems
  },
  computed: {
    ...mapGetters("map", ["getMyInterestArea"])
  },
  methods: {
    ...mapActions("map", ["fetchLocationInterest"])
  },
  mounted() {
    if (!this.getMyInterestArea.length) {
      this.fetchLocationInterest();
    }
  }
};
</script>

<style lang="scss" scoped></style>
