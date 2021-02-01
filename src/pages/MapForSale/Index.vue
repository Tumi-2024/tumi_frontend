<template>
  <div>
    <google-map class="map" setMapAreaView />
    <detail-summary />
    <land-for-sale-information class="q-mt-sm" :payload="availableDashButton" />
    <redevelopment-information class="q-mt-sm" />
    <recent-transaction-price class="q-mt-sm" />
  </div>
</template>

<script>
import {
  DetailSummary,
  LandForSaleInformation,
  RedevelopmentInformation,
  RecentTransactionPrice
} from "components/MapForSaleComponents"
import { GoogleMap } from "components/MapCityComponent"
export default {
  components: {
    DetailSummary,
    LandForSaleInformation,
    RecentTransactionPrice,
    RedevelopmentInformation,
    'google-map': GoogleMap
  },
  computed: {
    availableDashButton () {
      return [
        {
          icon: 'LandForSaleInformationIcons/land_area.svg',
          label: '2,275㎡',
          sub_label: '대지면적'
        },
        {
          icon: 'LandForSaleInformationIcons/building_area.svg',
          label: '375㎡',
          sub_label: '건물면적'
        },
        {
          icon: 'LandForSaleInformationIcons/rent.svg',
          label: null,
          sub_label: '임대현황'
        },
        {
          icon: 'LandForSaleInformationIcons/completion.svg',
          label: '준공인가',
          sub_label: '진행단계'
        },
        {
          icon: 'LandForSaleInformationIcons/connoisseur.svg',
          label: null,
          sub_label: '감정가'
        },
        {
          icon: 'LandForSaleInformationIcons/rights.svg',
          label: null,
          sub_label: '권리가'
        },
        {
          icon: 'LandForSaleInformationIcons/premium_price.svg',
          label: null,
          sub_label: '프리미엄가'
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
.map {
  height: calc(118vh / 375 * 100);
}
</style>
