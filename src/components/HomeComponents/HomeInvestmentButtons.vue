<template>
  <div>
    <div class="row q-mt-md q-col-gutter-sm">
      <div class="col">
        <p class="title1">"주택유형별" 매물 찾기</p>
      </div>
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
          :to="{ name: 'map_city', query: { category: item.category } }"
        >
          <q-icon class="investment-btn-icon">
            <img
              :src="require(`assets/iconsNew/${item.icon}`)"
              width="24px"
              alt=""
            />
          </q-icon>
          <p class="investment-btn-label">{{ item.label }}</p>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      investments_btn: [
        {
          category: "apartment",
          label: "아파트",
          icon: "11.png"
        },
        {
          category: "alliance",
          label: "연립/다세대",
          icon: "12.png"
        },
        {
          category: "single",
          label: "단독/다가구",
          icon: "13.png"
        },
        {
          category: "officetel",
          label: "원룸/ 오피스텔",
          icon: "14.png"
        },

        {
          category: "commercial",
          label: "상업업무용",
          icon: "16.png"
        },
        {
          category: "land",
          label: "토지",
          icon: "15.png"
        },
        {
          category: "",
          label: "무허가 건축물",
          icon: "17.png"
        },
        {
          category: "",
          label: "입주권",
          icon: "18.png"
        }
      ]
    };
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
