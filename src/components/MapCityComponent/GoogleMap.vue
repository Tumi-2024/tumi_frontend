<template>
  <div class="bg-red" ref="gmapContainer">
    <GmapMap
      ref="mapRef"
      :center="{ lat: 37.5326, lng: 127.024612 }"
      :zoom="12"
      :style="`height: ${mapSize.height}; width: ${mapSize.width};`"
    >
    </GmapMap>
  </div>
</template>

<script>
import { gmapApi } from "gmap-vue";
import { tumiSections } from "./tumi-sections-geojson.js";
export default {
  data() {
    return {
      map: null,
      mapReady: false,
      mapSize: { height: "", width: "" },
      marker: ""
    };
  },
  computed: {
    google: gmapApi
  },

  mounted() {
    this.setGmapContainerSize();
    // we access the map Object
    this.$refs.mapRef.$mapPromise.then(map => {
      this.map = map;
      this.map.panTo({ lat: 37.5326, lng: 127.024612 });

      this.marker = new this.google.maps.Marker({
        position: { lat: 37.5326, lng: 127.024612 },
        map: this.map,
        title: "Hello World!"
      });
      /**
       *  we use loadGeoJson() for url
       *  this.map.data.loadGeoJson("https:// url here /");
       *
       *  we use addGeoJson() for direct
       *  this.map.data.addGeoJson({ object here })
       */

      this.map.data.addGeoJson(tumiSections);
      this.map.data.setStyle({
        fillColor: "green",
        strokeWeight: 1
      });
      console.log(tumiSections);
    });
  },

  methods: {
    setGmapContainerSize() {
      const h = this.$refs.gmapContainer.clientHeight;
      const w = this.$refs.gmapContainer.clientWidth;
      this.mapSize.height = h + "px";
      this.mapSize.width = w + "px";
      this.mapReady = true;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
