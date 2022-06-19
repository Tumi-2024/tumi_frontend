<template>
  <div class="column" style="flex: 1">
    <div class="row items-center">
      <template v-for="(row, rIndex) of getMainInfo">
        <div
          class="justify-start align-start col-4 flex"
          style="flex: 1 1 auto"
          :key="`col-${rIndex}`"
        >
          <span class="col-text main title"
            >{{ row.label }} :&nbsp;&nbsp;&nbsp;</span
          >
          <q-icon size="16px" v-if="row.isDirection">
            <img src="~assets/icons/sun.svg" />
          </q-icon>
          <span class="col-text main desc">{{ row.value }}</span>
        </div>
      </template>
    </div>
    <div class="row q-mt-md q-mt-lg-lg">
      <template v-for="(row, rIndex) of getSubInfo">
        <span
          class="flex col-sm-4 col-xs-6"
          :class="`col-sm-${col}`"
          :key="`col-${rIndex}`"
        >
          <span class="col-text">{{ row.label }}:&nbsp;&nbsp;&nbsp;</span>
          <span class="col-text value">{{ row.value }}</span>
        </span>
      </template>
    </div>
  </div>
</template>
<script>
import { toKr } from "src/utils";

export default {
  props: {
    item: Object,
    infoProps: Array,
    subInfoProps: Array,
    col: String
  },
  methods: {
    toKr
  },
  computed: {
    getMainInfo() {
      if (this.infoProps) {
        return this.infoProps;
      }
      const { group_building_house: houseInfo, group_location: location } =
        this.item;

      return [
        {
          label: "재개발 세부유형",
          value: location.redevelopment_area.subcategory
        },
        {
          label: "현재 추진 단계",
          value: location.redevelopment_area.redevelopment_step
        },
        { label: "해당 층수", value: houseInfo.count_floor_up }
      ];
    },
    getSubInfo() {
      if (this.subInfoProps) {
        return this.subInfoProps;
      }
      const getLabel = (value, unit) => {
        if (!value || Number.isNaN(value) || value === "NaN") {
          return "-";
        } else if (typeof value === "string" && value.indexOf("비공개") > -1) {
          return value;
        } else {
          return value.toLocaleString() + unit;
        }
      };
      // 총 세대수 [임대세대]
      // 부동산 소유자 수 없음
      // 분양 신청 평수 없음

      // 초기투자금
      // 감정평가액
      // 권리산정기준일

      // 토지/건물 면적 (m2)
      // 건축년도 (준공일)
      // 시공사
      const { group_building_house: houseInfo, group_price: priceInfo } =
        this.item;
      return [
        {
          label: "총 세대수",
          value: getLabel(houseInfo.count_household, "세대")
        },
        {
          label: "부동산 소유자 수",
          value: getLabel(houseInfo.count_owner, "명")
        },
        {
          label: "난방방식",
          value: `${getLabel(priceInfo.price_initial_investment, "만원")}`
        },
        { label: "사용승인일", value: getLabel(houseInfo.date_approval_use) }
        // {
        //   label: "대지면적 (㎡)",
        //   value: `${houseInfo.size_land_area ?? "-"}㎡`
        // },
        // {
        //   label: "연면적 (㎡)",
        //   value: `${houseInfo.size_gross_floor_area ?? "-"}㎡`
        // },
        // {
        //   label: "건축면적 (㎡)",
        //   value: `${houseInfo.size_building_area ?? "-"}㎡`
        // },
        // {
        //   label: "주건물구조",
        //   value: `${this.item.group_land_use.type_structure_building ?? "-"}`
        // }
      ];
    }
  }
};
</script>
<style lang="scss">
.col-text {
  color: #444444;
  align-self: center;
  font-size: 12px;
  &.value {
    font-weight: 500;
  }
  &.main {
    font-size: 13px;
    &.title {
      font-weight: bold;
    }
  }
}
</style>
