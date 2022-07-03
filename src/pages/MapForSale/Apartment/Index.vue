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
      v-bind="{
        building: estate.group_building_house.title_building,
        areaName: `${estate.address} (${estate.group_location.location_road})`,
        sales: toMoneyString(estate.price),
        initialInvestments: toMoneyString(estate.initial_investment),
        quote: estate.description,
        prices: estate.group_price,
        houseId: estate.id,
        tags: {
          type: estate.group_building_house.type_house,
          stageProgress: redevelopment.redevelopment_step
        },
        created: estate.created,
        redevName: estate.group_location.redevelopment_area.title_area
      }"
    />
    <!--  매물정보  -->
    <area-information :informations="getInformation" class="q-mt-md" />
    <!-- 위치 정보 -->
    <common-information
      class="q-mt-md"
      title="위치 정보"
      :getOptions="getLocationOptions"
    />
    <!-- 토지/용도 정보 -->
    <common-information
      class="q-mt-md"
      title="토지/용도 정보"
      :getOptions="getAreaOptions"
    />
    <common-information
      class="q-mt-md"
      title="건물/주택(단지) 정보"
      :getOptions="getApartOptions"
    />
    <!-- 단지 건물 정보 -->
    <!-- <more-information
      class="q-mt-md"
      :estate="estate"
    /> -->
    <!-- 개별 세대 정보 -->
    <common-information
      class="q-mt-md"
      title="개별세대 정보"
      :getOptions="getGenerationOptions"
    />
    <!-- 매물 거래 조건 정보 -->
    <common-information
      class="q-mt-md"
      title="공시지가 정보 [토지지가 / 주택가격]"
      :getOptions="getStandardPriceOptions"
    />
    <common-information
      class="q-mt-md"
      title="희망 거래 조건 <소유자(매도자/임대인) 기준>"
      :getOptions="getTradeOptions"
    />
    <common-information
      class="q-mt-md"
      title="정비사업 주요 정보"
      v-if="this.estate.group_location"
      :getOptions="getRedevOptions"
    />
    <!-- v-if="" -->
    <!-- 재개발 정보 -->
    <redevelopment-information
      v-if="!!redevelopment"
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
    <!-- <administration-cost :cost="adminCost" class="q-mt-md" /> -->
    <!-- <school-section
      class="q-mt-md"
      :tabs="schoolTabs"
      :active="activeSchoolTab"
    /> -->

    <!-- <recent-pricing
      class="q-mt-md"
      :salePrice="salePrice"
      :charter="charter"
      :extraDetails="extraDetails"
      :areaOptions="areaOptions"
      show-units
      :unit="unit"
    /> -->
    <recent-history class="q-mt-md" :item="transactions" />
    <!-- <recent-average-history
      class="q-my-md"
      v-if="graphData.length > 0"
      :areaOptions="areaOptions"
      :graph="graphData"
    /> -->
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
  // SchoolSection,
  // RecentPricing,
  RecentHistory,
  // RecentAverageHistory,
  CommonInformation
} from "components/MapForSaleComponents";
export default {
  components: {
    DetailSummary,
    AreaInformation,
    CommonInformation,
    // MoreInformation,
    RedevelopmentInformation,
    // SchoolSection,
    // RecentPricing,
    RecentHistory,
    "google-map": GoogleMap
  },
  async beforeMount() {
    if (this.$route?.query?.sellid) {
      const { query } = this.$route;
      const { data } = await Vue.prototype.$axios.get(
        `/houses/${query.sellid}/`
      );
      this.estate = data;

      this.makePolygon(data.group_location.redevelopment_area);
      this.redevelopment = data.group_location?.redevelopment_area;

      this.$store.dispatch("addRecentlyViewedHouse", data);
      const {
        data: { results }
      } = await Vue.prototype.$axios.get(
        `/houses/${this.estate.id}/transactions/`
      );
      this.transactions = results;
      // this.getGraphData();
    }
  },
  methods: {
    toKr,
    toMoneyString,
    makePolygon(area) {
      this.redevelopmentArea = area.redevelopment_area_locations.map((obj) => {
        return { lat: Number(obj.lat), lng: Number(obj.lng) };
      });
    },
    getValue(value, unit) {
      if (value === null || value === undefined) return "";
      if (
        typeof value === "string" &&
        (value.indexOf("null") > -1 || value.indexOf("undefined") > -1)
      ) {
        return "";
      }

      if (typeof value === "string" && value.indexOf("비공개") > -1) {
        return "비공개";
      }
      return `${value}${unit ? ` ${unit}` : ""}`;
    },
    getArrayOrString(data) {
      if (Array.isArray(data)) {
        return data.join(", ");
      }
      return data;
    }
  },
  computed: {
    getInformation() {
      return [
        {
          // number of floors
          label: "해당 동수",
          value: this.getValue(
            this.estate.group_individual_household.num_dong,
            "동"
          ),
          icon: ["11.png"],
          new: true
        },
        {
          // number of floors
          label: "해당 층수",
          value: this.getValue(
            this.estate.group_individual_household.num_floor,
            "층"
          ),
          icon: ["number-floors.svg"]
        },
        {
          // direction
          label: "방향",
          value: this.getValue(
            this.estate.group_individual_household.type_direction
          ),
          icon: ["direction.svg"]
        },
        {
          // station-area
          label: "방수/욕실수",
          value: this.getValue(
            `${this.estate.group_individual_household.count_room}/${this.estate.group_individual_household.count_bathroom}`
          ),
          icon: ["31A.png", "31B.png"],
          new: true
        },
        {
          // exclusive Area
          label: "공용 면적 (m2)",
          value: this.getValue(
            `${this.estate.group_individual_household.size_supply_area_m2}㎡`
          ),
          icon: ["land-area.svg"]
        },
        {
          // exclusive Area
          label: "전용 면적 (m2❘평형)",
          value: this.getValue(`${
            this.estate.group_individual_household.size_dedicated_area_m2
          }㎡ |
            ${Math.floor(
              this.estate.group_individual_household.size_dedicated_area_m2 /
                3.3
            )}평`),
          icon: ["land-area.svg"]
        },
        // {
        //   // Right
        {
          // Premium price
          label: "하절기 관리비",
          value: this.getValue(
            this.estate.group_individual_household.price_maintenance_summer?.toLocaleString(),
            " 원"
          ),
          icon: ["right.svg"]
        },
        {
          // Premium price
          label: "동절기 관리비",
          value: this.getValue(
            this.estate.group_individual_household.price_maintenance_winter?.toLocaleString(),
            " 원"
          ),
          icon: ["right.svg"]
        }
      ];
    },
    getLocationOptions() {
      const { group_building_house: houseInfo, group_location: houseInfo2 } =
        this.estate;
      return [
        {
          label: "시/도",
          value: houseInfo2.city.title
        },
        {
          label: "시군구명",
          value: houseInfo2.subcity.title
        },
        {
          label: "읍면동리",
          value: houseInfo2.location.title
        },
        { label: "소재지(동 이하)", value: houseInfo2.location_dong },
        { label: "도로명 (로/길 이하)", value: houseInfo2.location_road },
        { label: "역세권", value: houseInfo.description_station_area }
      ];
    },
    getAreaOptions() {
      const { group_land_use: houseInfo } = this.estate;
      return [
        {
          label: "지목",
          value: this.getArrayOrString(houseInfo.type_use_land)
        },
        {
          label: "건물 용도",
          value: this.getArrayOrString(houseInfo.type_use_building)
        },
        {
          label: "방위방향",
          value: this.getArrayOrString(houseInfo.type_azimuth)
        },
        {
          label: "도로교통",
          value: this.getArrayOrString(houseInfo.type_road_traffic)
        },
        { label: "형상명", value: this.getArrayOrString(houseInfo.type_shape) },
        {
          label: "지세명",
          value: this.getArrayOrString(houseInfo.type_terrain)
        },
        {
          label: "주건물구조",
          value: this.getArrayOrString(houseInfo.type_structure_building),
          class: "col-sm-12 col-md-12"
        },
        {
          label: "용도지역(1)",
          value: this.getArrayOrString(houseInfo.type_use_area1),
          class: "col-sm-12 col-md-12"
        },
        {
          label: "용도지역(2)",
          value: this.getArrayOrString(houseInfo.type_use_area2),
          class: "col-sm-12 col-md-12"
        },
        {
          label: "용도지구",
          value: this.getArrayOrString(houseInfo.type_use_district),
          class: "col-sm-12 col-md-12"
        },
        {
          label: "주위환경(1)",
          value: this.getArrayOrString(houseInfo.type_environment_surrounding1),
          class: "col-sm-12 col-md-12"
        },
        {
          label: "주위환경(2)",
          value: this.getArrayOrString(houseInfo.type_environment_surrounding2),
          class: "col-sm-12 col-md-12 borderb"
        },

        {
          label: "토지이동 (변동) 사유",
          value: this.getArrayOrString(
            houseInfo.description_reason_land_movement
          ),
          class: "col-sm-12 col-md-12"
        }
      ];
    },
    getApartOptions() {
      const {
        group_building_house: houseInfo
        // group_individual_household: houseInfo3,
        // group_land_use: houseInfo4
      } = this.estate;

      return [
        {
          label: "건물/주택(단지) 명",
          value: this.getValue(houseInfo.title_building)
        },
        {
          label: "K-APT 기준 아파트명",
          value: this.getValue(houseInfo.title_apartment_k_apt)
        },
        {
          label: "K-APT 기준 단지코드",
          value: this.getValue(houseInfo.code_complex_k_apt)
        },
        {
          label: "주택유형 (분류)",
          value: houseInfo.type_house
        },
        {
          label: "집합건물 여부",
          value: this.getValue(houseInfo.type_collective_building)
        },
        {
          label: "분양 형태",
          value: this.getValue(houseInfo.description_sale)
        },
        // 최근 관리비 없음
        {
          label: "대지면적",
          value: this.getValue(houseInfo.size_land_area, " ㎡")
        },
        {
          label: "연면적",
          value: this.getValue(houseInfo.size_gross_floor_area, " ㎡")
        },
        {
          label: "건축면적",
          value: this.getValue(houseInfo.size_building_area, " ㎡")
        },
        //
        {
          label: "건폐율",
          value: this.getValue(houseInfo.percentage_building_cover, " %")
        },
        {
          label: "용적률",
          value: this.getValue(houseInfo.percentage_floor_area, " %")
        },
        { label: "복도 유형", value: houseInfo.type_corridor },
        //
        {
          label: "건물 동 (개)수",
          value: this.getValue(houseInfo.count_building, " 개동")
        },
        {
          label: "총 세대수",
          value: this.getValue(houseInfo.count_household, " 세대")
        },
        { label: "난방방식", value: this.getValue(houseInfo.type_heating) },
        //
        {
          label: "엘리베이터 수",
          value: this.getValue(houseInfo.count_elevator, " 개")
        },
        {
          label: "주차대수 (지상/지하)",
          value: this.getValue(
            `${houseInfo.count_parking_up} 대 / ${houseInfo.count_parking_down} 대`
          )
        },
        {
          label: "사용승인일",
          value: houseInfo.date_approval_use
        },
        //
        { label: "시행사", value: houseInfo.title_executor },
        { label: "시공사 (건설사)", value: houseInfo.title_contractor },
        {
          label: "입주년차",
          value: `${houseInfo.date_approval_use || ""}`
        },
        //
        // {
        //   label: "동일면적 세대수",
        //   value: houseInfo3.count_household_same_area
        // },
        { label: "대지권 종류", value: houseInfo.type_land },
        {
          label: "대지권 비율",
          value: this.getValue(houseInfo.percentage_land, " %")
        },
        {
          label: "관리사무소 연락처",
          value: houseInfo.call_management_office,
          class: "borderb"
        },
        //
        // { label: "건물 총 층수", value: houseInfo3.num_total_floor },
        // { label: "주건물구조", value: houseInfo4.type_structure_building },

        {
          label: "부대복리시설",
          value: (houseInfo.types_incidental_welfare_facilities || []).join(
            ","
          ),
          class: "col-sm-12 col-md-12"
        }
      ];
    },
    getStandardPriceOptions() {
      const { group_official_price: houseInfo } = this.estate;
      return [
        {
          label: "표준지 공시지가",
          value: `${toMoneyString(houseInfo.price_standard_land)}`
        },
        {
          label: "개별 공시지가",
          value: `${toMoneyString(
            houseInfo.price_exclusive_individual_official_price
          )}`,
          class: "col-sm-6 col-md-8"
        },
        {
          label: "표준주택 공시가격",
          value: `${toMoneyString(houseInfo.price_standard_housing)}`
        },
        {
          label: "공동주택 공시가격",
          value: `${toMoneyString(houseInfo.price_public_housing)}`
        },
        {
          label: "개별주택 공시가격",
          value: `${toMoneyString(houseInfo.price_individual_published)}`
        }
      ];
    },
    getGenerationOptions() {
      const { group_individual_household: houseInfo } = this.estate;

      return [
        {
          label: "(메모) 매물특징",
          value: this.getValue(houseInfo.description_estate),
          class: "col-sm-12 col-md-12"
        },
        { label: "동 번호", value: this.getValue(houseInfo.num_ho, " 동") },
        {
          label: "층수 (총 층수)",
          value: this.getValue(houseInfo.count_floor_total, " 층")
        },
        {
          label: "층수 (해당 층)",
          value: this.getValue(houseInfo.num_floor, " 층")
        },
        {
          label: "공급면적(㎡)",
          value: this.getValue(houseInfo.size_supply_area_m2, " ㎡")
        },
        {
          label: "전용면적 (㎡|평형)",
          value: this.getValue(
            `${houseInfo.size_dedicated_area_m2 || "-"} ㎡ | ${(
              (houseInfo.size_dedicated_area_pyeong || 0) / 3.3
            ).toFixed(1)} 평`
          )
        },
        {
          label: "매매(전매) 관리",
          value: houseInfo.type_azimuth
        },
        // {
        //   label: "총 세대수",
        //   value: houseInfo.num_total_floor
        // },
        {
          label: "방수 | 욕실수",
          value: this.getValue(
            `${houseInfo.count_room} 개 | ${houseInfo.count_bathroom} 개`
          ),
          class: "col-sm-6 col-md-4"
        },
        {
          label: "방향",
          value: this.getValue(houseInfo.type_direction)
        }
        // {
        //   label: "최근 관리비",
        //   value: "-"
        //   // value: houseInfo.price_maintenance.toLocaleString() + " 원"
        // },
        // // 최근 관리비 없음
        // {
        //   label: "연평균 관리비",
        //   value: "-"
        //   // value: houseInfo.price_maintenance.toLocaleString() + " 원"
        // },
        // {
        //   label: "하절기 평균 관리비",
        //   value: "-",
        //   // value: houseInfo.price_maintenance_summer.toLocaleString() + " 원",
        //   class: "borderb"
        // },
        // {
        //   label: "동절기 평균 관리비",
        //   value: "-",
        //   // value: houseInfo.price_maintenance_winter.toLocaleString() + " 원",
        //   class: "borderb"
        // }

        // { label: "공동주택 공시가격", value: houseInfo.price_public_housing },
        // {
        //   label: "공동주택 개별 공시지가",
        //   value: houseInfo.price_individual_published
        // }
      ];
    },
    getTradeOptions() {
      const { group_trading_terms: houseInfo } = this.estate;
      console.log(houseInfo.types_sale);

      return [
        {
          label: "거래 종류",
          value: this.getArrayOrString(houseInfo.types_sale)
        },
        {
          label: "거래유형",
          value: this.getArrayOrString(houseInfo.types_sale_detail),
          class: "col-sm-8 col-md-8"
        },
        {
          label: "희망 매매가",
          value: toMoneyString(houseInfo.price_selling_hope)
        },
        {
          label: "희망 전월세 보증금",
          value: toMoneyString(
            houseInfo.price_charter_deposit_hope ||
              houseInfo.price_monthly_rent_deposit_hope
          )
        },
        {
          label: "희망 월세액",
          value: toMoneyString(houseInfo.price_monthly_rent_hope)
        },
        { label: "희망 계약일", value: houseInfo.date_due_hope },
        {
          label: "희망 입주(이사)일",
          value: houseInfo.date_due_move
        },
        { label: "융자금", value: toMoneyString(houseInfo.price_loan) },
        {
          label: "임대차 조건",
          value: houseInfo.description_rent_condition
        },
        { label: "희망 이사조건", value: houseInfo.description_move_condition },
        { label: "[옵션] 세안고", value: houseInfo.description_option_wash },
        { label: "[옵션] 주택구조", value: houseInfo.type_move },
        { label: "[옵션] 올수리", value: houseInfo.date_option_repair },
        { label: "[옵션] 인테리어", value: houseInfo.date_option_interior },
        {
          label: "[옵션] 보일러교체",
          value: houseInfo.date_option_boiler_replacement
        },
        { label: "(제한) 애완동물", value: houseInfo.description_option_pets },
        {
          label: "(제한) 외국인",
          value: houseInfo.description_option_foreigner
        }
      ];
    },
    getRedevOptions() {
      const {
        group_location: { redevelopment_area: houseInfo }
      } = this.estate;

      return [
        // { label: "개발사업 유형", value: houseInfo.category },
        { label: "정비구역 명칭", value: houseInfo.title },
        { label: "정비사업 종류", value: houseInfo.category },
        { label: "현재 사업추진단계", value: houseInfo.redevelopment_step },
        { label: "시행사", value: houseInfo.title_construction_company },
        { label: "시공사 (건설사)", value: houseInfo.title_build_company },
        { label: "브랜드", value: houseInfo.title_brand },
        {
          label: "건폐율 (%)",
          value: `${houseInfo.percentage_building_to_land} %`
        },
        { label: "용적률 (%)", value: `${houseInfo.percentage_floor_area} %` },
        {
          label: "비례율 (%)",
          value: `${houseInfo.percentage_proportionality} %`
        },
        {
          label: "조합원 수",
          value: `${houseInfo.count_member?.toLocaleString()} 명`
        },
        {
          label: "부동산 소유자 수",
          value: `${houseInfo.count_owner?.toLocaleString()} 명`
        },
        {
          label: "세입자 수",
          value: `${houseInfo.count_house?.toLocaleString()} 명`
        },
        {
          label: "(분양) 세대 수",
          value: `${houseInfo.count_sale?.toLocaleString()} 세대`
        },
        {
          label: "(임대) 세대 수",
          value: `${houseInfo.count_rent?.toLocaleString()} 세대`
        },
        {
          label: "입주 예정일",
          value: houseInfo.description_move_condition
        },

        { label: "사업 유형", value: houseInfo.business_type },
        { label: "사업 구분", value: houseInfo.business_classification },
        {
          label: "추진위 수행여부",
          value: houseInfo.status_promotion_committee
        },
        { label: "공공지원 대상여부", value: houseInfo.status_public_support },
        { label: "건축 계획", value: houseInfo.status_architectural_plan },
        { label: "주택공급계획", value: houseInfo.status_sharing_plan }
        // { label: "구역면적 (㎡)", value: houseInfo.price_selling_hope },
      ];
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
