<template>
  <div class="bg-white" ref="gmapContainer">
    <!-- Heart buttons | cone | GPS -->
    <action-buttons
      @accessUserLocation="getCurrentPosition"
      :disable-heart="disableHeart"
      @showArea="showHideArea"
    />
    <!-- Google Map Starts -->
    <GmapMap
      ref="mapRef"
      :center="getMapCenter"
      :zoom="getMapZoom"
      :style="`height: ${mapSize.height}; width: ${mapSize.width};`"
      :options="getMapOptions"
    >
      <template v-if="showInfoWindow">
        <gmap-info-window
          v-for="(m, index) in getSimpleHouse"
          :key="index"
          :options="infoOptions"
          :position="m.position"
          :opened="showInfoWindow"
          class="q-pa-lg"
        >
          <info-window-content
            @viewArea="viewArea(m)"
            :item="m"
            :price="getPriceFromText(m)"
            :count="m.count_transactions"
            :badges="{
              category: getCategoryLabel(m.categories || m.type_sale),
              type: getType(m.types || m.group_building_house.type_house),
              trading: false
            }"
            :is-dev="!!m.redevelopment_area"
          />
        </gmap-info-window>
      </template>

      <!-- Map Markers -->
      <gmap-cluster
        :zoomOnClick="true"
        :styles="clusterStyles"
        :maxZoom="17"
        :calculator="calculatorMarker"
        :minimumClusterSize="1"
        @click="clusterClicked"
        ref="clusterers"
        v-if="showEstates"
      >
        <gmap-marker
          v-for="(m, mIndex) in getSimpleHouse"
          :key="`marker-${mIndex}`"
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
    </GmapMap>
  </div>
</template>

<script>
/** google map components */
import { gmapApi } from "gmap-vue";
import GmapCustomMarker from "vue2-gmap-custom-marker";
/** custom components */
import InfoWindowContent from "./InfoWindowContent";
// import InfoTopContent from "./InfoTopContent";
import ActionButtons from "./ActionButtons";
// import { toQueryString } from 'src/utils';
import { mapGetters, mapActions } from "vuex";
/** geolocation */
import { Plugins } from "@capacitor/core";
const { Geolocation } = Plugins;

