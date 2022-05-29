<template>
  <div>
    <div class="row q-mt-md q-col-gutter-sm">
      <div class="items-center">
        <p class="title1">"주택유형별" 지도로 찾기</p>
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

    <div class="row q-mt-sm q-col-gutter-sm">
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
          valueTransaction: "APARTMENT",
          valueHouse: "아파트"
        },
        {
          icon: require("assets/iconsNew/12.png"),
          label: "연립/다세대",
          valueTransaction: "ALLIANCE",
          valueHouse: "연립ￜ다세대"
        },
        {
          icon: require("assets/iconsNew/13.png"),
          label: "단독/다가구",
          valueTransaction: "SINGLE",
          valueHouse: "단독ￜ다가구"
        },
        {
          icon: require("assets/iconsNew/14.png"),
          label: "원룸/오피스텔",
          valueTransaction: "OFFICETEL",
          valueHouse: "오피스텔"
        },
        {
          icon: require("assets/iconsNew/16.png"),
          label: "상업업무용",
          valueTransaction: "COMMERCIAL",
          valueHouse: "상업ￜ업무용"
        },
        {
          icon: require("assets/iconsNew/15.png"),
          label: "토지",
          valueTransaction: "LAND",
          valueHouse: "토지"
        },
        {
          icon: require("assets/iconsNew/17.png"),
          label: "무허가 건축물",
          valueTransaction: "noname01",
          valueHouse: "무허가 건축물"
        },
        {
          icon: require("assets/iconsNew/18.png"),
          label: "입주권",
          valueTransaction: "noname02",
          valueHouse: "입주권"
        }
      ]
    };
  },
  methods: {
    ...mapActions("searchQuery", ["setQuery"]),
    onClick(item) {
      // this.categories = [
      //   {
      //     icon: require("assets/iconsNew/11.png"),
      //     label: "아파트",
      //     valueTransaction: "APARTMENT",
      //     valueHouse: "아파트"
      //   }
      // ];
      this.setQuery([{ key: "categories", data: item }]);
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
  font-family: "notosanskr-regular";
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
