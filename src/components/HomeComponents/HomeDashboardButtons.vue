<template>
  <div class="row flex justify-between" style="padding-bottom: 24px;">
    <q-btn
      flat
      :key="btnIndex"
      v-for="(btn, btnIndex) of btnGroup"
      class="btn-dash-board full-width"
      :style="{ backgroundColor: btn.backgroundColor }"
      :class="{ 'q-mb-sm': btnIndex < 2 }"
      style="flex: 0 0 calc(50% - 4px);"
      @click="btn.func"
    >
      <!-- @click="btn.func()" -->
      <p class="btn-title1" v-html="btn.text" />
      <p class="btn-title2" v-html="btn.subText" />
      <q-icon class="btn-icon" :name="btn.img" />
    </q-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Plugins } from "@capacitor/core";
const { Geolocation } = Plugins;
export default {
  data() {
    return {
      text: null,
      btnGroup: [
        {
          backgroundColor: "#4B62DE",
          text: "추천 매물",
          subText: "지도에서 쉽게<br/>추천매물 찾기",
          img: "img:icons/home-page-icon/4btns/1.svg",
          func: this.toMapCity
        },
        {
          backgroundColor: "#3ECCB2",
          text: "재개발 구역",
          subText: `지도에서 쉽게<br/>재개발구역과 실거래가 찾기`,
          img: "img:icons/home-page-icon/4btns/3.svg",
          func: this.toRedevelopmentArea
        },
        {
          backgroundColor: "#FF7D36",
          text: "매물 급매",
          subText: "투미매물<br/>상세 검색하기",
          img: "img:icons/home-page-icon/4btns/2.svg",
          func: () => this.$router.push({ name: "map_list_sale" })
        },
        {
          backgroundColor: "#5893F7",
          text: "부동산<br />인사이트",
          img: "img:icons/home-page-icon/4btns/4.svg",
          func: () => this.$router.push("/insights/부동산팁")
        }
      ]
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
      Geolocation.getCurrentPosition({ enableHighAccuracy: true })
        .then(position => {
          const { latitude: lat, longitude: lng } = position.coords;
          // console.log("Current", lat, lng);
          this.$store.dispatch("map/resetMap");
          this.changeMapCenter({ lat, lng });
          this.$router.push({ name: "map_city" });
        })
        .catch(e => {
          console.log(e, "error");
        });
    },
    toRedevelopmentArea() {
      this.$router.push({ name: "map_city_area" });
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
