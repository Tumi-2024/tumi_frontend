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
    <!-- 재개발 정보 -->
    <redevelopment-information
      approvalPromotionCommittee="2004.07.20"
      designationMaintenanceArea="2005.05.19"
      associationEstablishment="2005.05.19"
      constructorDate=""
      projectImplementationAuthorization="2005.05.19"
      managementDispositionAuthorization="2005.05.19"
      startConstruction="2005.05.19"
      generalSales=""
      completion="2005.05.19"
      class="q-mt-sm"
    />
    <administration-cost :cost="admin_cost" />
    <recent-transaction-price class="q-mt-sm" />
  </div>
</template>

<script>
import {
  DetailSummary,
  AreaInformation,
  MoreInformation,
  RedevelopmentInformation,
  AdministrationCost,
  RecentTransactionPrice
} from "components/MapForSaleComponents";
import { GoogleMap } from "components/MapCityComponent";
export default {
  components: {
    DetailSummary,
    AreaInformation,
    MoreInformation,
    RedevelopmentInformation,
    AdministrationCost,
    RecentTransactionPrice,
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
        {
          // connoisseur
          label: "감정가",
          value: "",
          icon: "connoisseur.svg"
        },
        {
          // Right
          label: "권리가",
          value: "",
          icon: "right.svg"
        },
        {
          // Premium price
          label: "프리미엄가",
          value: "1억",
          icon: "premium-price.svg"
        },
        {
          // progress
          label: "진행단계",
          value: "준공인가",
          icon: "progress.svg"
        }
      ],
      admin_cost: [
        { label: "여름", value: "28만원", icon: "summer.svg" },
        { label: "겨울", value: "21만원", icon: "windy.svg" },
        { label: "평균", value: "23만원", icon: "average.svg" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.map {
  height: calc(118vh / 375 * 100);
}
</style>
