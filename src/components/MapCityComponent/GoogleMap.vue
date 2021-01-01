<template>
  <div class="bg-white" ref="gmapContainer">
    <GmapMap
      ref="mapRef"
      :center="{ lat: 37.5326, lng: 127.024612 }"
      :zoom="12"
      :style="`height: ${mapSize.height}; width: ${mapSize.width};`"
      :options="mapOptions"
    >
      <gmap-cluster
        :zoomOnClick="true"
        :grid-size="gridSize"
        :styles="clusterStyles"
        :maxZoom="12"
        :minimumClusterSize="1"
        @click="clusterClicked"
      >
        <gmap-marker
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center = m.position"
          :key="index"
        ></gmap-marker>
      </gmap-cluster>
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
      mapOptions: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        scrollwheel: true,
        fullscreenControl: false,
        disableDefaultUI: true
      },
      mapReady: false,
      mapSize: { height: "", width: "" },
      /* MARKERS */
      markers: [
        { position: { lat: 37.426, lng: 127.024612 } },
        { position: { lat: 37.426, lng: 127.024642 } },
        { position: { lat: 37.6326, lng: 127.024612 } },
        { position: { lat: 37.6346, lng: 127.023612 } },
        { position: { lat: 37.6926, lng: 127.024612 } },
        { position: { lat: 37.6356, lng: 127.023112 } },
        { position: { lat: 37.6926, lng: 127.024612 } },
        { position: { lat: 37.676, lng: 127.124612 } },
        { position: { lat: 37.61226, lng: 127.324612 } },
        { position: { lat: 37.6326, lng: 127.224612 } },
        { position: { lat: 37.5326, lng: 127.00131 } },
        { position: { lat: 37.5396, lng: 127.021692 } },
        { position: { lat: 37.5316, lng: 127.011672 } },
        { position: { lat: 37.5326, lng: 127.09131 } },
        { position: { lat: 37.5396, lng: 127.091692 } },
        { position: { lat: 37.5316, lng: 127.091672 } },
        { position: { lat: 37.5316, lng: 127.094672 } }
      ],
      /* CLUSTERS */
      gridSize: 144,
      clusterStyles: [
        {
          textColor: "white",
          fontWeight: 900,
          textAlign: "center",
          maxZoom: 15,
          textSize: 20,
          url: "icons/map-red-circle.png",
          height: 144,
          width: 144,
          anchorText: [30, -30]
        }
      ]
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

      // apply options to map
      this.map.setOptions({
        zoomControlOptions: {
          position: this.google.maps.ControlPosition.RIGHT_CENTER
        }
      });
      // apply click event on map
      this.map.addListener("click", e => {
        /**
         *  access click event
         */
      });

      const marker = new this.google.maps.Marker({
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
      // apply styles on geojson layers
      this.map.data.setStyle(function(feature) {
        const color = feature.getProperty("numbers") > 1 ? "cyan" : "green";
        return { fillColor: color, strokeColor: color, strokeWeight: 1 };
      });
    });
  },

  methods: {
    setGmapContainerSize() {
      const h = this.$refs.gmapContainer.clientHeight;
      const w = this.$refs.gmapContainer.clientWidth;
      this.mapSize.height = h + "px";
      this.mapSize.width = w + "px";
      this.mapReady = true;
    },
    clusterClicked(e) {
      setTimeout(() => {
        this.map.setZoom(16);
        this.$nextTick(() => {
          const center = this.map.getCenter();
          const lat = center.lat();
          const lng = center.lng();
          console.log(lat, lng, this.map.getZoom());
        });
      }, 500);
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped></style>
