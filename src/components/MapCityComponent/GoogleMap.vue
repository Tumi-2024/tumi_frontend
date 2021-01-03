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
        :styles="clusterStyles"
        :maxZoom="15"
        :minimumClusterSize="1"
        @click="clusterClicked"
        ref="clusterers"
      >
        <gmap-info-window
          v-for="(m, index) in markers"
          :key="index"
          :options="infoOptions"
          :position="m.position"
          :opened="showInfoWindow"
          @closeclick="infoWinOpen = false"
          class="q-pa-none"
        >
          <div class="row" style="width: 192px">
            <q-img
              src="~assets/icons/house_orange.svg"
              spinner-color="white"
              style="height: 20px; max-width: 20px"
              class="q-mr-xs"
            />

            <div class="col">
              <div class="info-heading notosanskr-medium">
                3천만 보증금 / 60만 월세
              </div>
              <div class="row notosanskr-regular">
                <div>단독다가구</div>
                <q-badge
                  color="white"
                  text-color="primary"
                  label="매매
"
                />
              </div>
            </div>
          </div>
        </gmap-info-window>

        <gmap-marker
          v-for="(m, index) in markers"
          :key="'d' + index"
          @click="center = m.position"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          :visible="!showInfoWindow"
        ></gmap-marker>
      </gmap-cluster>
    </GmapMap>
  </div>
</template>

<script>
import { gmapApi } from "gmap-vue";
import { tumiSections, sampleMarkers } from "./tumi-sections-geojson.js";
export default {
  data() {
    return {
      map: null,
      mapZoom: 12,
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
          position: this.google.maps.ControlPosition.RIGHT_TOP
        }
      });
      // apply click event on map
      this.map.addListener("click", e => {
        /**
         *  access click event
         *
         */
        console.log(e.latLng.lat(), e.latLng.lng());
      });
      // apply zoom change listeners
      this.map.addListener("zoom_changed", () => {
        setTimeout(() => {
          this.showInfoWindow = this.map.getZoom() > 15;
        }, 1000);
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
        const color = feature.getProperty("numbers") > 1 ? "#DF5103" : "green";
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
    clusterClicked() {
      setTimeout(() => {
        this.map.setZoom(16);
      }, 500);
    }
  }
};
</script>

<style lang="scss" scoped></style>
