<template>
  <div>
    <google-map class="map" setMapAreaView />
    <detail-summary />
    <!--  토지 매물정보  -->
    <information-property
      exclusiveArea="130㎡"
      direction="남서향"
      numberFloors="고층"
      stationArea="서초역"
      connoisseur=""
      right=""
      premiumPrice="1억"
      progress="준공인가"
      class="q-mt-sm"
    />
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
    <recent-transaction-price class="q-mt-sm" />
  </div>
</template>

<script>
import {
  DetailSummary,
  InformationProperty,
  MoreInformation,
  RedevelopmentInformation,
  RecentTransactionPrice
} from "components/MapForSaleComponents";
import { GoogleMap } from "components/MapCityComponent";
export default {
  components: {
    DetailSummary,
    InformationProperty,
    MoreInformation,
    RecentTransactionPrice,
    RedevelopmentInformation,
    "google-map": GoogleMap
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.map {
  height: calc(118vh / 375 * 100);
}
</style>