export default {
  components: {
    // "info-top-content": InfoTopContent,
    "info-window-content": InfoWindowContent,
    "action-buttons": ActionButtons,
    "gmap-custom-marker": GmapCustomMarker
  },
  data() {
    return {
      map: null,
      polygons: [],
      mapSize: { height: "", width: "" },
      /* MARKERS */
      detailMarkers: this.$store.state.estate.detail_houses,
      markers: this.$store.state.estate.simple_houses,
      /** MARKERS SERVE AS AREA BADGE */
      areaBadges: [],
      showAreaBadges: false,
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
          textSize: 18,
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
      ],
      isMounted: false
    };
  },
  props: {
    geojson: {
      type: Object || null,
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
      "getMapOptions",
      "getIsCone"
    ]),
    ...mapGetters("area", ["getMapAreas"]),
    ...mapGetters(["getUserLocation"]),
    ...mapGetters(["simple_houses"]),
    google: gmapApi,
    getType() {
      return value => {
        if (!Array.isArray(value)) {
          return value;
        }
        const types = [
          { key: "all", label: "전체" },
          { key: "SALE", label: "매매" },
          { key: "RENT", label: "전세" }
          // { level: "monthly", label: "월세" }
        ].find(({ key }) => key === value?.[0]);
        if (types) {
          return types.label;
        }
      };
    },
    getCategoryLabel() {
      return value => {
        console.log(value);
        if (!Array.isArray(value)) {
          return value;
        }
        const category = [
          { key: "COMMERCIAL ", label: "상업업무용" },
          { key: "SINGLE", label: "단독다가구" },
          { key: "OFFICETEL", label: "오피스텔" },
          { key: "APARTMENT", label: "아파트" },
          { key: "LAND", label: "토지" },
          { key: "ALLIANCE", label: "연립/다세대" }
        ].find(({ key }) => key === value?.[0]);
        if (category) {
          return category.label;
        }
      };
    },
    getSimpleHouse() {
      return this.$store.state.estate.simple_houses
        .filter(h => {
          return this.getIsCone ? h.redevelopment_area !== null : true;
        })
        .filter(house => {
          const isOnlyRedev = this.getIsCone;
          if (this.getMapMode === "redevelop-area") {
            if (isOnlyRedev) {
              return house.count_transaction_groups_redevelopment_area !== 0;
            } else {
              return house.count_transaction_groups !== 0;
            }
          } else {
            if (isOnlyRedev) {
              return house.count_houses_redevelopment_area !== 0;
            }
            return house.count_houses !== 0;
          }
        });
    }
  },
  async mounted() {
    this.setGmapContainerSize();
    this.map = await this.$refs.mapRef.$mapPromise;

    this.map.panTo(this.getMapCenter);
    this.map.setOptions({
      zoomControlOptions: {
        position: this.google.maps.ControlPosition.RIGHT_TOP
      }
    });
    this.geojson && this.setMapGeojson(this.geojson);

    this.markers = this.$store.state.estate.simple_houses;

    this.map.addListener("tilesloaded", async _ => {
      if (!this.isMounted) {
        this.setLocationLoading(false);
        this.getHouseInfo();
        this.isMounted = true;
        if (this.polygons.length === 0) {
          await this.fetchMapAreas();
          this.initializeRedevelopArea(true);
        }
      }
    });

    this.map.addListener("zoom_changed", _ => {
      this.setLocationLoading(false);
      this.getHouseInfo();
      this.isMounted = true;
    });

    this.map.addListener("dragend", _ => {
      const center = this.map.getCenter();
      this.changeMapCenter({
        lat: center.lat(),
        lng: center.lng()
      });
      this.setLocationLoading(false);
      this.getHouseInfo();
    });
  },

  watch: {
    getUserLocation(newVal) {
      this.markUsersLocation(newVal);
      this.goToLocation(newVal);
    }
  },

  methods: {
    // have access to vuex actions
    ...mapActions(["estate", "setViewRedevOnly"]),
    ...mapActions("map", [
      "changeMapZoom",
      "changeMapCenter",
      "setLocationLoading",
      "setMapMode"
    ]),
    ...mapActions("area", ["fetchMapAreas", "changeMapSelectedArea"]),
    ...mapActions(["changeUserLocation"]),
    onChangeRedev() {
      this.setViewRedevOnly();
    },
    getPriceFromText(obj) {
      console.log(obj);
      if (obj.recent_transactions) {
        const string = obj.recent_transactions[obj.categories[0]].text_price;
        if (string) {
          return Number(string.replace(",", ""));
        } else {
          return 0;
        }
      } else {
        return obj.price_sale;
      }
    },
    calculatorMarker(markers) {
      const { lat, lng } = markers[0].position;
      const {
        count_transaction_groups: group,
        count_transaction_groups_redevelopment_area: groupRedev,
        count_estates: estate,
        count_estates_redevelopment_area: estateRedev
      } = this.simple_houses.find(obj => {
        return (
          Number(obj.latitude) === lat() && Number(obj.longitude) === lng()
        );
      });
      let text;
      if (this.getMapMode === "redevelop-area") {
        if (this.getIsCone) {
          text = groupRedev;
        } else {
          text = group;
        }
      } else {
        if (this.getIsCone) {
          text = estateRedev;
        } else {
          text = estate;
        }
      }
      return { text, index: 0, title: "count" };
    },

    getHouseInfo() {
      const zoomLevel = this.map.getZoom();
      const bounds = this.map.getBounds();
      const location = {
        latitude: [bounds.getSouthWest().lat(), bounds.getNorthEast().lat()],
        longitude: [bounds.getSouthWest().lng(), bounds.getNorthEast().lng()]
      };
      let payload = { type: "city" };
      if (zoomLevel < 13) {
        this.showInfoWindow = false;
      } else if (zoomLevel <= 14) {
        this.showInfoWindow = false;
        payload = { type: "subcity", ...location };
      } else if (zoomLevel <= 17) {
        this.showInfoWindow = false;
        payload = { type: "locations", ...location };
      } else {
        this.showInfoWindow = true;
        payload = {
          type:
            this.getMapMode === "redevelop-area"
              ? "transaction_groups"
              : "houses",
          ...location
        };
      }
      this.$store.dispatch("getSimpleHouses", payload);
      setTimeout(() => {
        this.showAreaBadges = this.getIsCone && zoomLevel > 14;
        this.disableHeart = zoomLevel <= 17;
        if (this.getMapAreas.length) {
          this.setMapAreas();
        }
      }, 500);
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
    async initializeRedevelopArea(visible) {
      this.polygons = this.getMapAreas.map(area => {
        const center = {
          lat: Number(area.latitude),
          lng: Number(area.longitude)
        };

        const isProgress = area.status === "운영";

        const style = {
          strokeColor: isProgress ? "#FF5100" : "gray",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: isProgress ? "#0BCDC7" : "gray",
          fillOpacity: isProgress ? 0.35 : 0.6
        };
        let item = null;

        const paths = area.redevelopment_area_locations.map(obj => {
          return { lat: Number(obj.lat), lng: Number(obj.lng) };
        });

        item = new this.google.maps.Polygon({
          ...style,
          paths: paths,
          map: this.map,
          center,
          visible
        });

        item.addListener("click", _ => {
          this.changeMapSelectedArea(area);
          let { latitude: lat, longitude: lng } = area;
          lat = Number(lat);
          lng = Number(lng);
          this.goToLocation({ lat, lng });
        });
        return item;
      });
      const bounds = this.map.getBounds();

      const getVisible = (lat, lng) =>
        bounds.getSouthWest().lat() < Number(lat) &&
        Number(lat) < bounds.getNorthEast().lat() &&
        bounds.getSouthWest().lng() < Number(lng) &&
        Number(lng) < bounds.getNorthEast().lng();

      this.areaBadges = this.getMapAreas
        .filter(({ latitude: lat, longitude: lng }) => getVisible(lat, lng))
        .map(obj => {
          return {
            center: { lat: Number(obj.latitude), lng: Number(obj.longitude) },
            title: obj.title
          };
        });
    },
    setMapAreas() {
      const bounds = this.map.getBounds();
      const getVisible = (lat, lng) =>
        bounds.getSouthWest().lat() < Number(lat) &&
        Number(lat) < bounds.getNorthEast().lat() &&
        bounds.getSouthWest().lng() < Number(lng) &&
        Number(lng) < bounds.getNorthEast().lng();

      this.areaBadges = this.getMapAreas
        .filter(({ latitude: lat, longitude: lng }) => getVisible(lat, lng))
        .map(obj => {
          return {
            center: { lat: Number(obj.latitude), lng: Number(obj.longitude) },
            title: obj.title
          };
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
        this.map.setZoom(18);
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
        // this.changeMapZoom(18);
        this.changeMapCenter(item.position);
        this.$router.push({
          name:
            this.$route.path === "/map/city/area"
              ? "map_list_sale"
              : "for_sale_apartment",
          query: {
            transactionid:
              this.$route.path === "/map/city/area" ? item.id : undefined,
            sellid: this.$route.path === "/map/city" ? item.id : undefined
          }
        });
      });
    },
    typeForHouse(type) {
      if (type === "land") return "for_sale_land";
      if (type === "apartment") return "map_list_sale";
      // if (type === "apartment") return "for_sale_apartment";
      if (type === "redevelop") return "for_sale_redevelop_estate";
      if (type === "no_redevelop") return "for_sale_no_redevelop_estate";
    },
    goToLocation(center = { lat: 0, lng: 0 }) {
      this.map.panTo(center);
      this.map.setZoom(17);
    },
    getCurrentPosition() {
      Geolocation.getCurrentPosition({ enableHighAccuracy: true })
        .then(position => {
          const { latitude: lat, longitude: lng } = position.coords;
          this.changeUserLocation({ lat, lng });
        })
        .catch(e => {});
    },
    async showHideArea(value) {
      this.getHouseInfo();
      const zoomLevel = this.map.getZoom();
      this.showAreaBadges = this.getIsCone && zoomLevel > 14;
      if (this.getMapMode !== "redevelop-area") {
        this.polygons.forEach(obj => obj.setVisible(!value));
      }
    },
    markUsersLocation(position = { lat: 0, lng: 0 }) {
      (() =>
        new this.google.maps.Circle({
          strokeColor: "#FF5100",
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: "#FF7D36",
          fillOpacity: 0.35,
          map: this.map,
          center: position,
          radius: 50
        }))();

      (() =>
        new this.google.maps.Marker({
          icon: {
            url: "/icons/marker.png",
            size: this.google.maps.Size(30, 30),
            origin: this.google.maps.Point(0, 0),
            anchor: this.google.maps.Point(12, 15),
            scaledSize: this.google.maps.Size(25, 25)
          },
          position,
          map: this.map,
          title: "Hello World!"
        }))();
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
    box-shadow: 0;
    border: 1px solid #d5d5d5;
    border-bottom: 0;
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
