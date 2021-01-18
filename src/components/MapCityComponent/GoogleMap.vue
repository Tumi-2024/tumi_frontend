<template>
  <div class="bg-white" ref="gmapContainer">
    <GmapMap
      ref="mapRef"
      :center="getMapCenter"
      :zoom="getMapZoom"
      :style="`height: ${mapSize.height}; width: ${mapSize.width};`"
      :options="getMapOptions"
    >
      <gmap-info-window
        v-for="(m, index) in markers"
        :key="index"
        :options="infoOptions"
        :position="m.position"
        :opened="showInfoWindow"
        @closeclick="infoWinOpen = false"
      >
        <info-window-content />
      </gmap-info-window>

      <gmap-cluster
        :zoomOnClick="true"
        :styles="clusterStyles"
        :maxZoom="15"
        :minimumClusterSize="1"
        @click="clusterClicked"
        ref="clusterers"
      >
        <gmap-marker
          v-for="(m, index) in markers"
          :key="'d' + index"
          @click="center = m.position"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          :visible="!showInfoWindow"
        />
      </gmap-cluster>
    </GmapMap>
  </div>
</template>

<script>
import { gmapApi } from "gmap-vue";
import { tumiSections, sampleMarkers } from "./map-sample-data.js";
import InfoWindowContent from "./InfoWindowContent";
import { mapGetters } from "vuex";
export default {
  components: {
    "info-window-content": InfoWindowContent
  },
  data() {
    return {
      map: null,
      mapSize: { height: "", width: "" },
      /* MARKERS */
      markers: sampleMarkers,
      /* INFO WINDOW */
      infoOptions: {
        // optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: { width: 0, height: -35 },
        // prevent map from moving when showing infoWindow
        disableAutoPan: true
      },
      showInfoWindow: false,
      /* CLUSTERS */
      clusterStyles: [
        // 1+
        {
          textColor: "white",
          fontWeight: 900,
          textAlign: "center",
          maxZoom: 15,
          textSize: 16,
          url: "icons/map-red-60x60.png",
          height: 60,
          width: 60,
          anchorText: [20, 0],
          gridSize: 60
        },
        // 10+
        {
          textColor: "white",
          fontWeight: 900,
          textAlign: "center",
          maxZoom: 15,
          textSize: 20,
          url: "icons/map-red-84x84.png",
          height: 84,
          width: 84,
          anchorText: [30, 0],
          gridSize: 84
        },
        // 100+
        {
          textColor: "white",
          fontWeight: 900,
          textAlign: "center",
          maxZoom: 15,
          textSize: 24,
          url: "icons/map-red-96x96.png",
          height: 96,
          width: 96,
          anchorText: [30, 0],
          gridSize: 96
        }
      ]
    };
  },
  computed: {
    ...mapGetters("map", [
      "getMapMode",
      "getMapZoom",
      "getMapCenter",
      "getMapOptions"
    ]),
    google: gmapApi
  },

  async mounted() {
    this.setGmapContainerSize();
    // we access the map Object
    this.map = await this.$refs.mapRef.$mapPromise;
    this.map.panTo(this.getMapCenter);
    this.showInfoWindow = this.map.getZoom() > 15;
    // apply options to map
    this.map.setOptions({
      zoomControlOptions: {
        position: this.google.maps.ControlPosition.RIGHT_TOP
      }
    });
    // apply click event on map
    this.map.addListener("click", e => {
      /**
       *  access click event
       */
      console.log(e.latLng.lat(), e.latLng.lng());
    });
    // apply zoom change listeners
    this.map.addListener("zoom_changed", () => {
      setTimeout(() => {
        this.showInfoWindow = this.map.getZoom() > 15;
      }, 500);
    });
    this.markers.push(
      new this.google.maps.Marker({
        position: { lat: 37.5326, lng: 127.024612 },
        map: this.map,
        title: "Hello World!"
      })
    );
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
      const color = feature.getProperty("numbers") > 1 ? "#DF5103" : "#0BCDC7";
      return { fillColor: color, strokeColor: "#FF5100", strokeWeight: 2 };
    });
  },

  methods: {
    setGmapContainerSize() {
      const h = this.$refs.gmapContainer.clientHeight;
      const w = this.$refs.gmapContainer.clientWidth;
      this.mapSize.height = h + "px";
      this.mapSize.width = w + "px";
    },
    clusterClicked() {
      setTimeout(() => {
        this.map.setZoom(16);
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped>
// hide the close "x" icon on info window
div >>> .gm-ui-hover-effect {
  display: none !important;
}
</style>
