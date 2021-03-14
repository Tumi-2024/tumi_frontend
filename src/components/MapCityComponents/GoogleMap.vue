<template>
  <div class="bg-white" ref="gmapContainer">
    <!-- Heart buttons | cone | GPS -->
    <action-buttons
      @accessUserLocation="getCurrentPosition"
      :hide-cone="getMapMode == 'redevelop-area'"
      :disable-heart="disableHeart"
    />
    <!-- Google Map Starts -->
    <GmapMap
      ref="mapRef"
      :center="getMapCenter"
      :zoom="getMapZoom"
      :style="`height: ${mapSize.height}; width: ${mapSize.width};`"
      :options="getMapOptions"
    >
      <!-- Map Info Windows -->
      <gmap-info-window
        v-for="(m, index) in $store.state.estate.distinct_houses"
        :key="index"
        :options="infoOptions"
        :position="m[0].position"
        :opened="showInfoWindow && showEstates"
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
      <!-- Map Markers -->
      <gmap-cluster
        :zoomOnClick="true"
        :styles="clusterStyles"
        :maxZoom="15"
        :minimumClusterSize="1"
        @click="clusterClicked"
        ref="clusterers"
        v-if="showEstates"
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
      <!-- we generate badges for the Redevelopment Area -->
      <gmap-custom-marker
        v-for="(badge, i) in areaBadges"
        :key="i"
        :marker="badge.center"
      >
        <div class="area-badge-info notosanskr-medium">
          <q-icon size="20px" class="q-mr-xs">
            <img src="~assets/icons/area-info.svg" alt="area-info" />
          </q-icon>
          {{ badge.title }}
        </div>
      </gmap-custom-marker>
      <!-- Users Location Marker-->
      <gmap-custom-marker :marker="getUserLocation" v-if="getUserLocation">
        <div class="user-marker"></div>
      </gmap-custom-marker>
    </GmapMap>
  </div>
</template>

<script>
/** google map components */
import { gmapApi } from "gmap-vue";
import GmapCustomMarker from "vue2-gmap-custom-marker";
/** custom components */
import InfoWindowContent from "./InfoWindowContent";
import InfoTopContent from "./InfoTopContent";
import ActionButtons from "./ActionButtons";
import { mapGetters, mapActions } from "vuex";
/** geolocation */
import { Plugins } from "@capacitor/core";
const { Geolocation } = Plugins;

