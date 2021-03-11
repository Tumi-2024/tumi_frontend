<template>
  <div>
    <google-map
      :geojson="geojson"
      :areas="getMapAreas"
      :showEstates="false"
      class="page-container full-height full-width"
    />
    <bottom-drawer />
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
    };
  },
  computed:{
    ...mapGetters('area', ['getMapAreas'])
  },
  async mounted() {
    this.fetchMapAreas();
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
    this.changeMapCenter({ lat: 37.51988040411035, lng: 127.05400058307147 });
    this.changeToolbarTitle("재개발 구역");
    /** After setting desired settings we procceed to see Map */
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  background: rgb(54, 54, 54);
  min-height: calc(100vh - 118px);
}
</style>
