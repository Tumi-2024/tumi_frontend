<template>
  <div class="q-mt-sm" style="max-width: 1000px">
    <real-estate-post :item="firstInsight"></real-estate-post>
    <real-estate-list-items :items="otherInsights"></real-estate-list-items>
    <real-estate-footer></real-estate-footer>
  </div>
</template>

<script>
import {
  RealEstatePost,
  RealEstateListItems,
  RealEstateFooter
} from "src/components/RealEstateComponents/MarketOutlook";
export default {
  name: "InsightPage",
  components: {
    "real-estate-post": RealEstatePost,
    "real-estate-list-items": RealEstateListItems,
    "real-estate-footer": RealEstateFooter
  },
  data() {
    return {
      tab: null
    };
  },
  async created() {
    if (this.$route.params && this.$route.params.tab) {
      this.tab = this.$route.params.tab;
    }
    this.$store.dispatch("getEstate");
    this.$store.dispatch("getPolicy");
    this.$store.dispatch("getMarket");
  },
  computed: {
    insightsResults() {
      if (this.$route.query.tab === "estate") {
        return this.$store.getters.estateInsights;
      } else if (this.$route.query.tab === "policy") {
        return this.$store.getters.policyInsights;
      } else if (this.$route.query.tab === "market") {
        return this.$store.getters.marketInsights;
      } else {
        return this.$store.getters.estateInsights;
      }
    },
    firstInsight() {
      if (this.insightsResults && this.insightsResults.length >= 1) {
        return this.insightsResults[0];
      } else {
        return null;
      }
    },
    otherInsights() {
      return this.insightsResults.slice(1);
    }
  }
};
</script>

<style lang="scss" scoped>
.sort-section {
  .q-btn {
    font-size: 14px;
    line-height: 44px;
    text-align: center;
    letter-spacing: -1.05px;
    color: #707070;
  }
  .q-separator {
    // margin-top: 20px;
    height: 14px;
  }
}
</style>
