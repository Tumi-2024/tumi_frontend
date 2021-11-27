<template>
  <div class="bg-white" ref="gmapContainer">
    <!-- Heart buttons | cone | GPS -->
    <action-buttons
      @accessUserLocation="getCurrentPosition"
      :disable-heart="showInfoWindow"
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
        >
          <info-window-content
            @viewArea="viewArea(m)"
            :item="m"
            :price="getPriceFromText(m)"
            :is-dev="!!m.redevelopment_area"
          />
        </gmap-info-window>
      </template>

      <!-- Map Markers -->
      <gmap-cluster
        :zoomOnClick="true"
        :styles="clusterStyles"
        :maxZoom="16"
        :calculator="calculatorMarker"
        :minimumClusterSize="1"
        ref="clusterers"
        @click="clusterClicked"
      >
        <gmap-marker
          v-for="(m, mIndex) in getSimpleHouse"
          :key="`marker-${mIndex}`"
          :position="m.position"
          :clickable="true"
          :draggable="true"
        />
      </gmap-cluster>
      <!-- we generate badges for the Redevelopment Area -->
      <template v-for="(badge, i) in getAreaBadges">
        <gmap-polygon
          :key="`${badge.title}-${i}-polygon`"
          :paths="badge.path"
          :options="badge.options"
        ></gmap-polygon>
        <gmap-custom-marker
          :key="`${badge.title}-${i}-marker`"
          :marker="badge.center"
        >
          <div
            v-show="!showInfoWindow && getMapZoom >= 14"
            class="area-badge-info notosanskr-medium"
            @click="
              () => {
                test(badge);
              }
            "
          >
            <q-icon size="20px" class="q-mr-xs">
              <img src="~assets/icons/area-info.svg" alt="area-info" />
            </q-icon>
            {{ badge.title | truncate(15) }}
          </div>
        </gmap-custom-marker>
      </template>
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
import { debounce } from "debounce";

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
      mapSize: { height: "", width: "" },
      /* MARKERS */
      detailMarkers: this.$store.state.estate.detail_houses,
      markers: this.$store.state.estate.simple_houses,
      /** MARKERS SERVE AS AREA BADGE */
      showAreaBadges: true,
      /* INFO WINDOW */
      infoOptions: {
        // optional: offset infowindow so it visually sits nicely on top of our marker
        // pixelOffset: { width: 0, height: -35 },
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
          maxZoom: 16,
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
          maxZoom: 16,
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
          maxZoom: 16,
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
      return m => {
        const value = m.types || m?.group_building_house?.type_house;
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
      return (
        this.$store.state.estate.simple_houses
          // .filter(h => {
          //   return this.getIsCone ? h.redevelopment_area !== null : true;
          // })
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
          })
      );
    },
    getAreaBadges() {
      return this.getMapAreas.map(obj => {
        const {
          status,
          category,
          redevelopment_area_locations: redevAreaLocation
        } = obj;
        const isProgress = status === "운영";

        const getStrokeColor = category => {
          switch (category) {
            case "가로주택":
              return "#52c41a";
            case "재건축":
              return "#0050b3";
            default:
              return "#FF5100";
          }
        };
        return {
          center: { lat: Number(obj.latitude), lng: Number(obj.longitude) },
          title: obj.title,
          path: redevAreaLocation.map(obj => {
            return { lat: Number(obj.lat), lng: Number(obj.lng) };
          }),
          options: {
            strokeColor: getStrokeColor(category),
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: isProgress ? "#0BCDC7" : "gray",
            fillOpacity: isProgress ? 0.35 : 0.6
          },
          ...obj
        };
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
    this.map.addListener("idle", async _ => {
      this.$store.dispatch("initSimpleHouses");

      debounce(() => {
        this.setLocationLoading(false);
        this.getHouseInfo();
      }, 500)();
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
      "setMapZoom",
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
    test(area) {
      this.changeMapSelectedArea(area);
    },
    getPriceFromText(obj) {
      if (obj.recent_transactions) {
        const string = obj.recent_transactions[obj.types[0]].text_price;
        return string ? Number(string.replace(",", "")) : 0;
      } else if (obj.group_price) {
        return obj.group_price.price_expected;
      }
    },
    calculatorMarker(markers) {
      if (this.simple_houses.length === 0) {
        return { text: "", index: 0, title: "count" };
      }
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
      const isRedev = this.getMapMode === "redevelop-area";
      if (this.getIsCone) {
        text = isRedev ? groupRedev : estateRedev;
      } else {
        text = isRedev ? group : estate;
      }
      return { text, index: 0, title: "count" };
    },
    async getRedevInfo({ latitude: lat, longitude: lng }) {
      const rangeQuery = `latitude__range=${lat[0]},${lat[1]}&longitude__range=${lng[0]},${lng[1]}`;
      await this.fetchMapAreas(rangeQuery);
    },
    clusterClicked() {
      setTimeout(() => {
        this.map.setZoom(18);
      }, 500);
    },
    getHouseInfo() {
      const bounds = this.map.getBounds();
      const zoomLevel = this.map.getZoom();
      const location = {
        latitude: [bounds.getSouthWest().lat(), bounds.getNorthEast().lat()],
        longitude: [bounds.getSouthWest().lng(), bounds.getNorthEast().lng()]
      };

      const redevLocation = {
        latitude: [
          bounds.getSouthWest().lat() * 0.9999,
          bounds.getNorthEast().lat() * 1.0001
        ],
        longitude: [
          bounds.getSouthWest().lng() * 0.9999,
          bounds.getNorthEast().lng() * 1.0001
        ]
      };

      this.getRedevInfo(redevLocation);
      let payload = { type: "subcity", ...location };
      if (zoomLevel <= 16) {
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
    setGmapContainerSize() {
      const { clientHeight: h, clientWidth: w } = this.$refs.gmapContainer;

      this.mapSize.height = h + "px";
      this.mapSize.width = w + "px";
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
      if (type === "redevelop") return "for_sale_redevelop_estate";
      if (type === "no_redevelop") return "for_sale_no_redevelop_estate";
    },
    goToLocation(center = { lat: 0, lng: 0 }) {
      this.map.panTo(center);
      this.map.setZoom(15);
    },
    getCurrentPosition() {
      Geolocation.getCurrentPosition({ enableHighAccuracy: true })
        .then(position => {
          const { latitude: lat, longitude: lng } = position.coords;
          this.changeUserLocation({ lat, lng });
        })
        .catch(e => {});
    },
    async showHideArea() {
      this.getHouseInfo();
      this.showAreaBadges = !this.showAreaBadges;
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
    overflow: hidden !important;
    box-shadow: 0;
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
