<template>
  <div class="row flex justify-between" style="padding-bottom: 24px">
    <q-btn
      flat
      :key="btnIndex"
      v-for="(btn, btnIndex) of btnGroup"
      class="btn-dash-board full-width"
      :style="{ backgroundColor: btn.backgroundColor }"
      :class="{ 'q-mb-sm': btnIndex < 2 }"
      style="flex: 0 0 calc(50% - 4px)"
      @click="btn.func"
    >
      <!-- @click="btn.func()" -->
      <p class="btn-title1" v-html="btn.text" />
      <p class="btn-title2" v-html="btn.subText1" />
      <p class="btn-title3" v-html="btn.subText2" />
      <img class="btn-icon" :src="btn.img" />
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
          text: "매물 지도",
          subText1: "지도에서 쉽게",
          subText2: `매물 찾기`,
          img: require("assets/iconsNew/20map.png"),
          func: this.toMapCity
        },
        {
          backgroundColor: "#3ECCB2",
          text: "정비사업/실거래가 지도",
          subText1: `지도에서 쉽게`,
          subText2: `정비사업/실거래가 찾기`,
          img: require("assets/iconsNew/20Redev.png"),
          func: this.toRedevelopmentArea
        },
        {
          backgroundColor: "#FF7D36",
          text: "매물/실거래가 검색",
          subText1: "매물/실거래가",
          subText2: `상세 검색하기`,
          img: require("assets/iconsNew/search.png"),
          func: () => this.$router.push({ name: "map_list_sale" })
        },
        {
          backgroundColor: "#5893F7",
          text: "부동산<br />인사이트",
          img: require("assets/iconsNew/20InSight.png"),
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
      this.$router.push({ name: "map_city" });
      this.$store.dispatch("map/resetMap");
    },
    toRedevelopmentArea() {
      this.$router.push({ name: "map_city_area" });
    },
    getCurrentPosition() {
      Geolocation.getCurrentPosition({ enableHighAccuracy: true })
        .then((position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          this.changeUserLocation({ lat, lng });
        })
        .catch((e) => {
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
  margin-top: calc((16 / 1312) * 100vh);
  margin-left: calc((16 / 1312) * 100vh);

  font-size: calc((21 / 1312) * 100vh);
  text-align: left;
  font-family: "notosanskr-medium";
}

.btn-title2 {
  position: absolute;
  top: 0;
  left: 0;
  margin-top: calc((50 / 1312) * 100vh);
  margin-left: calc((16 / 1312) * 100vh);
  font-size: calc((14 / 1312) * 100vh);
  font-family: "notosanskr-regular";
  text-align: left;
}

.btn-title3 {
  position: absolute;
  top: 0;
  left: 0;
  margin-top: calc((72 / 1312) * 100vh);
  margin-left: calc((16 / 1312) * 100vh);
  font-size: calc((14 / 1312) * 100vh);
  font-family: "notosanskr-regular";
  text-align: left;
}
.btn-icon {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 108px;
  margin-right: 20px;
  width: calc((40 / 1312) * 100vh);
}
</style>
