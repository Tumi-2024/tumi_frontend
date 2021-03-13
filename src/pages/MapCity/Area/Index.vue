<template>
  <div v-if="pageReady">
    <google-map
      :geojson="geojson"
      :areas="getMapAreas"
      :showEstates="false"
      class="page-container full-height full-width"
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
  computed: {
    ...mapGetters("area", ["getMapAreas", "getMapSelectedArea"])
  },
  async mounted() {
    await this.fetchMapAreas();
    this.pageReady = true;
  },
  methods: {
    ...mapActions("map", [
      "changeMapMode",
      "changeMapZoom",
      "changeMapCenter",
      "changeToolbarTitle"
    ]),
    ...mapActions("area", ["fetchMapAreas"])
  },
  created() {
    // we will set the desired settings view(lat&lng / zoom & etc...)
    this.changeMapMode("redevelop-area");
    this.changeMapZoom(16);
    this.changeMapCenter({ lat: 37.548695, lng: 126.9747022 });
    this.changeToolbarTitle("재개발 구역");
    /** After setting desired settings we procceed to see Map */
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  background: rgb(54, 54, 54);
  min-height: calc(100vh - 102px);
}
</style>