export default {
  components: {
    "info-top-content": InfoTopContent,
    "info-window-content": InfoWindowContent,
    "action-buttons": ActionButtons,
    "gmap-custom-marker": GmapCustomMarker
  },
  data() {
    return {
      map: null,
      mapSize: { height: "", width: "" },
      /* MARKERS */
      detailMarkers: this.$store.state.estate.detail_houses,
      markers: this.$store.state.estate.simple_houses,
      /** MARKERS SERVE AS AREA BADGE */
      areaBadges: [],
      /* INFO WINDOW */
      infoOptions: {
        // optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: { width: 0, height: -35 },
        // prevent map from moving when showing infoWindow
        disableAutoPan: true
      },
      showInfoWindow: false,
      disableHeart: false,
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
    geojson: {
      type: Object | null,
      default: null
    },
    areas: {
      type: Array | null,
      default: null
    },
    showEstates: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters("map", [
      "getMapMode",
      "getMapZoom",
      "getMapCenter",
      "getMapOptions"
    ]),
    ...mapGetters(["getUserLocation"]),
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
      }
    });

    this.map.addListener("idle", _ => {
      if (this.showInfoWindow && this.showEstates) {
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
      if (this.showInfoWindow && this.showEstates) {
        this.getDetailHouses();
      }
      setTimeout(() => {
        this.showInfoWindow = this.map.getZoom() > 15;
        this.disableHeart = this.map.getZoom() < 15;
        // console.log(this.map.getZoom());
      }, 500);
    });
    // Load geojson if any
    this.geojson && this.setMapGeojson(this.geojson);
    // Load Areas if any
    this.areas && this.setMapAreas(this.areas);

    this.markers = this.$store.state.estate.simple_houses;

    // ask for Users Current Location
    this.getCurrentPosition();
  },

  watch: {
    getUserLocation(newVal) {
      this.goToLocation(newVal);
    }
  },

  methods: {
    // have access to vuex actions
    ...mapActions("map", ["changeMapZoom", "changeMapCenter"]),
    ...mapActions("area", ["changeMapSelectedArea"]),
    ...mapActions(["changeUserLocation"]),

    getDetailHouses() {
      const bounds = this.map.getBounds();
      const longitude = bounds.Qa;
      const latitude = bounds.Va;
      this.$store.dispatch("getDetailHouses", {
        latitude: [latitude["i"], latitude["j"]],
        longitude: [longitude["i"], longitude["j"]]
      });
    },
    setMapGeojson(geojson) {
      /**
       *  we use loadGeoJson() for url
       *  this.map.data.loadGeoJson("https:// url here /");
       *
       *  we use addGeoJson() for direct
       *  this.map.data.addGeoJson({ object here })
       */
      this.map.data.addGeoJson(geojson);
      // apply styles on geojson layers
      this.map.data.setStyle(function(feature) {
        const color = feature.getProperty("areaForSale")
          ? "#0BCDC7"
          : "#DF5103";
        return { fillColor: color, strokeColor: "#FF5100", strokeWeight: 2 };
      });
    },
    setMapAreas(areas) {
      areas.forEach(area => {
        let center = {
          lat: area.latitude,
          lng: area.longitude
        };
        const style = {
          strokeColor: "#FF5100",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#0BCDC7",
          fillOpacity: 0.35
        };
        let areaItem = null;
        // console.log(area.redevelopment_area_locations)
        if (area.redevelopment_area_locations) {
          const c = new this.google.maps.Circle({
            map: this.map,
            center,
            radius: 250
          });
          const bounds = c.getBounds();
          areaItem = new this.google.maps.Rectangle({
            ...style,
            map: this.map,
            bounds: {
              north: bounds.Ra.i, // Ra.i
              south: bounds.Ra.g, // Ra.g
              east: bounds.La.i, // La.i
              west: bounds.La.g // La.g
            }
          });
          this.areaBadges.push({ title: area.title, center }); // create area badge
          c.setMap(null); // remove circle
        } else {
          areaItem = new this.google.maps.Circle({
            ...style,
            map: this.map,
            center,
            radius: 250
          });
        }
        areaItem.addListener("click", _ => {
          this.changeMapSelectedArea(area);
          const { latitude: lat, longitude: lng } = area;
          this.goToLocation({ lat, lng });
        });
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
    },
    goToLocation(center = { lat, lng }) {
      this.map.panTo(center);
      setTimeout(() => {
        this.map.setZoom(17);
      }, 500);
    },
    getCurrentPosition() {
      Geolocation.getCurrentPosition({ enableHighAccuracy: true })
        .then(position => {
          const { latitude: lat, longitude: lng } = position.coords;
          // console.log("Current", lat, lng);
          this.changeUserLocation({ lat, lng });
        })
        .catch(e => {
          console.log(e, "error");
        });
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

.area-badge-info {
  display: flex;
  justify-content: center;
  align-items: center;

  background: #68814e;
  font-weight: 500;
  font-size: 13px;
  line-height: 28px;
  text-align: center;
  letter-spacing: -0.97px;
  color: #ffffff;
  border-radius: 8px;
  padding: 0 8px;
}

.user-marker {
  background: #005de9;
  border-radius: 50%;
  margin: 10px;
  height: 30px;
  width: 30px;

  box-shadow: 0 0 0 0 rgb(4, 130, 248);
  transform: scale(2);
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 153, 255, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 67, 250, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 46, 252, 0);
  }
}
</style>
