<template>
  <div class="bg-white" ref="gmapContainer">
    <!-- Heart buttons | cone | GPS -->
    <action-buttons
      @accessUserLocation="getCurrentPosition"
      @showArea="showHideArea"
      :hide-cone="getMapMode == 'redevelop-area'"
      :disable-heart="disableHeart"
    />
    <!-- Google Map Starts -->
    <GmapMap
      ref="mapRef"
      :center="getMapCenter"
      :zoom="getMapZoom"
      :style="`height: ${mapSize.height}; width: ${mapSize.width};`"
      :options="getMapOptions">

      <gmap-info-window
        v-for="(m, index) in $store.state.estate.distinct_houses"
        :key="index"
        :options="infoOptions"
        :position="m.position"
        :opened="showInfoWindow && showEstates"
        @closeclick="infoWinOpen = false"
        class="q-pa-lg">

        <info-top-content :marker="m" />

        <info-window-content
          @viewArea="viewArea(m)"
          :price="m.price_avg"
          :count="m.count"
          :badges="{
            type_sale: m.type_sale,
            type_house: m.type_house,
            area: m.area_common,
          }" />

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
          v-for="(m, index) in $store.state.estate.simple_houses"
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
        :key="'area' + i"
        :marker="badge.center"
      >
        <div class="area-badge-info notosanskr-medium" v-if="showAreaBadges">
          <q-icon size="20px" class="q-mr-xs">
            <img src="~assets/icons/area-info.svg" alt="area-info" />
          </q-icon>
          {{ badge.title | truncate(15) }}
        </div>
      </gmap-custom-marker>
      <!-- Users Location Marker-->
      <!-- <gmap-custom-marker :marker="getUserLocation" v-if="getUserLocation">
        <div class="user-marker"></div>
      </gmap-custom-marker> -->
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
import { toQueryString } from 'src/utils';
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
      areaItems: [],
      showAreaBadges: true,
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
          maxZoom: 14,
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
          maxZoom: 14,
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
          maxZoom: 14,
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
    ...mapGetters('area', ['getMapAreas']),
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

    console.log('getSimpleHousesgetSimpleHousesgetSimpleHouses');
    this.$store.dispatch('getSimpleHouses');

    this.map.addListener("idle", _ => {
      const center = this.map.getCenter();
      this.changeMapCenter({
        lat: center.lat(),
        lng: center.lng()
      })
      if (this.showInfoWindow && this.showEstates) {
        this.getDistinctHouses();
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
        this.getDistinctHouses();
      }
      setTimeout(() => {
        this.showAreaBadges = this.map.getZoom() > 15 && this.getMapMode === 'redevelop-area';
        this.showInfoWindow = this.map.getZoom() > 15;
        this.disableHeart = this.map.getZoom() < 15;
        // console.log(this.map.getZoom());
      }, 500);
    });
    // Load geojson if any
    this.geojson && this.setMapGeojson(this.geojson);
    // Load Areas if mode is redevelop-area
    if (this.getMapAreas.length && this.getMapMode === 'redevelop-area') {
      this.setMapAreas(this.getMapAreas);
    }

    this.markers = this.$store.state.estate.simple_houses;
  },

  watch: {
    getUserLocation(newVal) {
      this.markUsersLocation(newVal)
      this.goToLocation(newVal);
    }
  },

  methods: {
    // have access to vuex actions
    ...mapActions("map", ["changeMapZoom", "changeMapCenter"]),
    ...mapActions("area", ["fetchMapAreas", "changeMapSelectedArea"]),
    ...mapActions(["changeUserLocation"]),

    getDetailHouses() {
      const bounds = this.map.getBounds();
      this.$store.dispatch('getDetailHouses', toQueryString({
        latitude: [bounds.getSouthWest().lat(), bounds.getNorthEast().lat()],
        longitude: [bounds.getSouthWest().lng(), bounds.getNorthEast().lng()],
        ...this.$store.state.search
      }));
    },
    getDistinctHouses() {
      const bounds = this.map.getBounds();
      this.$store.dispatch('getDistinctHouses', toQueryString({
        latitude: [bounds.getSouthWest().lat(), bounds.getNorthEast().lat()],
        longitude: [bounds.getSouthWest().lng(), bounds.getNorthEast().lng()],
        ...this.$store.state.search
      }));
      console.log(this.$store.state);
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
          lat: Number(area.latitude),
          lng: Number(area.longitude)
        };
        const style = {
          strokeColor: "#FF5100",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#0BCDC7",
          fillOpacity: 0.35
        };
        let item = null;

        if (area.redevelopment_area_locations && area.redevelopment_area_locations.length >= 1) {
          const paths = []
          for (var i = 0; i < area.redevelopment_area_locations.length; i++) {
            const redevelopmentAreaLocation = area.redevelopment_area_locations[i]
            paths.push({ lat: Number(redevelopmentAreaLocation.lat), lng: Number(redevelopmentAreaLocation.lng)})
          }
          item = new this.google.maps.Polygon({
            ...style,
            paths: paths,
            map: this.map,
            center
          });
          this.areaBadges.push({ title: area.title, center }); // create area badge
        } else {
          item = new this.google.maps.Circle({
            ...style,
            map: this.map,
            center,
            radius: area.radius || 200
          });
          this.areaBadges.push({ title: area.title, center }); // create area badge
        }
        if (this.getMapMode === 'redevelop-area') {
          item.addListener("click", _ => {
            this.changeMapSelectedArea(area);
            let { latitude: lat, longitude: lng } = area;
            lat = Number(lat)
            lng = Number(lng)
            this.goToLocation({ lat, lng });
          });
        }
        this.areaItems.push(item);
        this.showAreaBadges = true;
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
    viewArea(item) {
      this.map.panTo(item.position);
      this.map.addListener("idle", () => {
        this.changeMapZoom(16);
        this.changeMapCenter(item.position);
        this.$router.push({ name: 'map_list_sale', params: { type: 'location', position: item.position } });
      });
    },
    typeForHouse(type) {
      if (type === "land") return "for_sale_land";
      if (type === "apartment") return "map_list_sale";
      // if (type === "apartment") return "for_sale_apartment";
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
      Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(position => {
        const { latitude: lat, longitude: lng } = position.coords;
        // console.log("Current", lat, lng);
        this.changeUserLocation({ lat, lng });
      }).catch(e => {
        console.log(e, "error");
      });
    },
    async showHideArea(value) {
      if (!value) {
        // if value is false; remove area from map
        this.areaItems.forEach((item) => {
          item.setMap(null)
        });
        this.areaItems = [];
        this.showAreaBadges = false;
        console.log('Areas are hidden :(')
      } else if (value && this.getMapAreas.length) {
        // if value is true; have area in store;
        this.setMapAreas(this.getMapAreas);
        console.log('showing areas...')
      } else{
        console.log('fetching areas from server...')
        await this.fetchMapAreas();
        this.getMapAreas.length && this.setMapAreas(this.getMapAreas);
      }
    },
    markUsersLocation(position = { lat, lng}) {
      new this.google.maps.Circle({
        strokeColor: "#FF5100",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#FF7D36",
        fillOpacity: 0.35,
        map: this.map,
        center: position,
        radius: 50
      });
      new this.google.maps.Marker({
        icon: {
          url: "/icons/marker.png",
          size: new google.maps.Size(30, 30),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(12, 15),
          scaledSize: new google.maps.Size(25, 25)
        },
        position,
        map: this.map,
        title: "Hello World!",
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

</style>
