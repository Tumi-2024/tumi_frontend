<template>
  <div v-if="headerHeight">
    <google-map
      class="page-container full-width"
      :style="`min-height: calc(100vh - ${headerHeight}px)`"
    />
    <bottom-drawer v-if="getMapSelectedArea" />
  </div>
</template>

<script>
import { BottomDrawer, GoogleMap } from "components/MapCityComponents";
import { geojson } from "./sample-geojson";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    "bottom-drawer": BottomDrawer,
    "google-map": GoogleMap
  },
  data: () => {
    return {
      geojson: geojson,
      pageReady: false
    };
  },
  props: {
    headerHeight: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters("area", ["getMapAreas", "getMapSelectedArea"])
  },
  methods: {
    ...mapActions("map", [
      "changeMapMode",
      "changeMapZoom",
      "changeToolbarTitle"
    ])
  },
  created() {
    // we will set the desired settings view(lat&lng / zoom & etc...)
    this.changeToolbarTitle("재개발 구역");
    this.changeMapMode(
      this.$route.path === "/map/city" ? "apartment" : "redevelop-area"
    );
    /** After setting desired settings we procceed to see Map */
  }
};
</script>

<style lang="scss" scoped></style>
