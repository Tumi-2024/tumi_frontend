<template>
  <q-card>
    <q-card-section class="heading-title"> 단지/건물 정보 </q-card-section>
    <q-card-section class="bg-white">
      <div class="row q-pb-md">
        <div class="col-sm-6 col-12 q-px-sm">
          <span class="information">K-APT 아파트명: &nbsp;</span>
          <span class="information sub">{{
            estate.group_building_house.title_apartment_k_apt
          }}</span>
        </div>
        <div class="col-sm-6 col-12 q-px-sm">
          <span class="information">K-APT 단지코드: &nbsp;</span>
          <span class="information sub">{{
            estate.group_building_house.code_complex_k_apt || "-"
          }}</span>
        </div>
      </div>
      <div class="row table">
        <div
          class="col-md-4 col-sm-6 col-12 row"
          v-for="(item, i) of getInfo"
          :key="i"
        >
          <div class="q-pa-sm label">
            <span class="information">{{ item.label }}</span>
          </div>
          <a
            class="information sub flex items-center q-px-sm"
            :href="`tel:${item.value}`"
            v-if="item.phone"
            >{{ item.value }}</a
          >
          <span class="information flex items-center q-px-sm" v-else>{{
            item.value
          }}</span>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  computed: {
    getInfo() {
      const { group_building_house: houseInfo } = this.estate;
      return [
        {
          label: "동 (개)수",
          value: `${houseInfo.count_building ?? "-"}개 동`
        },
        { label: "세대 수", value: `${houseInfo.count_household ?? "-"} 세대` },
        {
          label: "층수 (지상/지하)",
          value: `지상 ${houseInfo.count_floor_up ?? ""}층 / 지하 ${
            houseInfo.count_floor_down ?? "-"
          }층`
        },
        {
          label: "주차대수 (지상/지하)",
          value: `지상 ${houseInfo.count_parking_up ?? ""}개 / 지하 ${
            houseInfo.count_parking_down ?? "-"
          }개`
        },
        { label: "엘리베이터 수", value: `${houseInfo.count_elevator ?? "-"}` },
        { label: "사용승인일", value: houseInfo.date_approval_use },
        { label: "대지면적 (m²)", value: `${houseInfo.size_land_area ?? "-"}` },
        {
          label: "연면적 (m²)",
          value: `${houseInfo.size_gross_floor_area ?? "-"}`
        },
        {
          label: "건축면적 (m²)",
          value: `${houseInfo.size_building_area ?? "-"}`
        },
        { label: "난방방식", value: `${houseInfo.type_heating ?? "-"}` },
        { label: "용적률", value: `${houseInfo.percentage_floor_area ?? "-"}` },
        {
          label: "건폐율",
          value: `${houseInfo.percentage_building_cover ?? "-"}`
        },
        { label: "시행사", value: `${houseInfo.title_executor ?? "-"}` },
        {
          label: "시공사 (건설사)",
          value: `${houseInfo.title_contractor ?? "-"}`
        },
        { label: "분양형태", value: `${houseInfo.description_sale ?? "-"}` },
        { label: "복도유형", value: `${houseInfo.type_corridor ?? "-"}` },
        {
          label: "주건물구조",
          value: `${this.estate.group_land_use.type_structure_building ?? "-"}`
        },
        {
          label: "역세권",
          value: `${houseInfo.description_station_area ?? "-"}`
        },
        {
          label: "관리사무소 연락처",
          value: `${houseInfo.call_management_office ?? "-"}`
        },
        {
          label: "부대복리시설",
          value: `${houseInfo.types_incidental_welfare_facilities ?? "-"}`
        },
        {
          label: "매물담당자",
          value: `${this.estate.group_etc.staff_name ?? "-"}`
        },
        {
          label: "담당자 연락처",
          value: `${this.estate.group_etc.staff_contact ?? "-"}`,
          phone: true
        }
      ];
    }
  },
  props: {
    estate: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
.table {
  border-top: 2px solid #555555;
  border-bottom: 1px solid #e9e9e9;
  > .row {
    @media (max-width: 599px) {
      &:not(:nth-last-child(-n + 1)) {
        border-bottom: 1px solid #e9e9e9;
      }
    }
    &:not(:nth-last-child(-n + 2)) {
      border-bottom: 1px solid #e9e9e9;
    }
    > .label {
      background-color: #f6f6f6;
      width: 160px;
    }
  }
}
.information {
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -1.05px;
  color: #1a1a1a;
  margin-left: 0px;
  &.sub {
  }
}
.heading-title {
  font-family: "nanum-square";
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
}
</style>
