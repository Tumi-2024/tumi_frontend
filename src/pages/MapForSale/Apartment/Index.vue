<template>
  <div v-if="estate">
    <google-map
      class="map"
      :position="estate.position"
      :polygon="null"
      :estate="estate"
      setMapAreaView
    />
    <detail-summary
      :tags="{
        type: toKr(estate.type_house),
        redevelopment: redevelopment,
        stageProgress: redevelopment && redevelopment.redevelopment_step,
        transactionStatus: estate.is_sold && '거래완료'
      }"
      :areaName="estate.address"
      :sales="toMoneyString(estate.price)"
      :initialInvestments="toMoneyString(estate.initial_investment)"
      :quote="estate.description"
    />
    <!--  토지 매물정보  -->
    <area-information :informations="getInformation" class="q-mt-md" />
    <more-information
      class="q-mt-md"
      :estate="estate"
      v-bind="{
        transactionType: toKr(estate.type_sale),
        exclusiveArea: estate.area_exclusive && `${estate.area_exclusive}㎡ (${Math.round(estate.area_exclusive/3.3)}평)`,
        commonArea: estate.area_common && `${estate.area_common}㎡ (${Math.round(estate.area_common/3.3)}평)`,
        direction: `${estate.type_direction && toKr(estate.type_direction)}향`,
        numberFloors: estate.floor && `${estate.floor}층`,
        stationArea: estate.station,
        elevator: estate.elevator ? `${estate.elevator}대` : '',
        numberRooms: estate.room_count && estate.bathroom_count && `${estate.room_count} / ${estate.bathroom_count}개`,
        heating: estate.heating_system,
        numberHouseholds: estate.area_household_count,
        administrativeExpenses: estate.administration_cost && `${estate.administration_cost}원`
      }"
    />
    <!-- 재개발 정보 -->
    <redevelopment-information
      v-if="redevelopment"
      approvalPromotionCommittee="2004.07.20"
      designationMaintenanceArea="2005.05.19"
      associationEstablishment="2005.05.19"
      constructorDate=""
      projectImplementationAuthorization="2005.05.19"
      managementDispositionAuthorization="2005.05.19"
      startConstruction="2005.05.19"
      generalSales=""
      completion="2005.05.19"
      class="q-mt-md"
    />
    <administration-cost :cost="adminCost" class="q-mt-md" />
    <school-section class="q-mt-md" :tabs="schoolTabs" :active="activeSchoolTab" />

    <recent-pricing
      class="q-mt-md"
      :salePrice="salePrice"
      :charter="charter"
      :extraDetails="extraDetails"
      :areaOptions="areaOptions"
      show-units
      :unit="unit"
    />
  </div>
</template>

<script>
import { toKr, toMoneyString } from "src/utils";
import {
  GoogleMap,
  DetailSummary,
  AreaInformation,
  MoreInformation,
  RedevelopmentInformation,
  AdministrationCost,
  SchoolSection,
  RecentPricing
} from "components/MapForSaleComponents";
export default {
  components: {
    DetailSummary,
    AreaInformation,
    MoreInformation,
    RedevelopmentInformation,
    AdministrationCost,
    SchoolSection,
    RecentPricing,
    "google-map": GoogleMap
  },
  mounted() {
    this.estate = this.$route.params.data;
    if (this.estate === undefined) return;
    this.$store.dispatch("addRecentlyViewedHouse", this.estate);
    this.redevelopment = this.estate.redevelopment;
    console.log(this.estate);
  },
  methods: {
    toKr,
    toMoneyString
  },
  computed: {
    getInformation() {
      return [
        {
          // number of floors
          label: "동",
          value: `${this.estate.dong}동`,
          icon: [],
          text: ['🏢'],
          new: true
        },
        {
          // number of floors
          label: "층",
          value: `${this.estate.floor}층`,
          icon: ["number-floors.svg"]
        },
        {
          // direction
          label: "방향",
          value: `${toKr(this.estate.type_direction)}향`,
          icon: ["direction.svg"]
        },
        {
          // station-area
          label: "방/욕실",
          value: `${this.estate.room_count}/${this.estate.bathroom_count}`,
          icon: [],
          text: ['🛏', '🛁'],
          new: true
        },
        {
          // exclusive Area
          label: "공용 면적",
          value: `${this.estate.area_common}㎡`,
          icon: ["land-area.svg"]
        },
        {
          // exclusive Area
          label: "전용 면적",
          value: `${this.estate.area_exclusive}㎡`,
          icon: ["land-area.svg"]
        },
        {
          // Right
          label: "동일 면적 세대 수",
          value: this.estate.area_household_count,
          icon: ["building-area.svg"]
        },
        {
          // Premium price
          label: "관리비",
          value: this.estate.administration_cost,
          icon: ["right.svg"]
        }
      ];
    }
  },
  data() {
    return {
      redevelopment: null,
      estate: null,
      adminCost: [
        { label: "여름", value: "28만원", icon: "summer.svg" },
        { label: "겨울", value: "21만원", icon: "windy.svg" },
        { label: "평균", value: "23만원", icon: "average.svg" }
      ],
      // school sections
      schoolTabs: [
        {
          level: "kindergarten",
          label: "유치원",
          schools: [
            { name: "새나라 어린이집", distance: "500M이내" },
            { name: "금모래 유치원", distance: "620M이내" },
            { name: "푸리울 어린이집", distance: "620M이내" },
            { name: "꿈샘 어린이집", distance: "700M이내" },
            { name: "노랑노랑 유치원", distance: "700M이내" }
          ]
        },
        { level: "elementary", label: "초등학교" },
        { level: "middle", label: "중학교" },
        { level: "high", label: "고등학교" }
      ],
      activeSchoolTab: "kindergarten",
      // Recent Actual transactions |  최근 실거래가
      areaOptions: ["35평", "45평"],
      salePrice: { value: "14억 5천만", date: "2020년 06월" },
      charter: { value: "10억 2,580만", date: "2020년 03월" },
      extraDetails: [
        { label: "공급 / 전용 면적", info: "41.76 / 130.28㎡" },
        { label: "시세 갱신일", info: "2020.06.20" }
      ],
      unit: {
        salePrice: {
          below: "13억 8,250만",
          general: "14억 1,750만",
          above: "15억 1,000만"
        },
        charter: {
          below: "10억 4,520만",
          general: "10억 9,500만",
          above: "11억 9,500만"
        },
        monthly: {
          deposit: "2천만",
          rent: "115~120만"
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.map {
  height: calc(118vh / 375 * 100);
}
</style>
