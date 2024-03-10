<template>
  <div class="bg-white" ref="gmapContainer">
    <!-- Heart buttons | cone | GPS -->
    <action-buttons
      @accessUserLocation="getCurrentPosition"
      :disable-heart="getMapZoom > 16"
      @showArea="showHideArea"
    />
    <naver-maps
      ref="naverMapRef"
      class="page-container"
      :mapOptions="{
        zoom: this.getMapZoom,
        ...mapOptions,
        ...this.getMapCenter
      }"
      v-on="{
        dragend: dragEnd,
        dragstart: dragStart,
        load: idle,
        zoom_changed: zoomChanged,
        bounds_changed: boundsChanged
      }"
    >
      <!-- 각 구 별 매물/실거래가 보여주기 -->
      <div v-for="m in simple_houses" :key="'d' + m.title + getColor.bg + m.id">
        <div>
          <template v-if="getMapZoom < 16">
            <naver-marker :lat="Number(m.latitude)" :lng="Number(m.longitude)">
              <div
                v-if="m.title"
                class="flex column justify-center items-center"
                style="
                  min-height: calc((90 / 1312) * 100vh);
                  min-width: calc((90 / 1312) * 100vh);
                  padding: 10px;
                  opacity: 0.72;
                "
                :style="{
                  backgroundColor: getColor.bg,
                  borderRadius: `${
                    $route.path === '/map/city/area' ? '0%' : '100%'
                  }`
                }"
                :class="`text-${getColor.text}`"
                @click="onClickMarker(m)"
              >
                <span
                  class="flex justify-center"
                  style="font-weight: 700; font-size: calc((16 / 1312) * 100vh)"
                >
                  {{ m.title }}
                </span>
                <span
                  class="flex justify-center q-mt-sm"
                  style="font-weight: 700; font-size: calc((12 / 1000) * 100vh)"
                >
                  {{ $route.path === "/map/city" ? `매물` : `정비사업` }}
                </span>
                <span
                  class="flex justify-center"
                  style="font-weight: 700; font-size: calc((12 / 1000) * 100vh)"
                >
                  {{
                    $route.path === "/map/city"
                      ? `${m.count_estates_filtered}`
                      : `${
                          getAreaType === "재개발"
                            ? m.count_redevelopment_area_1
                            : getAreaType === "재건축"
                            ? m.count_redevelopment_area_2
                            : getAreaType === "기타"
                            ? m.count_redevelopment_area - m.count_redevelopment_area_1 - m.count_redevelopment_area_2
                            : m.count_redevelopment_area
                        }`
                  }}개
                </span>
              </div>
            </naver-marker>
          </template>
          <template v-else-if="getMapZoom < 18">
            <naver-marker :lat="Number(m.latitude)" :lng="Number(m.longitude)">
              <div
                style="position: relative; border-radius: 100%"
                :style="{
                  width: getMapZoom !== 17 ? '10px' : '15px',
                  height: getMapZoom !== 17 ? '10px' : '15px'
                }"
                class="radial-gradient"
              ></div
            ></naver-marker>
          </template>
          <template v-else>
            <naver-marker :lat="Number(m.latitude)" :lng="Number(m.longitude)">
              <info-window-content
                @viewArea="viewArea(m)"
                :item="m"
                :price="getPriceFromText(m)"
                :is-dev="!!m.redevelopment_area"
              />
            </naver-marker>
          </template>
        </div>
      </div>
      <!-- @load="(e) => onAreaInfoLoad(e, m)" -->
    </naver-maps>
    <div
      v-for="badge in getAreaBadges"
      :key="`${badge.id}-marker-with-polygon`"
    >
      <template v-if="getMapZoom > 13">
        <naver-marker
          v-if="getMapZoom > 14"
          :id="`${badge.id}-marker`"
          :lat="badge.center.lat"
          :lng="badge.center.lng"
        >
          <div
            class="area-badge-info nanum-square"
            :class="`bg-${getBadgeColor(badge)}`"
            @mouseup="selectArea(badge)"
          >
            <q-icon
              v-if="$route.path === '/map/city/area'"
              size="20px"
              class="q-mr-xs"
            >
              <img src="~assets/icons/area-info.svg" alt="area-info" />
            </q-icon>
            <div
              @mouseup="() => redirectList(badge)"
              v-else
              style="
                max-width: 200px;
                border-radius: 2px;
                background-color: white;
                color: black;
                /* margin-right: 5px; */
              "
              class="items-center justify-center flex"
            >
              <span
                style="
                  font-size: calc((13 / 1312) * 100vh);
                  line-height: calc((15 / 1312) * 100vh);

                  color: #333333;
                  padding: 3px 5px;
                "
              >
                {{ badge.count_estates_filtered }}
              </span>
            </div>
            <span>
              {{ badge.title | truncate(15) }}
            </span>
          </div>
        </naver-marker>
        <naver-polygon
          :paths="[badge.path]"
          :options="badge.options"
        ></naver-polygon>
      </template>
    </div>
    <!-- 재개발 구역 보여주기 -->
  </div>
