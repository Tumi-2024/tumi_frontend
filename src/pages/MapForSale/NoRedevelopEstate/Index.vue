<template>
  <div>
    <google-map class="map" setMapAreaView />
    <detail-summary
      :tags="{
        type: '아파트',
        redevelopment: true,
        stageProgress: '추진위원회 승인',
        transactionStatus: '거래완료'
      }"
      areaName="한남 3구역"
      sales="12억 8,500만"
      initialInvestments="6억 5,500만"
      quote='“해당 세대 중 유일하게 야외 정원이 있는 집"'
    />
    <!--  토지 매물정보  -->
    <area-information :informations="propertyInformation" class="q-mt-sm" />
    <more-information
      transactionType="토지매매"
      exclusiveArea="2,275㎡ (688평)"
      commonArea="375㎡ (113평)"
      direction="남서향"
      numberFloors="고층"
      stationArea="역세권"
      elevator="2대"
      numberRooms="3 / 1개"
      heating="개별난방(도시가스)"
      numberHouseholds="36세대(총63세대)"
      administrativeExpenses=""
      usageArea="일반상업"
    />
    <administration-cost :cost="adminCost" class="q-my-sm" />
    <school-section :tabs="schoolTabs" :active="activeSchoolTab" />

    <recent-pricing
      class="q-mt-sm"
      :salePrice="salePrice"
      :charter="charter"
      :extraDetails="extraDetails"
      :areaOptions="areaOptions"
      show-units
      :unit="unit"
    />
  </div>
</template>

<script>
import {
  GoogleMap,
  DetailSummary,
  AreaInformation,
  MoreInformation,
  RedevelopmentInformation,
  AdministrationCost,
  SchoolSection,
  RecentPricing
} from "components/MapForSaleComponents";
export default {
  components: {
    DetailSummary,
    AreaInformation,
    MoreInformation,
    RedevelopmentInformation,
    AdministrationCost,
    SchoolSection,
    RecentPricing,
    "google-map": GoogleMap
  },
  data() {
    return {
      propertyInformation: [
        {
          // exclusive Area
          label: "전용면적",
          value: "130㎡",
          icon: "land-area.svg"
        },
        {
          // direction
          label: "방향",
          value: "남서향",
          icon: "direction.svg"
        },
        {
          // number of floors
          label: "층수",
          value: "고층",
          icon: "number-floors.svg"
        },
        {
          // station-area
          label: "역세권",
          value: "서초역",
          icon: "station-area.svg"
        },
      ],
      adminCost: [
        { label: "여름", value: "28만원", icon: "summer.svg" },
        { label: "겨울", value: "21만원", icon: "windy.svg" },
        { label: "평균", value: "23만원", icon: "average.svg" }
      ],
      // school sections
      schoolTabs: [
        {
          level: "kindergarten",
          label: "유치원",
          schools: [
            { name: "새나라 어린이집", distance: "500M이내" },
            { name: "금모래 유치원", distance: "620M이내" },
            { name: "푸리울 어린이집", distance: "620M이내" },
            { name: "꿈샘 어린이집", distance: "700M이내" },
            { name: "노랑노랑 유치원", distance: "700M이내" }
          ]
        },
        { level: "elementary", label: "초등학교" },
        { level: "middle", label: "중학교" },
        { level: "high", label: "고등학교" }
      ],
      activeSchoolTab: "kindergarten",
      // Recent Actual transactions |  최근 실거래가
      areaOptions: ["35평", "45평"],
      salePrice: { value: "14억 5천만", date: "2020년 06월" },
      charter: { value: "10억 2,580만", date: "2020년 03월" },
      extraDetails: [
        { label: "공급 / 전용 면적", info: "41.76 / 130.28㎡" },
        { label: "시세 갱신일", info: "2020.06.20" }
      ],
      unit: {
        salePrice: {
          below: "13억 8,250만",
          general: "14억 1,750만",
          above: "15억 1,000만"
        },
        charter: {
          below: "10억 4,520만",
          general: "10억 9,500만",
          above: "11억 9,500만"
        },
        monthly: {
          deposit: "2천만",
          rent: "115~120만"
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.map {
  height: calc(118vh / 375 * 100);
}
</style>
