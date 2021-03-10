<template>
  <div class="bg-white" ref="gmapContainer">
    <action-buttons :showAll="showInfoWindow" />
    <GmapMap
      ref="mapRef"
      :center="getMapCenter"
      :zoom="getMapZoom"
      :style="`height: ${mapSize.height}; width: ${mapSize.width};`"
      :options="getMapOptions"
    >
      <gmap-info-window
        v-for="(m, index) in $store.state.estate.distinct_houses"
        :key="index"
        :options="infoOptions"
        :position="m[0].position"
        :opened="showInfoWindow && getMapMode !== 'redevelop-area'"
        @closeclick="infoWinOpen = false"
        class="q-pa-lg"
      >
        <info-top-content :marker="m[0]" />
        <info-window-content :marker="m[0]" />

        <info-window-content
          @viewArea="viewArea(m[0])"
          :price="m[0].price"
          :badges="m[0].badges"
        />
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
import { TUMI_SECTIONS_AREA, TUMI_MARKERS } from "./map-sample-data.js";
import InfoWindowContent from "./InfoWindowContent";
import InfoTopContent from "./InfoTopContent";
import ActionButtons from "./ActionButtons";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    "info-top-content": InfoTopContent,
    "info-window-content": InfoWindowContent,
    "action-buttons": ActionButtons
  },
  data() {
    return {
      map: null,
      mapSize: { height: "", width: "" },
      /* MARKERS */
      detailMarkers: this.$store.state.estate.detail_houses,
      markers: this.$store.state.estate.simple_houses,
      // markers: TUMI_MARKERS,
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
  props: {
    setMapAreaView: {
      type: Boolean,
      default: false
    }
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
    // here we can overide "getMapOptions" values
    this.map.setOptions({
      zoomControlOptions: {
        position: this.google.maps.ControlPosition.RIGHT_TOP
      },
      zoomControl: !this.setMapAreaView,
      scrollwheel: !this.setMapAreaView
    });

    this.map.addListener("idle", _ => {
      if (this.showInfoWindow) {
        this.getDetailHouses();
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
      if (this.showInfoWindow) {
        this.getDetailHouses();
      }
      setTimeout(() => {
        this.showInfoWindow = this.map.getZoom() > 15;
      }, 500);
    });
    /**
     *  we use loadGeoJson() for url
     *  this.map.data.loadGeoJson("https:// url here /");
     *
     *  we use addGeoJson() for direct
     *  this.map.data.addGeoJson({ object here })
     */
    this.map.data.addGeoJson(TUMI_SECTIONS_AREA);
    // apply styles on geojson layers
    this.map.data.setStyle(function(feature) {
      const color = feature.getProperty("areaForSale") ? "#0BCDC7" : "#DF5103";
      return { fillColor: color, strokeColor: "#FF5100", strokeWeight: 2 };
    });

    this.setMapOnFocus();
    this.markers = this.$store.state.estate.simple_houses;
  },

  methods: {
    ...mapActions("map", ["changeMapZoom", "changeMapCenter"]),
    getDetailHouses() {
      const bounds = this.map.getBounds();
      const longitude = bounds.Qa;
      const latitude = bounds.Va;
      this.$store.dispatch('getDetailHouses', {
        latitude: [latitude['i'], latitude['j']],
        longitude: [longitude['i'], longitude['j']]
      });
    },
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
    },
    setMapOnFocus() {
      const query = this.$route.query;
      if (query.onFocus) {
        this.map.setZoom(query.zoom);
        if (query.lat && query.lng) {
          this.map.setCenter({ lat: query.lat, lng: query.lng });
        }
      }
    },
    viewArea({ position, type }) {
      this.map.panTo(position);
      this.map.addListener("idle", () => {
        this.changeMapZoom(16);
        this.changeMapCenter(position);
        this.tpyeForSale(type) &&
          this.$router.push({ name: this.tpyeForSale(type) });
      });
    },
    tpyeForSale(type) {
      if (type === "land") return "for_sale_land";
      if (type === "apartment") return "for_sale_apartment";
      if (type === "redevelop") return "for_sale_redevelop_estate";
      if (type === "no_redevelop") return "for_sale_no_redevelop_estate";
    }
  }
};
</script>

<style lang="scss" scoped>
// make the outer container of info-window transparent
::v-deep .gm-style-iw {
  background: transparent;
  box-shadow: none;
  padding: 30px 3px 0 3px;
  .gm-style-iw-d {
    background: white;
    border-radius: 8px;
    padding: 8px;
    box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.3);
  }
}
// hide the close "x" icon on info window
::v-deep .gm-ui-hover-effect {
  display: none !important;
}
</style>