</template>

<script>
import Vue from "vue";
/** google map components */
import { gmapApi } from "gmap-vue";
/** custom components */
import InfoWindowContent from "./InfoWindowContent";
import ActionButtons from "./ActionButtons";
import { mapGetters, mapActions } from "vuex";
/** geolocation */
import { Plugins } from "@capacitor/core";
import { debounce } from "quasar";

const { Geolocation } = Plugins;

export default {
  components: {
    // "info-top-content": InfoTopContent,
    "info-window-content": InfoWindowContent,
    "action-buttons": ActionButtons
  },
  data() {
    return {
      isDragEnd: true,
      redevZoom: 15,
      map: null,
      mapSize: { height: "", width: "" },
      mapOptions: {
        zoomControl: true,
        zoomControlOptions: {
          position: 7
        }
      }
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
  watch: {
    // getMapCenter(obj) {
    //   const map = this.$refs.naverMapRef.map;
    //   map.panTo(obj);
    //   this.getRedevInfo();
    //   setTimeout(() => {
    //     this.getHouseInfo();
    //   }, 500)
    // }
  },
  computed: {
    ...mapGetters("map", [
      "getMapMode",
      "getMapZoom",
      "getMapCenter",
      "getMapOptions",
      "getAreaType"
    ]),
    ...mapGetters("area", ["getMapAreas"]),
    ...mapGetters(["getUserLocation"]),
    ...mapGetters(["simple_houses"]),
    google: gmapApi,
    getBadgeColor() {
      return ({ category }) => {
        switch (category) {
          case "재개발":
            return "primary";
          case "재건축":
            return "blue";
          case "가로주택":
          case "모아주택":
          case "기타":
            return "green";
          // case "일반":
          //   return "purple";
          default:
            return "green";
        }
      };
    },
    getColor() {
      switch (this.getAreaType) {
        case "재개발":
          return { text: "white", bg: "rgb(255, 90, 0)", tagClass: "primary" };
        case "재건축":
          return { text: "white", bg: "#2196F3", tagClass: "blue" };
        case "기타":
          return {
            text: "white",
            bg: "#A155B8",
            tagClass: "purple"
          };
        case "모아주택":
        case "가로모아":
        case null:
          return {
            text: "white",
            bg: "rgba(0, 128, 0, 0.8)",
            tagClass: "green"
          };
        // return { text: "black", bg: "#ffff00", tagClass: "primary" };
        default:
          return {
            text: "white",
            bg: "rgba(128, 128, 128)",
            tagClass: "primary"
          };
      }
    },
    getIsHouse() {
      return this.$route.path === "/map/city/area";
    },
    getType() {
      return (m) => {
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
      return (value) => {
        if (!Array.isArray(value)) {
          return value;
        }
        const category = [
          { key: "COMMERCIAL ", label: "상업업무용" },
          { key: "SINGLE", label: "단독ￜ다가구" },
          { key: "OFFICETEL", label: "오피스텔" },
          { key: "APARTMENT", label: "아파트" },
          { key: "LAND", label: "토지" },
          { key: "ALLIANCE", label: "연립ￜ다세대" }
        ].find(({ key }) => key === value?.[0]);
        if (category) {
          return category.label;
        }
      };
    },
    getPriceFromText() {
      return (obj) => {
        if (obj.recent_transactions) {
          const string = obj.recent_transactions[obj.types[0]]?.text_price;
          return string ? Number(string.replace(",", "")) : 0;
        } else if (obj.group_trading_terms) {
          return Number(obj.group_trading_terms.price_selling_hope);
        }
      };
    },
    getAreaBadges() {
      if (this.getMapZoom < 14) {
        return [];
      }
      return this.getMapAreas.map((obj) => {
        const {
          status,
          category,
          latitude,
          longitude,
          redevelopment_area_locations: redevAreaLocation
        } = obj;

        let colors = {
          stroke: "#FF5100",
          fill: ""
        };
        const getStrokeColor = (opt) => {
          switch (opt) {
            case "모아주택":
            case "가로주택":
              colors = { ...colors, stroke: "#4caf50", fill: "#4caf50" };
              break;
            case "기타":
              colors = { ...colors, stroke: "#52C41A", fill: "#52C41A" };
              break;
            case "재건축":
              colors = { ...colors, stroke: "#2196F3", fill: "#2196F3" };
              break;
            case "재개발":
              colors = { ...colors, stroke: "#FF9800", fill: "#FF9800" };
              break;
            default:
              colors = { ...colors, stroke: "#7C0170", fill: "#A155B8" };
          }
        };
        getStrokeColor(category);

        const isStop = status !== "운영";
        if (isStop) {
          colors = { ...colors, fill: "#757575" };
        }
        return {
          center: { lat: Number(latitude), lng: Number(longitude) },
          title: obj.title,
          path: redevAreaLocation.map((obj) => ({
            lat: Number(obj.lat),
            lng: Number(obj.lng)
          })),
          count_houses: obj.count_houses,
          options: {
            strokeColor: colors.stroke,
            strokeOpacity: 1,
            strokeWeight: 2,
            fillColor: colors.fill,
            fillOpacity: isStop ? 0.35 : 0.1
          },
          ...obj
        };
      });
    }
  },
  async beforeMount() {
    this.setSimpleHouses([]);
  },
  async mounted() {
    const naverMap = this.$refs.naverMapRef.map;
    naverMap.setZoom(this.getMapZoom);
    this.boundsChanged = debounce(this.boundsChanged, 1000);
    this.changeMapCenter({
      lat: naverMap.center._lat,
      lng: naverMap.center._lng
    });
  },

  methods: {
    // have access to vuex actions
    ...mapActions(["setSimpleHouses"]),

    ...mapActions(["estate", "setViewRedevOnly"]),
    ...mapActions("map", ["changeMapCenter", "setMapZoom", "setMapCenter"]),

    ...mapActions("area", ["fetchMapAreas", "changeMapSelectedArea"]),
    ...mapActions(["changeUserLocation"]),

    onClickMarker(item) {
      if (!this.isDragEnd) return;

      if (this.$route.name === "map_city_area") {
        this.$router.push({
          name: "listTransactions",
          query: {
            subcity: item.id,
            title: item.title
          }
        });
        return;
      }
      this.$router.push({
        name: "listHouses",
        query: {
          subcity: item.id,
          title: item.title
        }
      });
    },

    redirectList(item) {
      // list/houses?redevelopment_area=208
      this.$router.push({
        name: "listHouses",
        query: {
          redevelopment_area: item.id,
          title: item.title
        }
      });
    },
    redirectXYTransaction({ latitude, longitude, title }) {
      const getXYQuery = (latitude, longitude) => {
        if (!latitude || !longitude) {
          return;
        }
        const _acc = 10000 * 1000;

        const _lat = Number(Number(latitude * _acc).toFixed(0));
        const _lng = Number(Number(longitude * _acc).toFixed(0));

        return {
          latitude__range: `${(_lat - 1) / _acc},${(_lat + 1) / _acc}`,
          longitude__range: `${(_lng - 1) / _acc},${(_lng + 1) / _acc}`
        };
      };

      this.$router.push({
        name: "listTransactions",
        query: {
          ...getXYQuery(latitude, longitude),
          title
        }
      });
    },

    redirectXYHouse({ latitude, longitude, title }) {
      const getXYQuery = (latitude, longitude) => {
        if (!latitude || !longitude) {
          return;
        }
        const _acc = 10000 * 1000;

        const _lat = Number(Number(latitude * _acc).toFixed(0));
        const _lng = Number(Number(longitude * _acc).toFixed(0));

        return {
          latitude__range: `${(_lat - 1) / _acc},${(_lat + 1) / _acc}`,
          longitude__range: `${(_lng - 1) / _acc},${(_lng + 1) / _acc}`
        };
      };

      this.$router.push({
        name: "listHouses",
        query: {
          ...getXYQuery(latitude, longitude),
          title
        }
      });
    },
    dragStart() {
      this.isDragEnd = false;
      this.changeMapSelectedArea(null);
    },
    dragEnd(e) {
      this.isDragEnd = true;
      const { center } = this.$refs.naverMapRef.map;
      this.changeMapCenter({
        lng: center.lng(),
        lat: center.lat()
      });
      this.idle();
    },
    zoomChanged(zoomLevel) {
      if (zoomLevel > 13) {
        this.getRedevInfo();
      }
      this.setMapZoom(zoomLevel);
      this.idle();
    },
    boundsChanged(b) {
      this.getRedevInfo(b);
    },
    onChangeRedev() {
      this.setViewRedevOnly();
    },
    async selectArea({ id }) {
      const result = await Vue.prototype.$axios.get(
        `/redevelopment_areas/${id}/`
      );
      this.changeMapSelectedArea(result.data);
    },
    idle(e) {
      this.getHouseInfo();
    },

    async getRedevInfo(bounds = this.$refs.naverMapRef.map.bounds) {
      const ratio = 0.000001;
      const boundLocation = {
        latitude: [
          bounds._sw._lat * (1 + ratio),
          bounds._ne._lat * (1 - ratio)
        ],
        longitude: [
          bounds._sw._lng * (1 + ratio),
          bounds._ne._lng * (1 - ratio)
        ]
      };

      await this.fetchMapAreas({
        latitude__range: `${boundLocation.latitude[0]},${boundLocation.latitude[1]}`,
        longitude__range: `${boundLocation.longitude[0]},${boundLocation.longitude[1]}`
      });
    },
    getHouseInfo() {
      const bounds = this.$refs.naverMapRef.map.bounds;

      const boundLocation = {
        latitude: [bounds._sw._lat, bounds._ne._lat],
        longitude: [bounds._sw._lng, bounds._ne._lng]
      };
      let payload = {
        type: "subcity",
        ...boundLocation
      };

      if (this.getMapZoom > this.redevZoom) {
        payload = {
          type:
            this.$route.name === "map_city_area"
              ? "transaction_groups"
              : "houses",
          ...boundLocation
        };
      }
      this.$store.dispatch("getSimpleHouses", payload);
    },
    setGmapContainerSize() {
      const { clientHeight: h, clientWidth: w } = this.$refs.gmapContainer;

      this.mapSize.height = h + "px";
      this.mapSize.width = w + "px";
    },
    viewArea(item) {
      this.setMapCenter(item.position);

      const getRouterParams = () => {
        /**
         * 여기에 좌표 로직 추가
         */
        if (this.$route.path === "/map/city/area") {
          this.redirectXYTransaction(item);
        } else {
          if (item.count) {
            this.redirectXYHouse(item);
            return;
          }
          return { name: "for_sale_apartment", query: { sellid: item.id } };
        }
      };
      this.$router.push(getRouterParams());
    },
    getCurrentPosition() {
      Geolocation.getCurrentPosition({ enableHighAccuracy: true })
        .then((position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          this.changeUserLocation({ lat, lng });
        })
        .catch((e) => {});
    },
    async showHideArea() {
      this.getHouseInfo();
      this.getRedevInfo();
    }
  }
};
</script>

<style lang="scss" scoped>
.radial-gradient {
  background: radial-gradient(
    red 20%,
    rgb(255, 90, 0) 30%,
    rgba(255, 90, 0, 0.1) 80%
  );
}
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
  white-space: nowrap;
  transform: translate(-50%, -50%);

  &.green {
    background: #68814e;
  }
  background: rgb(255, 125, 54);

  font-weight: 500;
  font-size: calc((16 / 1312) * 100vh);
  line-height: calc((20 / 1312) * 100vh);
  text-align: center;
  letter-spacing: -0.97px;
  color: #ffffff;
  border-radius: 8px;
  padding: calc((4 / 1312) * 100vh) calc((8 / 1312) * 100vh);
}

.page-container {
  background: rgb(54, 54, 54);
  height: calc(100vh - 118px);
}
</style>
