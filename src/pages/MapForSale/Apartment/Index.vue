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
        building: this.estate.group_building_house.title_building,
        areaName: `${estate.group_location.address} ${
          (estate.group_location.location_road || '').length > 0
            ? '/' + estate.group_location.location_road
            : ''
        }`,
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
        redevName: estate.group_location.redevelopment_area.title,
        persons: getPersons,
        item: estate
      }"
    />
    <!--  매물정보  -->
    <area-information :informations="getInformation" class="q-mt-md" />
    <q-card class="q-mt-md">
      <q-card-section>
        <div class="row q-mt-md">
          <span class="heading-title" style="width: 100%;">
            추정가치 분석
          </span>
          <div class="col-12 col-md-4 q-px-sm q-mt-sm">
            <div class="initial-investments row q-pa-sm q-mt-sm items-center">
              <q-icon>
                <img src="~assets/icons/coins.svg" alt="" />
              </q-icon>
              <div class="q-ml-md title">감정가</div>
              <q-separator
                class="self-center q-mx-sm"
                vertical
                inset
                style="height: 16px"
              />
              <div class="price">
                {{ toMoneyString(estate.group_price.price_appraised) }}
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 q-px-sm q-mt-sm">
            <div class="initial-investments row q-pa-sm q-mt-sm items-center">
              <q-icon>
                <img src="~assets/icons/coins.svg" alt="" />
              </q-icon>
              <div class="q-ml-md title">비례율</div>
              <q-separator
                class="self-center q-mx-sm"
                vertical
                inset
                style="height: 16px"
              />
              <div class="price">
                {{ (estate.group_price.percentage_ratio).toFixed(2) }}%
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 q-px-sm q-mt-sm">
            <div class="initial-investments row q-pa-sm q-mt-sm items-center">
              <q-icon>
                <img src="~assets/icons/coins.svg" alt="" />
              </q-icon>
              <div class="q-ml-md title">권리가</div>
              <q-separator
                class="self-center q-mx-sm"
                vertical
                inset
                style="height: 16px"
              />
              <div class="price">
                {{ toMoneyString(estate.group_price.price_rights) }}
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 q-px-sm q-mt-sm">
            <div class="initial-investments row q-pa-sm q-mt-sm items-center">
              <q-icon>
                <img src="~assets/icons/coins.svg" alt="" />
              </q-icon>
              <div class="q-ml-md title">분담금</div>
              <q-separator
                class="self-center q-mx-sm"
                vertical
                inset
                style="height: 16px"
              />
              <div class="price">
                {{ toMoneyString(estate.group_price.price_additional) }}
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 q-px-sm q-mt-sm">
            <div class="initial-investments row q-pa-sm q-mt-sm items-center">
              <q-icon>
                <img src="~assets/icons/coins.svg" alt="" />
              </q-icon>
              <div class="q-ml-md title">프리미엄</div>
              <q-separator
                class="self-center q-mx-sm"
                vertical
                inset
                style="height: 16px"
              />
              <div class="price">
                {{ toMoneyString(estate.group_price.price_premium) }}
              </div>
            </div>
          </div>

          <div class="col-12 col-md-4 q-px-sm q-mt-sm">
            <div class="initial-investments row q-pa-sm q-mt-sm items-center">
              <q-icon>
                <img src="~assets/icons/coins.svg" alt="" />
              </q-icon>
              <div class="q-ml-md title" style="word-break: keep-all;">조합원 분양가</div>
              <q-separator
                class="self-center q-mx-sm"
                vertical
                inset
                style="height: 16px"
              />
              <div class="price">
                {{ toMoneyString(estate.group_price.price_member) }}
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 q-px-sm q-mt-sm">
            <div class="initial-investments row q-pa-sm q-mt-sm items-center">
              <q-icon>
                <img src="~assets/icons/coins.svg" alt="" />
              </q-icon>
              <div class="q-ml-md title">초기투자금</div>
              <q-separator
                class="self-center q-mx-sm"
                vertical
                inset
                style="height: 16px"
              />
              <div class="price">
                {{ toMoneyString(estate.group_price.price_initial_investment) }}
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 q-px-sm q-mt-sm">
            <div class="initial-investments row q-pa-sm q-mt-sm items-center">
              <q-icon>
                <img src="~assets/icons/coins.svg" alt="" />
              </q-icon>
              <div class="q-ml-md title">총매가</div>
              <q-separator
                class="self-center q-mx-sm"
                vertical
                inset
                style="height: 16px"
              />
              <div class="price">
                {{ toMoneyString(estate.group_price.price_total) }}
              </div>
            </div>
          </div>
          <div class="col-12 col-md-4 q-px-sm q-mt-sm">
            <div class="initial-investments row q-pa-sm q-mt-sm items-center">
              <q-icon>
                <img src="~assets/icons/coins.svg" alt="" />
              </q-icon>
              <div class="q-ml-md title">안전마진</div>
              <q-separator
                class="self-center q-mx-sm"
                vertical
                inset
                style="height: 16px"
              />
              <div class="price">
                {{ toMoneyString(estate.group_price.price_safety_margin) }}
              </div>
            </div>
          </div>
          <div class="col-12 q-mt-md flex justify-center">
            <q-card class="flex flex-1 cursor-pointer" style="max-width: 500px">
              <div
                class="initial-investments bg-orange-1 text-primary row q-py-md q-px-lg items-center flex"
                style="border: 2px solid #ff5a00"
              >
                <div class="flex">
                  <q-icon size="30px">
                    <img src="~assets/icons/phone.svg" alt="" />
                  </q-icon>
                </div>
                <div class="q-ml-lg" style="flex: 1; word-break: keep-all;" @click="callPerson">
                  <div class="row items-center">
                    <span class="text-subtitle2 col-12 text-bold">
                      {{ getPersons[0].rank }}
                    </span>
                    <div
                      class="text-h6 q-mb-xs col-12 flex text-bold"
                    >
                      <span style="margin-right: 4px;">{{ getPersons[0].text }}</span>
                      <a href="tel: getPersons[0].phone" v-if="getPersons[0].phone" class="flex">
                        {{ getPersons[0].phone }}
                      </a>
                    </div>
                  </div>
                  <span class="text-grey-9 text-bold">
                    이미지 클릭시 담당직원과 전화상담이 가능합니다.
                  </span>
                </div>
              </div>
            </q-card>
          </div>
          <span style="margin-top: 10px; font-size: 14px; font-weight: bold;">
            ※ 위 "추정가치 분석" 정보는 예상수치이며, 사업진행에 따라 변동 될 수 있음.
          </span>
        </div>
      </q-card-section>
    </q-card>
    <common-information
      class="q-mt-md"
      title="희망 거래 조건 <소유자(매도자/임대인) 기준>"
      :getOptions="getTradeOptions"
    />
    <!-- 위치 정보 -->
    <!-- <common-information
      class="q-mt-md"
      title="위치 정보"
      :getOptions="getLocationOptions"
    /> -->
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
      title="정비사업 주요 정보"
      v-if="this.estate.group_location.redevelopment_area.id"
      :getOptions="getRedevOptions"
    />

    <investment-point
      class="q-mt-md"
      :item="estate.group_location.redevelopment_area"
    />
    <!-- 재개발 정보 -->
    <redevelopment-information
      v-if="this.estate.group_location.redevelopment_area.id"
      :list="estate.group_location.redevelopment_area.redevelopment_steps"
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
    <common-information
      class="q-mt-md"
      title="중개사무소"
      :getOptions="getStoreInfo"
    />
    <recent-history
      class="q-mt-md"
      v-if="this.redevelopment.id"
      :redevId="this.redevelopment.id"
      :item="transactions"
      :title="estate.group_location.redevelopment_area.title"
    />
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
  CommonInformation,
  InvestmentPoint
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
    InvestmentPoint,
    "google-map": GoogleMap
  },
  async beforeMount() {
    if (this.$route?.query?.sellid) {
      const { query } = this.$route;
      if (this.$store.getters.user.id) {
        await Vue.prototype.$axios.post(`/houses/${query.sellid}/recent/`);
      }
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
        `/redevelopment_areas/${this.redevelopment.id}/transaction_groups/`
      );
      this.transactions = results;
    }
  },
  methods: {
    toKr,
    toMoneyString,
    callPerson(phoneNumber) {
      if (!phoneNumber) return;
      window.location.href = "tel://" + phoneNumber;
    },
    makePolygon(area) {
      this.redevelopmentArea = area.redevelopment_area_locations.map((obj) => {
        return { lat: Number(obj.lat), lng: Number(obj.lng) };
      });
    },
    getValue(value, unit) {
      if (!value || value === "null") return "";
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
    },
    getArrayOrString2(data) {
      if (Array.isArray(data)) {
        return data
          .map((obj) => {
            return obj.replace(/\d{2}/g, "");
          })
          .join(",");
      }
      return data;
    }
  },
  computed: {
    // getRedevInfo() {
    //   const {
    //     group_location: {
    //       redevelopment_area: { redevelopment_steps: redevStep }
    //     }
    //   } = this.estate;

    //   const getDate = (label) => {
    //     return redevStep.find((step) => step.title === label)?.date.replaceAll('-', '.');
    //   }
    //   // redevStep
    // },
    lastWordToAstar() {
      return (address) => {
        const _addArr = address.split(" ");
        const _lastWord = _addArr[_addArr.length - 1];
        const restAddress = _addArr.slice(0, _addArr.length - 1).join(" ");

        const getAstar = (addr) => {
          return addr.substring(1, addr.length).replaceAll(/[0-9]/g, "*");
        };

        return `${restAddress} ${_lastWord[0]}${getAstar(_lastWord)}`;
      };
    },
    getInformation() {
      // console.log(this.estate.group_building_house.type_house, "단독ￜ다가구".replace("ￜ", "|"))
      return [
        {
          // number of floors
          label: "물건종류",
          value: this.getValue(this.estate.group_building_house.type_house.replace("ￜ", "|")),
          icon: ["11.png"],
          new: true
        },
        {
          // number of floors
          label: "대지면적",
          value: this.getValue(
            this.estate.group_individual_household.size_land_area_m2 || this.estate.group_building_house.size_land_area,
            "m²"
          ),
          icon: ["land-area.svg"]
        },
        {
          // direction
          label: "건물면적",
          value: this.getValue(
            this.estate.group_individual_household.size_dedicated_area_m2 || this.estate.group_building_house.size_building_area,
            "m²"
          ),
          icon: ["number-floors.svg"]
        },
        {
          // station-area
          label: "사용승인일",
          value: this.getValue(
            this.estate.group_building_house.date_approval_use
          ),
          icon: ["union.svg"]
        },
        {
          // exclusive Area
          label: "매매가",
          value: this.getValue(
            toMoneyString(this.estate.group_trading_terms.price_selling_hope)
          ),
          icon: ["privilege.svg"]
        },
        {
          // exclusive Area
          label: "보증금",
          value: `${toMoneyString(
            this.estate.group_trading_terms.price_charter_deposit_hope ||
              this.estate.group_trading_terms.price_monthly_rent_deposit_hope
          )}`,
          icon: ["connoisseur.svg"]
        },
        // {
        //   // Right
        {
          // Premium price
          label: "월세",
          value: this.getValue(
            toMoneyString(
              this.estate.group_trading_terms.price_monthly_rent_hope
            )
          ),
          icon: ["rent.svg"]
        },
        {
          // Premium price
          label: "예상프리미엄",
          value: this.getValue(
            toMoneyString(this.estate.group_price.price_premium)
          ),
          icon: ["parking.svg"]
        }
      ];
    },
    getLocationOptions() {
      // 신당동 212-32

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
        {
          label: "소재지(동 이하)",
          value: houseInfo2.location_dong
        },
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
          value: this.getArrayOrString2(houseInfo.type_use_area2),
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
        group_building_house: houseInfo,
        group_individual_household: householdInfo
        // group_land_use: houseInfo4
      } = this.estate;

      return [
        {
          label: "건물/주택(단지) 명",
          value: this.getValue(houseInfo.title_building)
        },
        {
          label: "K-APT 아파트명",
          value: this.getValue(houseInfo.title_apartment_k_apt)
        },
        {
          label: "K-APT 단지코드",
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
          value: this.getValue(householdInfo.size_land_area_m2 || houseInfo.size_land_area, "m²")
        },
        {
          label: "연면적",
          value: this.getValue(houseInfo.size_gross_floor_area, "m²")
        },
        {
          label: "건축면적",
          value: this.getValue(houseInfo.size_building_area, "m²")
        },
        //
        {
          label: "건폐율",
          value: this.getValue(houseInfo.percentage_building_cover, "%")
        },
        {
          label: "용적률",
          value: this.getValue(houseInfo.percentage_floor_area, "%")
        },
        { label: "복도 유형", value: houseInfo.type_corridor },
        //
        {
          label: "건물 동 (개)수",
          value: this.getValue(houseInfo.count_building, "개동")
        },
        {
          label: "총 세대수",
          value: this.getValue(houseInfo.count_household, "세대")
        },
        { label: "난방방식", value: this.getValue(houseInfo.type_heating) },
        //
        {
          label: "엘리베이터 수",
          value: this.getValue(houseInfo.count_elevator, "대")
        },
        {
          label: "주차대수",
          value: this.getValue(
            `지상 ${houseInfo.count_parking_up}대 / 지하 ${houseInfo.count_parking_down}대`
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
          value: this.getValue(`${houseInfo.year_tenancy || ""}`, " 년차")
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
        { label: "동 번호", value: this.getValue(houseInfo.num_ho, " 동") },
        {
          label: "총 층수",
          value: this.getValue(houseInfo.count_floor_total, " 층")
        },
        {
          label: "해당 층",
          value: this.getValue(houseInfo.type_floor, "")
        },
        // {
        //   label: "(메모) 매물특징",
        //   value: houseInfo.description_estate,
        //   class: "col-sm-12 col-md-12"
        // },
        {
          label: "대지지분 (대지권면적)",
          value: this.getValue(
            `${houseInfo.size_land_area_m2}m² | ${(
              houseInfo.size_land_area_pyeong || 0
            ).toFixed(1)}평`
          )
        },
        {
          label: "공급면적",
          value: this.getValue(
            `${houseInfo.size_supply_area_m2}m² | ${(
              houseInfo.size_supply_area_pyeong || 0
            ).toFixed(1)}평`
          )
        },
        {
          label: "전용면적",
          value: this.getValue(
            `${houseInfo.size_dedicated_area_m2 || "-"}m² | ${(
              houseInfo.size_dedicated_area_pyeong || 0
            ).toFixed(1)}평`
          )
        },
        {
          label: "방수/욕실수",
          value: this.getValue(
            `${houseInfo.count_room} 개/${houseInfo.count_bathroom} 개`
          ),
          class: "col-sm-6 col-md-4"
        },
        {
          label: "방향",
          value: this.getValue(houseInfo.type_direction)
        },
        {
          label: "매매(전매) 관리",
          value: houseInfo.type_azimuth
        }
      ];
    },
    getTradeOptions() {
      const { group_trading_terms: houseInfo } = this.estate;

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
          label: "매매가",
          value: toMoneyString(houseInfo.price_selling_hope)
        },
        {
          label: "희망 보증금",
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
          label: "희망 입주일",
          value: houseInfo.date_due_move
        },
        { label: "융자금", value: toMoneyString(houseInfo.price_loan) },
        {
          label: "임대차 조건",
          value: houseInfo.description_rent_condition
        },
        { label: "희망 이사조건", value: houseInfo.description_move_condition },
        { label: "세안고", value: houseInfo.description_option_wash },
        {
          label: "주택구조",
          value: houseInfo.description_option_duplex
        },
        { label: "올수리", value: houseInfo.date_option_repair },
        { label: "인테리어", value: houseInfo.date_option_interior },
        {
          label: "보일러교체",
          value: houseInfo.date_option_boiler_replacement
        },
        { label: "애완동물", value: houseInfo.description_option_pets },
        {
          label: "외국인",
          value: houseInfo.description_option_foreigner
        }
      ];
    },
    getStoreInfo() {
      const { store_main: store } = this.estate;
      return [
        { label: "명칭/대표자", value: store?.title, class: "col-sm-6 col-md-6" },
        { label: "등록번호", value: store?.registration_number, class: "col-sm-6 col-md-6" },
        { label: "소재지", value: store?.address, class: "col-sm-6 col-md-6" },
        { label: "대표연락처", value: store?.call, class: "col-sm-6 col-md-6" }

      ]
    },
    getRedevOptions() {
      const {
        group_location: { redevelopment_area: houseInfo }
      } = this.estate;

      return [
        // { label: "개발사업 유형", value: houseInfo.category },
        { label: "정비구역 명칭", value: this.getValue(houseInfo.title) },
        { label: "정비사업 종류", value: this.getValue(houseInfo.category) },
        {
          label: "현재 사업추진단계",
          value: this.getValue(houseInfo.redevelopment_step)
        },
        {
          label: "시행사",
          value: this.getValue(houseInfo.title_construction_company)
        },
        {
          label: "시공사 (건설사)",
          value: this.getValue(houseInfo.title_build_company)
        },
        { label: "브랜드", value: this.getValue(houseInfo.title_brand) },
        {
          label: "건폐율 (%)",
          value: this.getValue(houseInfo.percentage_building_to_land, "%")
        },
        {
          label: "용적률 (%)",
          value: this.getValue(houseInfo.percentage_floor_area, "%")
        },
        {
          label: "비례율 (%)",
          value: this.getValue(houseInfo.percentage_proportionality, "%")
        },
        {
          label: "조합원 수",
          value: this.getValue(houseInfo.count_member?.toLocaleString(), "명")
        },
        {
          label: "부동산 소유자 수",
          value: this.getValue(houseInfo.count_owner?.toLocaleString(), "명")
        },
        {
          label: "세입자 수",
          value: this.getValue(houseInfo.count_house?.toLocaleString(), "명")
        },
        {
          label: "(분양) 세대 수",
          value: this.getValue(houseInfo.count_sale?.toLocaleString(), "세대")
        },
        {
          label: "(임대) 세대 수",
          value: this.getValue(houseInfo.count_rent?.toLocaleString(), "세대")
        },
        {
          label: "입주예정일",
          value: houseInfo.description_move_condition
        },

        { label: "사업 유형", value: this.getValue(houseInfo.business_type) },
        {
          label: "사업 구분",
          value: this.getValue(houseInfo.business_classification)
        },
        {
          label: "추진위 수행여부",
          value: this.getValue(houseInfo.status_promotion_committee)
        },
        {
          label: "공공지원 대상여부",
          value: this.getValue(houseInfo.status_public_support)
        },
        {
          label: "건축 계획",
          value: this.getValue(houseInfo.status_architectural_plan)
        },
        {
          label: "주택공급계획",
          value: this.getValue(houseInfo.status_sharing_plan)
        }
      ];
    },
    getPersons() {
      const redevTitle =
        this.estate.group_location.redevelopment_area?.title ?? "";
      return [
        {
          rank: `${redevTitle} 전문 컨설턴트`,
          text: `
          ${this.estate.group_user.user.name} ${
            this.estate.group_user.user.type_rank ?? ""
          }`,
          phone: this.estate.group_user.user.phone || ""
        }
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
        { label: "공급 / 전용 면적", info: "41.76 / 130.28m²" },
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

.area-name {
  font-family: "nanum-square";
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -1.2px;
  color: #707070;
}

.price-name {
  font-family: "nanum-square";
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -2.7px;
  span {
    color: #00a4aa;
  }
}

.initial-investments {
  background: #f7f7f7;
  border-radius: 8px;

  .title {
    font-family: "nanum-square";
    font-size: 17px;
    line-height: 36px;
    letter-spacing: -1.275px;
    width: 100px;
    color: #707070;
  }

  .price {
    font-family: "nanum-square";
    font-weight: 500;
    font-size: 17px;
    line-height: 36px;
    letter-spacing: -1.275px;
    color: #1a1a1a;
  }
}
.bottom-title {
  font-family: "nanum-square-regular";
  font-size: 16px;
  line-height: 60px;
  letter-spacing: -1.2px;
  color: #1a1a1a;
}

.heading-title {
  font-family: "nanum-square";
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 19px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
}

</style>
