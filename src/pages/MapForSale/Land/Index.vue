<template>
  <div>
    <google-map class="map" setMapAreaView />
    <detail-summary
      :tags="{
        type: '아파트',
        redevelopment: true
      }"
      areaName="한남 3구역"
      sales="120억 8천만"
      initialInvestments="100억 5천만"
      :quote="'“상업단지, 돈되는 땅”'"
    />
    <!--  토지 매물정보  -->
    <information-land-for-sale
      landArea="2,275㎡"
      buildingArea="2,275㎡"
      rentalStatus=""
      progress="준공인가"
      connoisseur=""
      right=""
      premiumPrice=""
      class="q-mt-sm"
    />
    <more-information
      transactionType="토지매매"
      landArea="2,275㎡ (688평)"
      buildingArea="375㎡ (113평)"
      commonArea=""
      usageArea="일반상업"
      point="대"
      usageSituation="상업용"
      announcement="2천 115만"
      roadInterface="세로한면(불)"
      terrain="평지"
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
  InformationLandForSale,
  MoreInformation,
  RedevelopmentInformation,
  RecentTransactionPrice
} from "components/MapForSaleComponents";
import { GoogleMap } from "components/MapCityComponent";
export default {
  components: {
    DetailSummary,
    InformationLandForSale,
    MoreInformation,
    RecentTransactionPrice,
    RedevelopmentInformation,
    "google-map": GoogleMap
  }
};
</script>

<style lang="scss" scoped>
.map {
  height: calc(118vh / 375 * 100);
}
</style>
