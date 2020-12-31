<template>
  <div class="q-mt-sm" style="max-width: 1000px;">
    <real-estate-post></real-estate-post>
    <real-estate-list-items></real-estate-list-items>
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
  name: "Recently-Seen",
  components: {
    "real-estate-post": RealEstatePost,
    "real-estate-list-items": RealEstateListItems,
    "real-estate-footer": RealEstateFooter
  },
  data() {
    return {};
  },
  async created () {
    let tab
    if (this.$route.params && this.$route.params.tab) {
      tab = this.$route.params.tab
    }
    const { data: { results: insights } } = await this.$axios.get('/insights?category=' + tab)
    console.log(insights)
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
