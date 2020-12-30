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
    "real-estate-footer": RealEstateFooter,
  },
  data() {
    return {};
  },
  created() {
    console.log('created')
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
