<template>
  <div class="bg-white" ref="gmapContainer">
    <naver-maps
      ref="naverMap"
      class="naver-map"
      :mapOptions="{
        zoom: 17,
        draggable: false,
        disableTwoFingerTapZoom: true,
        disableDoubleClickZoom: true,
        disableDoubleTapZoom: true,
        pinchZoom: false,
        scrollWheel: false
      }"
    >
      <naver-polygon
        :key="`detail-polygon`"
        :paths="[polygon]"
        :options="{
          strokeColor: '#FF5100',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#0BCDC7',
          fillOpacity: 0.35
        }"
      ></naver-polygon>
      <naver-marker :lat="Number(position.lat)" :lng="Number(position.lng)">
        <info-window-content
          :price="estate.group_trading_terms.price_selling_hope"
          :item="estate"
          :badges="{
            type_sale: estate.type_sale,
            type_house: estate.type_house,
            area: estate.pyeong
          }"
        />
      </naver-marker>
    </naver-maps>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import InfoWindowContent from "../MapCityComponents/InfoWindowContent";
export default {
  components: {
    InfoWindowContent
  },
  props: {
    position: Object,
    polygon: {
      type: Array,
      default: null
    },
    estate: Object
  },
  data() {
    return {
      map: null,
      mapSize: { height: "", width: "" },
      infoOptions: {
        pixelOffset: { width: 0, height: -35 },
        disableAutoPan: true
      }
    };
  },
  computed: {
    ...mapGetters("map", ["getMapOptions"])
  },

  async mounted() {
    this.$refs.naverMap.setCenter(
      this.position.lat * (1 - 0.000005),
      this.position.lng
    );
  }
};
</script>

<style lang="scss" scoped>
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

.naver-map {
  height: 100%;
}
</style>
