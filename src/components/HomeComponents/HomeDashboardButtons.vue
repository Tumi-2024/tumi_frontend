<template>
  <div class="row flex justify-between" style="padding-bottom: 24px; gap: 8px">
    <q-btn
      flat
      :key="btnIndex"
      v-for="(btn, btnIndex) of btnGroup"
      class="btn-dash-board full-width"
      :style="{ backgroundColor: btn.backgroundColor }"
      style="flex: 1 0 calc(50% - 4px)"
      @click="btn.func"
    >
      <!-- @click="btn.func()" -->
      <div class="absolute" style="top: 0; left: 0">
        <p class="btn-title1" v-html="btn.text" />
        <p class="btn-title2" v-html="btn.subText1" />
        <p class="btn-title3" v-html="btn.subText2" />
      </div>
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
          text: "매물 검색",
          subText1: "매물",
          subText2: `상세 검색하기`,
          img: require("assets/iconsNew/search.png"),
          func: () => this.$router.push({ name: "listHouses" })
        },
        {
          backgroundColor: "green",
          text: "실거래가 검색",
          subText1: "실거래가",
          subText2: `상세 검색하기`,
          img: require("assets/iconsNew/20InSight.png"),

          func: () => this.redirectListTransaction()
        },
        {
          backgroundColor: "#ce93d8",
          text: "부동산 인사이트",
          func: () => this.$router.push("/insights/?tab=estate")
        }
      ]
    };
  },
  methods: {
    ...mapActions("map", ["changeMapMode", "changeMapZoom", "initMapCenter"]),

    toMapCity() {
      this.$router.push({ name: "map_city" });
      this.initMapCenter();
      this.changeMapZoom(12);
    },
    toRedevelopmentArea() {
      this.$router.push({ name: "map_city_area" });
      this.initMapCenter();
      this.changeMapZoom(12);
    },
    redirectListTransaction() {
      this.$router.push({ name: "listTransactions" });
      this.initMapCenter();
      this.changeMapZoom(12);
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

<style lang="scss">
.btn-dash-board {
  @media (max-width: 599px) {
    min-height: 90px;
  }
  @media (min-width: 600px) {
    min-height: 140px;
  }

  color: #fff;
  border-radius: 12px;
  &:not(:last-child) {
    @media (max-width: 599px) {
      min-height: 150px;
    }
    @media (min-width: 600px) {
      min-height: 180px;
    }
  }
}

.btn-title1 {
  @media (max-width: 599px) {
    font-size: 13px;
    margin: 10px 0 10px 10px;
  }
  @media (min-width: 600px) {
    font-size: 18px;
    margin: 20px 0 15px 20px;
  }
  text-align: left;
  font-family: "notosanskr-medium";
}

.btn-title2 {
  @media (max-width: 599px) {
    font-size: 12px;
    margin: 0 0 0 10px;
  }
  @media (min-width: 600px) {
    font-size: 15px;
    margin: 0 0 0 20px;
  }

  font-family: "notosanskr-regular";
  text-align: left;
}

.btn-title3 {
  @media (max-width: 599px) {
    font-size: 12px;
    margin: -5px 0 0 10px;
  }
  @media (min-width: 600px) {
    font-size: 15px;
    margin: -5px 0 0 20px;
  }
  font-family: "notosanskr-regular";
  text-align: left;
}
.btn-icon {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: calc((40 / 1312) * 100vh);
}
</style>
