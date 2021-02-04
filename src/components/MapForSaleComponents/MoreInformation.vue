<template>
  <q-card-section class="bg-white">
    <!-- transaction type -->
    <item-more-info label="거래유형" :value="transactionType" />
    <!-- land area -->
    <item-more-info label="대지면적" :value="landArea" />
    <!-- building area -->
    <item-more-info label="건물면적" :value="buildingArea" />
    <!-- common area -->
    <item-more-info label="공용면적" :value="commonArea" />
    <!-- usage area -->
    <item-more-info label="용도지역" :value="usageArea" />
    <!-- point -->
    <item-more-info label="지목" :value="point" />
    <!-- usage situation -->
    <item-more-info label="이용상황" :value="usageSituation" />
    <!-- Announcement -->
    <item-more-info label="이용상황" :value="announcement" />
    <!-- roadInterface -->
    <item-more-info label="도로접면" :value="roadInterface" />
    <!-- terrain -->
    <item-more-info label="지세" :value="terrain" />
  </q-card-section>
</template>

<script>
import ItemMoreInfo from "./Common/ItemMoreInfo";
export default {
  components: {
    ItemMoreInfo
  },
  props: {
    transactionType: {
      type: String,
      default: null
    },
    landArea: {
      type: String,
      default: null
    },
    buildingArea: {
      type: String,
      default: null
    },
    commonArea: {
      type: String,
      default: null
    },
    usageArea: {
      type: String,
      default: null
    },
    point: {
      type: String,
      default: null
    },
    usageSituation: {
      type: String,
      default: null
    },
    announcement: {
      type: String,
      default: null
    },
    usageSituation: {
      type: String,
      default: null
    },
    roadInterface: {
      type: String,
      default: null
    },
    terrain: {
      type: String,
      default: null
    }
  }
};
</script>

<style lang="scss"></style>
