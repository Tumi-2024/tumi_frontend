<template>
  <div class="bg-white" ref="gmapContainer">
    <GmapMap
      ref="mapRef"
      :center="{
        lat: position.lat,
        lng: position.lng
      }"
      :zoom="17"
      :style="`height: ${mapSize.height}; width: ${mapSize.width};`"
      :options="getMapOptions"
    >
    </GmapMap>
  </div>
</template>

<script>
import { gmapApi } from "gmap-vue";
import { TUMI_AREA_FOR_SALE } from "./area-forsale-sample.js";

import { mapGetters } from "vuex";
export default {
  components: {},
  props: {
    position: Object,
  },
  data() {
    return {
      map: null,
      mapSize: { height: "", width: "" }
    };
  },
  computed: {
    ...mapGetters("map", ["getMapOptions"]),
    google: gmapApi
  },

  async mounted() {
    console.log(this.position);
    this.setGmapContainerSize();
    // we access the map Object
    this.map = await this.$refs.mapRef.$mapPromise;
    this.map.setOptions({
      zoomControl: false,
      scrollwheel: false
    });
    // this.map.data.addGeoJson(TUMI_AREA_FOR_SALE);
    // apply styles on geojson layers
    this.map.data.setStyle(function(feature) {
      return { fillColor: "#0BCDC7", strokeColor: "#FF5100", strokeWeight: 2 };
    });
  },

  methods: {
    setGmapContainerSize() {
      const h = this.$refs.gmapContainer.clientHeight;
      const w = this.$refs.gmapContainer.clientWidth;
      this.mapSize.height = h + "px";
      this.mapSize.width = w + "px";
    }
  }
};
</script>

<style lang="scss" scoped></style>
