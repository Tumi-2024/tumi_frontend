<template>
  <div>
    <google-map class="map" />
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
    <area-information :informations="areaInformation" class="q-mt-sm" />
    <more-information
      transactionType="토지매매"
      landArea="2,275m² (688평)"
      buildingArea="375m² (113평)"
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
    <similar-transaction :lists="similarTransactions" />
    <div class="q-py-lg"></div>
  </div>
</template>

<script>
import {
  GoogleMap,
  DetailSummary,
  AreaInformation,
  MoreInformation,
  RedevelopmentInformation,
  RecentPricing,
  SimilarTransaction
} from "components/MapForSaleComponents";
export default {
  components: {
    DetailSummary,
    AreaInformation,
    MoreInformation,
    RedevelopmentInformation,
    RecentPricing,
    SimilarTransaction,
    "google-map": GoogleMap
  },
  data() {
    return {
      areaInformation: [
        {
          // land Area
          label: "대지면적",
          value: "2,275m²",
          icon: "land-area.svg"
        },
        {
          // building area
          label: "건물면적",
          value: "375m²",
          icon: "building-area.svg"
        },
        {
          // rental status
          label: "임대현황",
          value: "",
          icon: "rent.svg"
        },
        {
          // progress
          label: "진행단계",
          value: "준공인가",
          icon: "progress.svg"
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
          value: "",
          icon: "premium-price.svg"
        }
      ],
      salePrice: {
        value: "118억 5,420만",
        date: "2015년 06월"
      },
      similarTransactions: [
        {
          date: "2020.06.20",
          address: "전농동60-17",
          unitPrice: "1,157만 / 평",
          landPriceRatio: "114.8%"
        },
        {
          date: "2020.04.01",
          address: "전농동",
          unitPrice: "1,157만 / 평",
          landPriceRatio: "378%"
        },
        {
          date: "2020.03.24",
          address: "전농동60-195",
          unitPrice: "970만 / 평",
          landPriceRatio: "140.2%"
        },
        {
          date: "2020.03.15",
          address: "전농동60-120",
          unitPrice: "1,010만 / 평",
          landPriceRatio: "140.2%"
        },
        {
          date: "2020.01.15",
          address: "전농동61-110",
          unitPrice: "1,010만 / 평",
          landPriceRatio: "140.2%"
        }
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
