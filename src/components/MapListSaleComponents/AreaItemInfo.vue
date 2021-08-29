<template>
  <div class="column">
    <div class="row items-center">
      <template v-for="(row, rIndex) of getMainInfo">
        <span
          class="q-pa-xs justify-start align-start"
          style="flex: 1 1 auto;"
          :key="`col-${rIndex}`"
        >
          <span class="col-text main title"
            >{{ row.label }} :&nbsp;&nbsp;&nbsp;</span
          >
          <q-icon size="16px" v-if="row.isDirection">
            <img src="~assets/icons/sun.svg" />
          </q-icon>
          <span class="col-text main desc">{{ row.value }}</span>
        </span>
      </template>
    </div>
    <q-separator
      v-if="(infoProps && infoProps.length > 0) || this.$q.screen.lt.md"
    />
    <div class="row q-mt-sm">
      <template v-for="(row, rIndex) of getSubInfo">
        <span
          class="flex col-sm-3 col-xs-6 q-px-sm"
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
      const { group_building_house: houseInfo } = this.item;
      console.log(houseInfo);
      return [
        { label: "정비사업 종류", value: "정비사업" },
        {
          label: "층수 (지상/지하)",
          value: `지상 ${houseInfo.count_floor_up ??
            ""}층 / 지하 ${houseInfo.count_floor_down ?? "-"}층`
        },
        {
          label: "방향",
          value: `\n ${this.item.group_individual_household.type_direction}`,
          isDirection: true
        },
        { label: "방수/욕실수", value: "3/2" }
      ];
    },
    getSubInfo() {
      if (this.subInfoProps) {
        return this.subInfoProps;
      }
      const { group_building_house: houseInfo } = this.item;
      return [
        { label: "세대 수", value: `${houseInfo.count_household ?? "-"} 세대` },
        { label: "세대당 주차대수", value: "???" },
        { label: "난방방식", value: `${houseInfo.type_heating ?? "-"}` },
        { label: "사용승인일", value: houseInfo.date_approval_use ?? "-" },
        {
          label: "대지면적 (㎡)",
          value: `${houseInfo.size_land_area ?? "-"}㎡`
        },
        {
          label: "연면적 (㎡)",
          value: `${houseInfo.size_gross_floor_area ?? "-"}㎡`
        },
        {
          label: "건축면적 (㎡)",
          value: `${houseInfo.size_building_area ?? "-"}㎡`
        },
        {
          label: "주건물구조",
          value: `${this.item.group_land_use.type_structure_building ?? "-"}`
        }
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
