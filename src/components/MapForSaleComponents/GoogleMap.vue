<template>
  <div class="bg-white" ref="gmapContainer">
    <GmapMap
      ref="mapRef"
      :center="{
        lat: position.lat,
        lng: position.lng
      }"
      :zoom="17"
      :style="`height: ${mapSize.height}; width: ${mapSize.width};`"
      :options="getMapOptions"
    >
      <!-- THIS IS INFO WINDOW -->
      <gmap-info-window
        :options="infoOptions"
        :position="{ lat: position.lat, lng: position.lng }"
        opened
        class="q-pa-lg"
        v-if="estate"
      >
        <!-- INPUT DESIRED CONTENTS -->
        <!-- <info-top-content :marker="{}" /> -->
        <info-window-content
          :price="estate.group_price.price_expected || 123123"
          :item="estate"
          :badges="{
            type_sale: estate.type_sale,
            type_house: estate.type_house,
            area: estate.pyeong
          }"
        />
      </gmap-info-window>
    </GmapMap>
  </div>
</template>

<script>
import { gmapApi } from "gmap-vue";
import { mapGetters } from "vuex";

import InfoWindowContent from "../MapCityComponents/InfoWindowContent";
export default {
  components: {
    InfoWindowContent
  },
  props: {
    position: Object,
    // polygon = [{lat: xxx, lng: xxx}, {lat: xxx, lng: xxx}]
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
    ...mapGetters("map", ["getMapOptions"]),
    google: gmapApi
  },

  async mounted() {
    console.log(this.position.lat, this.position.lng, "position");
    // we access the map Object
    this.map = await this.$refs.mapRef.$mapPromise;
    this.setGmapContainerSize();
    this.map.setOptions({ zoomControl: true, scrollwheel: true });
    this.map.addListener("click", e => {
      /** * access click event */
      console.log(e.latLng.lat(), e.latLng.lng());
    });

    this.setAreaPolygon();
  },

  methods: {
    setGmapContainerSize() {
      const h = this.$refs.gmapContainer.clientHeight;
      const w = this.$refs.gmapContainer.clientWidth;
      this.mapSize.height = h + "px";
      this.mapSize.width = w + "px";
    },
    setAreaPolygon() {
      let path;
      console.log(this.estate);
      if (!this.polygon) {
        // IF THERES NO POLYGON WE CREATE OUR OWN
        const position = new this.google.maps.LatLng(
          this.position.lat,
          this.position.lng
        );
        const coord1 = this.google.maps.geometry.spherical.computeOffset(
          position,
          100,
          100
        );
        const coord2 = this.google.maps.geometry.spherical.computeOffset(
          position,
          -100,
          -100
        );
        const coord3 = this.google.maps.geometry.spherical.computeOffset(
          position,
          100,
          -100
        );
        const coord4 = this.google.maps.geometry.spherical.computeOffset(
          position,
          -100,
          100
        );
        path = [coord1, coord2, coord4, coord3];
      }
      const style = {
        strokeColor: "#FF5100",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0BCDC7",
        fillOpacity: 0.35
      };
      this.area = new this.google.maps.Polygon({
        ...style,
        paths: this.polygon || path,
        map: this.map,
        center: this.position
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
