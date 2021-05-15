<template>
  <div class="row">
    <div
      class="col-6 q-pr-xs q-pb-xs flex justify-center items-center"
    >
      <q-btn
        flat
        @click="toRedevelopmentArea()"
        class="btn-dash-board full-width"
        style="background-color: #3ECCB2"
      >
        <p class="btn-title1">재개발 구역</p>
        <p class="btn-title2">
          지도에서 쉽게 <br />
          재개발 구역 찾기
        </p>
        <q-icon class="btn-icon" name="img:icons/home-page-icon/4btns/3.svg" />
      </q-btn>
    </div>
    <div class="col-6 q-pl-xs q-pb-xs flex justify-center items-center">
      <q-btn
        flat
        @click="toMapCity()"
        class="btn-dash-board full-width"
        style="background-color: #4B62DE"
      >
        <p class="btn-title1">추천 매물</p>
        <p class="btn-title2">
          지도에서 쉽게 <br />
          매물 찾기
        </p>
        <q-icon class="btn-icon" name="img:icons/home-page-icon/4btns/1.svg" />
      </q-btn>
    </div>
    <div class="col-6 q-pr-xs q-pt-xs flex justify-center items-center" style="padding-bottom: 24px">
      <q-btn
        flat
        @click="$router.push({ name: 'map_list_sale' })"
        class="btn-dash-board full-width"
        style="background-color: #FF7D36"
      >
        <p class="btn-title1">매물 검색</p>
        <p class="btn-title2">
          이번주 <br />
          추천급매
        </p>
        <q-icon class="btn-icon" name="img:icons/home-page-icon/4btns/2.svg" />
      </q-btn>
    </div>
    
    <div
      class="col-6 q-pl-xs q-pt-xs flex justify-center items-center"
      style="padding-bottom: 24px"
    >
      <q-btn
        flat
        :to="{ path: '/insights/부동산팁' }"
        class="btn-dash-board full-width"
        style="background-color: #5893F7"
      >
        <p class="btn-title1">부동산<br />인사이트</p>
        <q-icon class="btn-icon" name="img:icons/home-page-icon/4btns/4.svg" />
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Plugins } from "@capacitor/core";
const { Geolocation } = Plugins;
export default {
  data() {
    return {
      text: null
    };
  },
  methods: {
    ...mapActions("map", [
      "changeMapMode",
      "changeMapZoom",
      "changeMapCenter",
      "changeToolbarTitle"
    ]),
    toMapCity() {
      Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(position => {
        const { latitude: lat, longitude: lng } = position.coords;
        // console.log("Current", lat, lng);
        this.$store.dispatch("map/resetMap");
        this.changeMapCenter({ lat, lng });
        this.$router.push({ name: "map_city" });
      }).catch(e => {
        console.log(e, "error");
      });
    },
    toRedevelopmentArea() {
      this.$router.push({ name: "map_city_area" });
    },
    getCurrentPosition() {
      Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(position => {
        const { latitude: lat, longitude: lng } = position.coords;
        // console.log("Current", lat, lng);
        this.changeUserLocation({ lat, lng });
      }).catch(e => {
        console.log(e, "error");
      });
    }
  }
};
</script>

<style>
.btn-dash-board {
  min-height: 180px;
  color: #fff;
  border-radius: 12px;
}

.btn-title1 {
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 16px;
  margin-left: 16px;
  font-size: 21px;
  text-align: left;
  font-family: "notosanskr-medium";
}

.btn-title2 {
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 50px;
  margin-left: 16px;
  font-size: 16px;
  font-family: "notosanskr-regular";
  text-align: justify;
}

.btn-icon {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 108px;
  margin-right: 20px;
  width: 52px;
  height: 52px;
}
</style>
