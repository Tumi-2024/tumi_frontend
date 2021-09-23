<template>
  <div v-if="estate">
    <google-map
      class="map"
      :position="{
        lat: Number(estate.latitude),
        lng: Number(estate.longitude)
      }"
      :polygon="redevelopmentArea"
      :estate="estate"
      setMapAreaView
    />
    <detail-summary
      :tags="{
        type: estate.group_building_house.type_house,
        redevelopment: redevelopment,
        stageProgress: redevelopment && redevelopment.redevelopment_step,
        transactionStatus: estate.group_etc.is_sold
      }"
      :building="estate.transaction_group.building"
      :areaName="estate.transaction_group.address"
      :sales="toMoneyString(estate.price)"
      :initialInvestments="toMoneyString(estate.initial_investment)"
      :quote="estate.description"
    />
    <!--  매물정보  -->
    <area-information :informations="getInformation" class="q-mt-md" />
    <!-- 토지/용도 정보 -->
    <common-information class="q-mt-md" title="토지/용도 정보" :getOptions="getAreaOptions" />
    <common-information class="q-mt-md" title="단지/건물 정보" :getOptions="getApartOptions" />
    <!-- 단지 건물 정보 -->
    <!-- <more-information
      class="q-mt-md"
      :estate="estate"
    /> -->
    <!-- 개별 세대 정보 -->
    <common-information class="q-mt-md" title="개별세대 정보" :getOptions="getGenerationOptions" />
    <!-- 매물 거래 조건 정보 -->
    <common-information class="q-mt-md" title="매물 거래조건(매수/매도 공통)" :getOptions="getTradeOptions" />
    <common-information class="q-mt-md" title="개발정비사업" :getOptions="getRedevOptions" />
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
    <school-section
      class="q-mt-md"
      :tabs="schoolTabs"
      :active="activeSchoolTab"
    />

    <recent-pricing
      class="q-mt-md"
      :salePrice="salePrice"
      :charter="charter"
      :extraDetails="extraDetails"
      :areaOptions="areaOptions"
      show-units
      :unit="unit"
    />
    <recent-history class="q-mt-md" :item="transactions" />
    <recent-average-history
      class="q-mt-md"
      v-if="graphData.length > 0"
      :areaOptions="areaOptions"
      :graph="graphData"
    />
    <!-- <recent-pricing
      class="q-mt-md"
      :salePrice="salePrice"
      :charter="charter"
      :extraDetails="extraDetails"
      :areaOptions="areaOptions"
      show-units
      :unit="unit"
    /> -->
    <!-- <person-charge-of class="q-my-md" /> -->
  </div>
</template>

