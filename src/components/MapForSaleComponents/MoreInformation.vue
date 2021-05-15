<template>
  <q-card-section class="bg-white">
    <!-- transaction type -->
    <item-more-info
      label="거래유형"
      :value="transactionType"
      v-if="transactionType !== null"
    />
    <!-- exclusive area -->
    <item-more-info
      label="전용면적"
      :value="exclusiveArea"
      v-if="exclusiveArea !== null"
    />
    <!-- land area -->
    <item-more-info
      label="대지면적"
      :value="landArea"
      v-if="landArea !== null"
    />
    <!-- building area -->
    <item-more-info
      label="건물면적"
      :value="buildingArea"
      v-if="buildingArea !== null"
    />
    <!-- common area -->
    <item-more-info
      label="공용면적"
      :value="commonArea"
      v-if="commonArea !== null"
    />
    <!-- direction -->
    <item-more-info label="방향" :value="direction" v-if="direction !== null" />
    <!-- number of floor -->
    <item-more-info
      label="층수"
      :value="numberFloors"
      v-if="numberFloors !== null"
    />
    <!-- station area -->
    <item-more-info
      label="역세권"
      :value="stationArea"
      v-if="stationArea !== null"
    />
    <!-- elevator -->
    <item-more-info
      label="엘레베이터"
      :value="elevator"
      v-if="elevator !== null"
    />
    <!-- number of rooms / number of bathrooms -->
    <item-more-info
      label="방 수 / 욕실 수"
      :value="numberRooms"
      v-if="numberRooms !== null"
    />
    <!-- heating -->
    <item-more-info label="난방" :value="heating" v-if="heating !== null" />
    <!-- Applicable area number of households -->
    <item-more-info
      label="해당면적 세대수"
      :value="numberHouseholds"
      v-if="numberHouseholds !== null"
    />
    <!-- Administrative expenses -->
    <item-more-info
      label="관리비"
      :value="administrativeExpenses"
      v-if="administrativeExpenses !== null"
    />
    <!-- usage area -->
    <item-more-info
      label="용도지역"
      :value="usageArea"
      v-if="usageArea !== null"
    />
    <!-- point -->
    <item-more-info label="지목" :value="point" v-if="point !== null" />
    <!-- usage situation -->
    <item-more-info
      label="이용상황"
      :value="usageSituation"
      v-if="usageSituation !== null"
    />
    <!-- Announcement -->
    <item-more-info
      label="이용상황"
      :value="announcement"
      v-if="announcement !== null"
    />
    <!-- roadInterface -->
    <item-more-info
      label="도로접면"
      :value="roadInterface"
      v-if="roadInterface !== null"
    />
    <!-- terrain -->
    <item-more-info label="지세" :value="terrain" v-if="terrain !== null" />
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
    exclusiveArea: {},
    landArea: {
      type: String,
      default: null
    },
    buildingArea: {
      type: String,
      default: null
    },
    commonArea: {},
    direction: {
      type: String,
      default: null
    },
    numberFloors: {
      type: String,
      default: null
    },
    stationArea: {
      type: String,
      default: null
    },
    elevator: {
      type: String,
      default: null
    },
    numberRooms: {
      type: Number,
      default: 0
    },
    heating: {
      type: String,
      default: null
    },
    numberHouseholds: {
      type: String,
      default: null
    },
    administrativeExpenses: {
      type: Number,
      default: 0
    },
    usageArea: {
      type: String,
      default: null
    },
    point: {
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
