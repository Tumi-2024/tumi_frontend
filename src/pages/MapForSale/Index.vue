<template>
  <div>
    <google-map class="map" />
    <sale-title />
    <land-for-sale-information class="q-mt-sm" :payload="availableDashButton" />
    <redevelopment-information class="q-mt-sm" />
    <recent-transaction-price class="q-mt-sm" />
  </div>
</template>

<script>
import { SaleTitle, LandForSaleInformation, RedevelopmentInformation, RecentTransactionPrice} from "components/MapForSaleComponents"
import { GoogleMap } from "components/MapCityComponent"
export default {
  components: {
    SaleTitle,
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

<div class="column justify-center content-center items-center">
            <q-icon size="32px">
              <img src="~/assets/icons/LandForSaleInformationIcons/completion.svg"/>
            </q-icon>
            <div class="title q-mt-sm"></div>
            <div class="sub-title q-mt-xs">대지면적</div>
          </div>

<style lang="scss" scoped>
.map {
  height: calc(118vh / 375 * 100);
}
</style>
