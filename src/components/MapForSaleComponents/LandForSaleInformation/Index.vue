<template>
  <q-card flat>
    <q-card-section class="q-pa-md heading-title">
      토지 매물정보
    </q-card-section>

    <sale-summary />

    <q-separator spaced />

    <sale-more-information />
  </q-card>
</template>

<script>
import SaleSummary from "./SaleSummary";
import SaleMoreInformation from "./SaleMoreInformation";
export default {
  name: "land-for-sale-information",
  components: {
    SaleSummary,
    SaleMoreInformation
  },
  props: {},
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.heading-title {
  font-family: "notosanskr-medium";
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
}
</style>
