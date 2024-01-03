<template>
  <div class="bg-white" ref="gmapContainer">
    <!-- Heart buttons | cone | GPS -->
    <action-buttons
      @accessUserLocation="getCurrentPosition"
      :disable-heart="getMapZoom > 16"
      @showArea="showHideArea"
    />
    {{ getMapCenter }}
    {{ getMapZoom }}
    <naver-maps
      ref="naverMapRef"
      class="page-container"
      :mapOptions="{
        ...mapOptions,
        zoom: this.getMapZoom
      }"
      v-on="{
        dragend: dragEnd,
        dragstart: dragStart,
        load: idle,
        zoom_changed: zoomChanged
      }"
    >
      <!-- 각 구 별 매물/실거래가 보여주기 -->
      <div v-for="m in simple_houses" :key="'d' + m.title + getColor.bg + m.id">
        <template v-if="getMapZoom < 16">
          <naver-marker :lat="Number(m.latitude)" :lng="Number(m.longitude)">
            <div
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
              @mousedown="onClickMarker(m)"
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
                style="font-weight: 700; font-size: calc((8 / 1000) * 100vh)"
              >
                {{
                  $route.path === "/map/city"
                    ? `${m.count_estates_filtered}`
                    : `${
                        getAreaType === "재개발"
                          ? m.count_redevelopment_area_1
                          : getAreaType === "재건축"
                          ? m.count_redevelopment_area_2
                          : getAreaType === "기타사업"
                          ? m.count_redevelopment_area_3
                          : m.count_redevelopment_area
                      }`
                }}개
                <!-- ({{ m.count_estates_filtered_implicit }}) -->
              </span>
            </div>
          </naver-marker>
        </template>
        <template v-else-if="getMapZoom === 15 || getMapZoom === 16">
          <naver-marker :lat="Number(m.latitude)" :lng="Number(m.longitude)">
            <div
              style="
                position: relative;
                width: 15px;
                height: 15px;
                border-radius: 100%;
              "
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
      <!-- @load="(e) => onAreaInfoLoad(e, m)" -->
    </naver-maps>
    <!-- 재개발 구역 보여주기 -->
    <template v-if="getMapZoom > 13">
      <template v-for="badge in getAreaBadges">
        <naver-polygon
          :key="`${badge.id}-polygon`"
          :paths="[badge.path]"
          :options="badge.options"
        ></naver-polygon>
        <naver-marker
          v-if="getMapZoom > 14"
          :key="`${badge.id}-marker`"
          :lat="badge.center.lat"
          :lng="badge.center.lng"
        >
          <template>
            <div
              class="area-badge-info notosanskr-medium"
              :class="`bg-${getBadgeColor(badge)}`"
              @mouseup.self="selectArea(badge)"
            >
              <q-icon
                v-if="$route.path === '/map/city/area'"
                size="20px"
                class="q-mr-xs"
              >
                <img src="~assets/icons/area-info.svg" alt="area-info" />
              </q-icon>
              <div
                @click.prevent="() => redirectList(badge)"
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
          </template>
        </naver-marker>
      </template>
    </template>
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

const { Geolocation } = Plugins;

export default {
  components: {
    // "info-top-content": InfoTopContent,
    "info-window-content": InfoWindowContent,
    "action-buttons": ActionButtons
  },
  data() {
    return {
      redevZoom: 15,
      map: null,
      mapSize: { height: "", width: "" },
      isShowCluster: true,
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
            return "green";
          // case "일반":
          // case "기타":
          //   return "purple";
          default:
            return "purple-4";
        }
      };
    },
    getColor() {
      switch (this.getAreaType) {
        case "재개발":
          return { text: "white", bg: "rgb(255, 90, 0)", tagClass: "primary" };
        case "재건축":
          return { text: "white", bg: "#2196F3", tagClass: "blue" };
        case "일반":
          return {
            text: "white",
            bg: "#A155B8",
            tagClass: "purple"
          };
        case "가로모아":
          return {
            text: "white",
            bg: "rgba(0, 128, 0, 0.8)",
            tagClass: "green"
          };
        case null:
          return { text: "black", bg: "#ffff00", tagClass: "primary" };
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
          { key: "SINGLE", label: "단독다가구" },
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
            case "가로주택":
              colors = { ...colors, stroke: "#52C41A", fill: "#52C41A" };
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
  async mounted() {
    const naverMap = this.$refs.naverMapRef.map;
    naverMap.setZoom(this.getMapZoom);
    naverMap.setCenter(this.getMapCenter);
    this.idle();
    // this.changeMapCenter({
    //   lat: naverMap.center._lat,
    //   lng: naverMap.center._lng
    // });
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
      "changeMapCenter",
      "setLocationLoading",
      "setMapZoom",
      "setMapCenter"
    ]),

    ...mapActions("area", ["fetchMapAreas", "changeMapSelectedArea"]),
    ...mapActions(["changeUserLocation"]),

    onClickMarker(item) {
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
      this.changeMapSelectedArea(null);
    },
    dragEnd(e) {
      const { center } = this.$refs.naverMapRef.map;
      this.changeMapCenter({
        lng: center.lng(),
        lat: center.lat()
      });
      this.idle();
    },
    zoomChanged(zoomLevel) {
      this.setMapZoom(zoomLevel);
      this.idle();
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
      const bounds = this.$refs.naverMapRef.map.bounds;
      this.getHouseInfo(bounds);
      this.getRedevInfo(bounds);
    },

    async getRedevInfo(bounds) {
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
    getHouseInfo(bounds) {
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
            this.getMapMode === "redevelop-area"
              ? "transaction_groups"
              : "houses",
          ...boundLocation
        };
        console.log(payload, "payload");
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
      console.log(
        this.$route.path === "/map/city/area" ? "transaction" : "house"
      );
      this.$router.push(getRouterParams());
    },
    goToLocation(center = { lat: 0, lng: 0 }) {
      // this.map.setZoom(16);
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
          position,
          map: this.map
        }))();
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
  min-height: calc(100vh - 118px);
}
</style>
