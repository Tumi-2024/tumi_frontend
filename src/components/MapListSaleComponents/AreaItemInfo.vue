<template>
  <div class="column" style="width: 100%">
    <div
      class="row"
      style="width: 100%; height: 40px"
      v-if="getMainInfo.length"
    >
      <div
        v-for="(row, rIndex) of getMainInfo"
        class="col-sm-6 col-12"
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
    </div>
    <div class="row q-mt-xs q-mt-lg-md">
      <span
        v-for="(row, rIndex) of getSubInfo"
        class="flex col-sm-3 col-lg-3 col-12"
        :class="`col-sm-${col}`"
        :key="`col-${rIndex}`"
      >
        <span class="col-text">{{ row.label }}:&nbsp;&nbsp;&nbsp;</span>
        <span class="col-text value">{{ row.value }}</span>
      </span>
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
      const { group_location: location, group_price: price } = this.item;

      return [
        {
          label: "사업명",
          value:
            location?.redevelopment_area?.title ||
            location?.redevelopment_area?.category
        },
        {
          label: "프리미엄",
          value: toMoneyString(price?.price_premium)
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
        group_individual_household: householdInfo,
        group_price: priceInfo,
        group_trading_terms: terms
        // group_location: locationInfo
      } = this.item;

      // const dateRights = locationInfo.redevelopment_area?.category_date_rights
      //   ?.replace("권리산정기준일 : ", "")
      //   .replace("년 ", "-")
      //   .replace("월 ", "-")
      //   .replace("일", "");
      // size_land_area_m2
      // size_land_area

      // size_dedicated_area_m2
      // size_gross_floor_area
      const daejiArea = () => {
        console.log(houseInfo);
        if (
          householdInfo.size_land_area_m2 ||
          houseInfo.size_land_area ||
          householdInfo.size_dedicated_area_m2 ||
          houseInfo.size_gross_floor_area
        ) {
          return `${Math.round(
            householdInfo.size_land_area_m2 || houseInfo.size_land_area
          )} / ${Math.round(
            householdInfo.size_dedicated_area_m2 ||
              houseInfo.size_gross_floor_area
          )}`;
        }
        return undefined;
      };
      return [
        {
          label: "물건 종류",
          value: houseInfo.type_house
        },
        {
          label: "매매,전세 가격",
          value: toMoneyString(terms.price_selling_hope)
        },
        {
          label: "총 층수",
          value: householdInfo.count_floor_total
        },
        {
          label: "해당 층수",
          value: householdInfo.num_floor
        },
        {
          label: "대지 지분",
          value: "대지지분"
        },
        {
          label: "전용/공급 면적",
          value: `${householdInfo.size_dedicated_area_m2}m²/${householdInfo.size_supply_area_m2}m²`
        },
        {
          label: "방향(거실 기준)",
          value: householdInfo.type_direction
        },
        {
          label: "방수/욕실수",
          value: `${householdInfo.count_room}/${householdInfo.count_bathroom}`
        },
        { label: "사용승인일", value: getLabel(houseInfo.date_approval_use) },
        {
          label: "입주 가능일",
          value: terms.date_due_hope
        },
        {
          label: "주차대수",
          value: `${
            houseInfo.count_parking_down + houseInfo.count_parking_up
          } 대`
        },
        {
          label: "관리비",
          value: `${Math.floor(householdInfo.price_maintenance / 10000)}만원`
        }

        // {
        //   label: "대지/건물 면적",
        //   value: `${getLabel(daejiArea(), "m²")}`
        // },
        // {
        //   label: "총 세대수",
        //   value: getLabel(houseInfo.count_household, "세대")
        // },
        // {
        //   label: "부동산 소유자 수",
        //   value: getLabel(houseInfo.count_owner, "명")
        // },
        // {
        //   label: "해당 층수",
        //   value: getLabel(houseInfo.type_floor, "층")
        // },
        // { label: "입주년차", value: getLabel(houseInfo.year_tenancy, "년차") },
        // { label: "사용승인일", value: getLabel(houseInfo.date_approval_use) },
        // {
        //   label: "감정평가액",
        //   value: getLabel(toMoneyString(priceInfo.price_appraised), "")
        // },
        // {
        //   label: "초기투자금",
        //   value: getLabel(toMoneyString(priceInfo.price_initial_investment), "")
        // }
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
