<template>
  <div>
    <google-map class="map" setMapAreaView />
    <detail-summary />
    <land-for-sale-information class="q-mt-sm"  />
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
};
</script>

<style lang="scss" scoped>
.map {
  height: calc(118vh / 375 * 100);
}
</style>
