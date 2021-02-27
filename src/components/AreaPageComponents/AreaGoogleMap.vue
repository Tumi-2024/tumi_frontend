<template>
  <div class="bg-red" ref="gmapContainer">
    <GmapMap
      ref="mapRef"
      :center="{
        lat: 37.54439180667893,
        lng: 127.04601120488171
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

import { mapGetters } from "vuex";

const icon = require("assets/white-pin.svg");
export default {
  components: {},
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
    this.setGmapContainerSize();
    // we access the map Object
    this.map = await this.$refs.mapRef.$mapPromise;
    this.map.setOptions({
      zoomControl: false,
      scrollwheel: false
    });
    new this.google.maps.Marker({
      position: {
        lat: 37.54439180667893,
        lng: 127.04601120488171
      },
      map: this.map,
      icon: icon
    });
    const offsetX = parseInt(this.mapSize.width.replace("px", "")) / 4;
    this.map.panBy(-offsetX, -60);
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
