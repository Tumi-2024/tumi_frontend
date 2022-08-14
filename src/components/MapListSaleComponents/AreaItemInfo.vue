<template>
  <div class="column">
    <div class="row items-center">
      <template v-for="(row, rIndex) of getMainInfo">
        <div
          class="justify-start align-start col-md-6 col-12 flex"
          :key="`col-${rIndex}`"
        >
          <span class="col-text main title"
            >{{ row.label }} :&nbsp;&nbsp;&nbsp;</span
          >
          <q-icon size="16px" v-if="row.isDirection">
            <img src="~assets/icons/sun.svg" />
          </q-icon>
          <span class="col-text main">{{ row.value }}</span>
        </div>
      </template>
    </div>
    <div class="row q-mt-md q-mt-lg-lg">
      <template v-for="(row, rIndex) of getSubInfo">
        <span
          class="flex col-sm-3 col-lg-3 col-12"
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
import { toKr, toMoneyString } from "src/utils";

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
      const { group_location: location } = this.item;

      return [
        {
          label: "세부유형",
          value:
            location.redevelopment_area.category ||
            location.redevelopment_area.category
        },
        {
          label: "현재 추진 단계",
          value: location.redevelopment_area.redevelopment_step
        }
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
          return value.toLocaleString() + (unit || "");
        }
      };

      const {
        group_building_house: houseInfo,
        group_price: priceInfo,
        group_location: locationInfo
      } = this.item;

      const dateRights = locationInfo.redevelopment_area.category_date_rights
        ?.replace("권리산정기준일 : ", "")
        .replace("년 ", "-")
        .replace("월 ", "-")
        .replace("일", "");
      return [
        {
          label: "토지/건축 면적",
          value: `${getLabel(
            `${Math.ceil(houseInfo.size_land_area)} / ${Math.ceil(
              houseInfo.size_building_area
            )}`,
            "m²"
          )}`
        },
        {
          label: "총 세대수",
          value: getLabel(houseInfo.count_household, "세대")
        },
        {
          label: "부동산 소유자 수",
          value: getLabel(houseInfo.count_owner, "명")
        },
        {
          label: "해당 층수",
          value: getLabel(houseInfo.floor_count, "층")
        },
        { label: "권리산정기준일", value: dateRights },
        { label: "사용승인일", value: getLabel(houseInfo.date_approval_use) },
        {
          label: "감정평가액",
          value: getLabel(toMoneyString(priceInfo.price_appraised), "")
        },
        {
          label: "초기투자금",
          value: getLabel(toMoneyString(priceInfo.price_initial_investment), "")
        }
        // {
        //   label: "대지면적 (m²)",
        //   value: `${houseInfo.size_land_area ?? "-"}m²`
        // },
        // {
        //   label: "연면적 (m²)",
        //   value: `${houseInfo.size_gross_floor_area ?? "-"}m²`
        // },
        // {
        //   label: "건축면적 (m²)",
        //   value: `${houseInfo.size_building_area ?? "-"}m²`
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
  font-weight: bold;
  &.value {
    font-weight: 500;
  }
  &.main {
    font-size: 14px;
    &.title {
      font-weight: bold;
      font-size: 15px;
    }
  }
}
</style>
