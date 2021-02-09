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
    <area-information
      :informations="[
        {
          // land Area
          label: '대지면적',
          value: '2,275㎡',
          icon: 'land-area.svg'
        },
        {
          // building area
          label: '건물면적',
          value: '375㎡',
          icon: 'building-area.svg'
        },
        {
          // rental status
          label: '임대현황',
          value: '',
          icon: 'rent.svg'
        },
        {
          // progress
          label: '진행단계',
          value: '준공인가',
          icon: 'progress.svg'
        },
        {
          // connoisseur
          label: '감정가',
          value: '',
          icon: 'connoisseur.svg'
        },
        {
          // Right
          label: '권리가',
          value: '',
          icon: 'right.svg'
        },
        {
          // Premium price
          label: '프리미엄가',
          value: '',
          icon: 'premium-price.svg'
        }
      ]"
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
    <recent-pricing
      :salePrice="salePrice"
      pricePerLandArea="1,130만"
      class="q-pb-md"
    />
    <div class="q-py-lg"></div>
  </div>
</template>

<script>
import {
  DetailSummary,
  AreaInformation,
  MoreInformation,
  RedevelopmentInformation,
  RecentPricing
} from "components/MapForSaleComponents";
import { GoogleMap } from "components/MapCityComponent";
export default {
  components: {
    DetailSummary,
    AreaInformation,
    MoreInformation,
    RedevelopmentInformation,
    RecentPricing,
    "google-map": GoogleMap
  },
  data() {
    return {
      salePrice: {
        value: "118억 5,420만",
        date: "2015년 06월"
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