<script>
import { toKr, toMoneyString } from "src/utils";
import Vue from "vue";
import {
  GoogleMap,
  DetailSummary,
  AreaInformation,
  // MoreInformation,
  RedevelopmentInformation,
  AdministrationCost,
  SchoolSection,
  RecentPricing,
  RecentHistory,
  RecentAverageHistory,
  CommonInformation
} from "components/MapForSaleComponents";
export default {
  components: {
    DetailSummary,
    AreaInformation,
    CommonInformation,
    // MoreInformation,
    RedevelopmentInformation,
    AdministrationCost,
    SchoolSection,
    RecentPricing,
    RecentHistory,
    RecentAverageHistory,
    "google-map": GoogleMap
  },
  async beforeMount() {
    if (this.$route?.query?.sellid) {
      const { query } = this.$route;
      const { data } = await Vue.prototype.$axios.get(
        `/houses/${query.sellid}`
      );
      this.estate = data;
      this.makePolygon(data.group_location.redevelopment_area)
      this.redevelopment = this.estate.redevelopment
        ? this.estate.redevelopment
        : null;

      const { data: transactions } = await Vue.prototype.$axios.get(
        `/transaction_groups/${this.estate.transaction_group.id}/transactions`
      );
      this.transactions = transactions;

      this.getGraphData();
    }
  },
  methods: {
    toKr,
    toMoneyString,
    makePolygon(area) {
      this.redevelopmentArea = area.redevelopment_area_locations.map(obj => {
        return { lat: Number(obj.lat), lng: Number(obj.lng) };
      });
    },
    getGraphData() {
      const graphData = (type, yyyyMM) =>
        this.transactions
          .filter(obj => obj.text_month.indexOf(yyyyMM) === 0)
          .reduce((acc, curr) => {
            if (type) {
              return acc + curr.price;
            }
            return acc;
          }, 0) /
        this.transactions.filter(obj => obj.text_month.indexOf(yyyyMM) === 0)
          .length;
      this.graphData = [
        { sale: graphData("SALE", "2018"), rent: graphData("RENT", "2018") },
        { sale: graphData("SALE", "2019"), rent: graphData("RENT", "2019") },
        { sale: graphData("SALE", "202006"), rent: graphData("RENT", "202006") }
      ];
    }
  },
  computed: {
    getInformation() {
      return [
        {
          // number of floors
          label: "해당 동수",
          value: `${this.estate.group_individual_household.num_dong}동`,
          icon: ["11.png"],
          new: true
        },
        {
          // number of floors
          label: "해당 층수",
          value: `${this.estate.group_individual_household.num_floor}층`,
          icon: ["number-floors.svg"]
        },
        {
          // direction
          label: "방향",
          value: `${this.estate.group_individual_household.type_direction}`,
          icon: ["direction.svg"]
        },
        {
          // station-area
          label: "방수/욕실수",
          value: `${this.estate.group_individual_household.count_room}/${this.estate.group_individual_household.count_bathroom}`,
          icon: ["31A.png", "31B.png"],
          new: true
        },
        {
          // exclusive Area
          label: "공용 면적 (m2)",
          value: `${this.estate.group_individual_household.size_supply_area}㎡`,
          icon: ["land-area.svg"]
        },
        {
          // exclusive Area
          label: "전용 면적 (m2❘평형)",
          value: `${
            this.estate.group_individual_household.size_dedicated_area
          }㎡ | 
            ${Math.floor(
              this.estate.group_individual_household.size_dedicated_area / 3.3
            )}평`,
          icon: ["land-area.svg"]
        },
        {
          // Right
          label: "해당면적 세대수",
          value: this.estate.group_individual_household
            .count_household_same_area,
          icon: ["building-area.svg"]
        },
        {
          // Premium price
          label: "관리비",
          value: this.estate.group_individual_household.price_maintenance,
          icon: ["right.svg"]
        }
      ];
    },
    getAreaOptions() {
      const { group_land_use: houseInfo } = this.estate;
      return [
        {
          label: "지목",
          value: houseInfo.type_use_land
        },
        { label: "건물 용도", value: houseInfo.type_use_building },
        {
          label: "주건물구조",
          value: houseInfo.type_structure_building
        },
        {
          label: "용도지역(1)",
          value: houseInfo.type_use_area1
        },
        { label: "용도지역(2)", value: houseInfo.type_use_area2 },
        { label: "용도지구", value: houseInfo.type_use_district },
        { label: "주위환경", value: houseInfo.type_environment_surrounding },
        {
          label: "방위방향",
          value: houseInfo.type_azimuth
        },
        {
          label: "도로교통",
          value: houseInfo.type_road_traffic
        },
        { label: "형상명", value: houseInfo.type_shape },
        { label: "지세명", value: houseInfo.type_terrain }
      ];
    },
    getApartOptions() {
      const {
        group_building_house: houseInfo,
        group_location: houseInfo2,
        group_individual_household: houseInfo3,
        group_land_use: houseInfo4
      } = this.estate;
      return [
        {
          label: "주택 유형(분류)",
          value: houseInfo.type_house
        },
        { label: "집합건물 여부", value: houseInfo.type_collective_building },
        {
          label: "사용승인일",
          value: houseInfo.date_approval_use
        },
        {
          label: "건물/주택(단지) 명",
          value: houseInfo.title_building
        },
        { label: "K-APT 기준 아파트명", value: houseInfo.title_apartment_k_apt },
        { label: "K-APT 기준 단지코드", value: houseInfo.code_complex_k_apt },
        {
          label: "시/도",
          value: houseInfo2.city.title
        },
        {
          label: "시군구명",
          value: houseInfo2.subcity.title
        },
        {
          label: "법정동",
          value: houseInfo2.location.title
        },
        { label: "소재지(동 이하)", value: houseInfo.location_dong },
        { label: "도로명 (로/길 이하)", value: houseInfo.location_road },
        { label: "역세권", value: houseInfo.description_station_area },
        // 최근 관리비 없음
        { label: "대지면적", value: houseInfo.size_land_area },
        { label: "연면적", value: `${houseInfo.size_gross_floor_area}㎡` },
        { label: "건축면적", value: `${houseInfo.size_building_area}㎡` },
        { label: "용적률", value: `${houseInfo.percentage_floor_area}%` },
        { label: "건폐율", value: `${houseInfo.percentage_building_cover}%` },
        { label: "분양형태", value: houseInfo.description_sale },
        { label: "총 세대수", value: houseInfo.count_household },
        { label: "동일면적 세대수", value: houseInfo3.count_household_same_area },
        { label: "주차대수 (지상/지하)", value: `${houseInfo.count_parking_up}/${houseInfo.count_parking_down}` },
        { label: "건물 동 수", value: houseInfo.count_building },
        { label: "건물 동 층수 (지상/지하)", value: `${houseInfo.count_floor_up}/${houseInfo.count_floor_down}` },
        { label: "복도 유형", value: houseInfo.type_corridor },
        { label: "엘리베이터 수", value: houseInfo.count_elevator },
        { label: "난방방식", value: houseInfo.type_heating },
        { label: "관리사무소 연락처", value: houseInfo.call_management_office },
        // { label: "건물 총 층수", value: houseInfo3.num_total_floor },
        { label: "주건물구조", value: houseInfo4.type_structure_building },
        { label: "시공사", value: houseInfo.title_contractor },
        { label: "시행사", value: houseInfo.title_executor },
        { label: "부대복리시설", value: (houseInfo.types_incidental_welfare_facilities || []).join(','), class: 'col-sm-12 col-md-12' },
        { label: "표준지/표준주택 공시지가", value: `${toMoneyString(houseInfo.price_standard_land, 1 / 10000)}/${toMoneyString(houseInfo.price_standard_housing, 1 / 10000)}` },
        { label: "대지권 종류", value: houseInfo.type_land },
        { label: "대지권 비율", value: houseInfo.percentage_land }
      ];
    },
    getGenerationOptions() {
      const { group_individual_household: houseInfo } = this.estate;
      console.log(this.estate)
      return [
        {
          label: "(메모) 매물특징",
          value: houseInfo.description_estate,
          class: 'col-sm-12 col-md-12'
        },
        { label: "동 번호", value: houseInfo.num_ho },
        { label: "호수 <저층/중층/고층>", value: houseInfo.num_ho, class: 'col-sm-12 col-md-8' },
        {
          label: "총 세대수",
          value: houseInfo.num_total_floor
        },
        {
          label: "동일면적 세대수",
          value: houseInfo.count_household_same_area
        },
        { label: "층수(해당층/총층수)", value: `${houseInfo.num_floor}/${houseInfo.num_total_floor}` },
        { label: "공급면적", value: `${houseInfo.size_supply_area}㎡` },
        {
          label: "전용면적 | 평수",
          value: `${houseInfo.size_dedicated_area}㎡ | ${(houseInfo.size_dedicated_area / 3.3).toFixed(1)}평`
        },
        {
          label: "매매(전매) 관리",
          value: houseInfo.type_azimuth
        },
        {
          label: "방수/욕실수",
          value: `${houseInfo.count_room}/${houseInfo.count_bathroom}`
        },
        { label: "방향", value: houseInfo.type_direction, class: 'col-sm-12 col-md-8' },
        // 최근 관리비 없음
        { label: "최근 관리비", value: houseInfo.price_maintenance },
        { label: "연평균 관리비", value: houseInfo.price_maintenance },
        { label: "하절기 평균 관리비", value: houseInfo.price_maintenance_summer },
        { label: "동절기 평균 관리비", value: houseInfo.price_maintenance_winter },
        { label: "공동주택 공시가격", value: houseInfo.price_public_housing },
        { label: "공동주택 개별 공시지가", value: houseInfo.price_individual_published }
      ];
    },
    getTradeOptions() {
      const { group_trading_terms: houseInfo } = this.estate;
      return [
        { label: "희망 매매가", value: houseInfo.price_selling_hope },
        { label: "희망 전월세 보증금", value: houseInfo.price_charter_deposit_hope || houseInfo.price_monthly_rent_deposit_hope },
        { label: "희망 월세액", value: houseInfo.price_monthly_rent_hope },
        { label: "희망 계약일", value: houseInfo.date_due_hope },
        { label: "희망 입주 일자", value: houseInfo.description_move_condition },
        { label: "희망 임대차계약 만기일", value: houseInfo.date_due_move },
        { label: "융자금", value: houseInfo.price_loan },
        { label: "희망 이사조건", value: houseInfo.type_move },
        { label: "[옵션] 세안고", value: '' },
        { label: "[옵션] 올수리", value: '' },
        { label: "[옵션] 인테리어", value: '' },
        { label: "[옵션] 보일러교체", value: '' },
        { label: "[옵션] 주택구조", value: '' },
        { label: "[옵션] 애완동물", value: '' },
        { label: "[옵션] 외국인", value: '' }
      ]
    },
    getRedevOptions() {
      const { group_location: { redevelopment_area: houseInfo } } = this.estate;
      return [
        { label: "개발사업 유형", value: houseInfo.category },
        { label: "개발구역 명칭(단축)", value: houseInfo.title },
        { label: "개발구역 명칭(조합)", value: houseInfo.title_area },
        { label: "사업 추진 경과", value: houseInfo.redevelopment_step },
        { label: "사업 유형", value: houseInfo.business_type },
        { label: "사업 구분", value: houseInfo.business_classification },
        { label: "추진위 수행여부", value: houseInfo.status_promotion_committee },
        { label: "공공지원 대상여부", value: houseInfo.status_public_support },
        { label: "건축 계획", value: houseInfo.status_architectural_plan },
        { label: "주택공급계획", value: houseInfo.status_sharing_plan },
        { label: "정비구역 위치", value: houseInfo.price_selling_hope },
        { label: "구역면적 (㎡)", value: houseInfo.price_selling_hope },
        { label: "조합원 수", value: houseInfo.count_member },
        { label: "부동산 소유자 수", value: houseInfo.count_owner },
        { label: "세입자 수", value: houseInfo.count_house }
      ]
    }
  },
  data() {
    return {
      redevelopment: null,
      transactions: null,
      graphData: [],
      estate: null,
      redevelopmentArea: [],
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
