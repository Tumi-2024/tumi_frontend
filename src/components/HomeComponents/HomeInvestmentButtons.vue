<template>
  <div>
    <div class="row q-mt-md q-col-gutter-sm">
      <div class="items-center">
        <p class="title1">주택유형 별 지도검색</p>
      </div>
      <q-radio
        style="margin-left: 10px; margin-bottom: 12px"
        dense
        v-model="shape"
        val="house"
        label="매물"
      />
      <q-radio
        style="margin-bottom: 12px"
        dense
        v-model="shape"
        val="transaction"
        label="실거래가"
      />
    </div>

    <div class="row q-mt-sm q-mb-md q-col-gutter-sm">
      <div
        class="col-3 flex justify-center"
        v-for="(item, index) in investments_btn"
        :key="index"
      >
        <q-btn
          flat
          class="investment-btn full-width"
          @click="() => onClick(item)"
        >
          <q-icon class="investment-btn-icon">
            <img :src="item.icon" width="24px" alt="" />
          </q-icon>
          <p class="investment-btn-label">{{ item.label }}</p>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      shape: "house",

      investments_btn: [
        {
          icon: require("assets/iconsNew/11.png"),
          label: "아파트",
          valueTransaction: "아파트",
          valueHouse: "아파트"
        },
        {
          icon: require("assets/iconsNew/14.png"),
          label: "오피스텔",
          valueTransaction: "오피스텔",
          valueHouse: "오피스텔"
        },
        {
          icon: require("assets/iconsNew/13.png"),
          label: "단독다가구",
          valueTransaction: "단독다가구",
          valueHouse: "단독다가구"
        },
        {
          icon: require("assets/iconsNew/12.png"),
          label: "연립다세대",
          valueTransaction: "연립다세대",
          valueHouse: "연립다세대"
        },
        {
          icon: require("assets/iconsNew/16.png"),
          label: "상업업무용",
          valueTransaction: "상업업무용",
          valueHouse: "상업업무용"
        },
        {
          icon: require("assets/iconsNew/15.png"),
          label: "토지",
          valueTransaction: "토지",
          valueHouse: "토지"
        },
        {
          icon: require("assets/iconsNew/17.png"),
          label: "무허가건축물",
          valueTransaction: "무허가건축물",
          valueHouse: "무허가건축물"
        },
        {
          icon: require("assets/iconsNew/18.png"),
          label: "입주권",
          valueTransaction: "입주권",
          valueHouse: "입주권"
        }
      ]
    };
  },
  methods: {
    ...mapActions("search", ["setCategories"]),
    ...mapActions("map", ["setMapZoom", "changeMapCenter"]),
    onClick(item) {
      this.changeMapCenter({
        lng: 126.9816417,
        lat: 37.57037778
      });
      this.setCategories([item.valueTransaction]);
      if (this.shape === "house") {
        this.$router.push({ name: "map_city" });
      } else {
        this.$router.push({ name: "map_city_area" });
      }
    }
  }
};
</script>

<style scoped>
.title1 {
  font-family: "nanum-square-regular";
  font-size: 17px;
}

.investment-btn {
  width: 77px;
  height: 96px;
  background: #fcfcfc;
  border: 1px solid #fdfcfc;
  box-sizing: border-box;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04),
    0px 0px 1px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
}

.investment-btn-icon {
  position: absolute;
  top: 0;
  margin-top: 18px;
  width: 32px;
  height: 32px;
}

.investment-btn-label {
  position: absolute;
  top: 0;
  margin-top: 60px;
  text-align: center;
  font-size: 13px;
}
</style>
