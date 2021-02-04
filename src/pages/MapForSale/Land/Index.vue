<template>
  <div>
    <google-map class="map" setMapAreaView />
    <detail-summary />
    <land-for-sale-information class="q-mt-sm" />
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
    <redevelopment-information
      class="q-mt-sm"
      :items="redevelopmentInformations"
    />
    <recent-transaction-price class="q-mt-sm" />
  </div>
</template>

<script>
import {
  DetailSummary,
  LandForSaleInformation,
  MoreInformation,
  RedevelopmentInformation,
  RecentTransactionPrice
} from "components/MapForSaleComponents";
import { GoogleMap } from "components/MapCityComponent";
export default {
  components: {
    DetailSummary,
    LandForSaleInformation,
    MoreInformation,
    RecentTransactionPrice,
    RedevelopmentInformation,
    "google-map": GoogleMap
  },
  data() {
    return {
      redevelopmentInformations: [
        {
          title: "추진위원회 승인",
          date: "2004.07.20"
        },
        {
          title: "정비구역지정",
          date: "2005.05.19"
        },
        {
          title: "조합설립인가",
          date: "2005.05.19"
        },
        {
          title: "시공사",
          date: null
        },
        {
          title: "사업시행인가",
          date: "2005.05.19"
        },
        {
          title: "관리처분인가",
          date: "2005.05.19"
        },
        {
          title: "착공",
          date: "2005.05.19"
        },
        {
          title: "일반분양",
          date: null
        },
        {
          title: "준공인가",
          date: "2005.05.19"
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
