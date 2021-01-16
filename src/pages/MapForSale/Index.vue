<template>
  <div>
    <google-map class="map" />
    <sale-title />
    <land-for-sale-information class="q-mt-sm"/>
  </div>
</template>

<script>
import { SaleTitle, LandForSaleInformation } from "components/MapForSaleComponents"
import { GoogleMap } from "components/MapCityComponent"
export default {
  components: {
    SaleTitle,
    LandForSaleInformation,
    'google-map': GoogleMap
  }
};
</script>

<style lang="scss" scoped>
.map {
  height: calc(118vh / 375 * 100);
}
</style>
