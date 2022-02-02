<template>
  <div>
    <q-btn
      unelevated
      outline
      :color="!disable ? 'primary' : 'orange-3'"
      padding="8px"
      style="border-radius: 8px; height: 36px;"
      class="q-mx-xs"
      @click="modal = true"
      :disable="disable"
    >
      <q-icon size="20px">
        <img src="~assets/icons/Filter.svg" alt="filter" />
      </q-icon>
    </q-btn>
    <!-- Dialog Section -->
    <q-dialog v-model="modal" position="bottom">
      <q-card class="notosanskr-regular overflow-hidden">
        <q-card-section
          class="head-section bg-white notosanskr-medium row justify-between items-center"
        >
          <div>검색 필터</div>
          <q-btn flat padding="0px"
            ><q-icon
              name="close"
              class="cursor-pointer"
              size="24px"
              @click="modal = false"
            />
          </q-btn>
        </q-card-section>
        <!-- contents starts here -->
        <div class="full-height relative-position overflow-auto">

          <!-- Property Type | 주택 유형 -->
          <property-type
            class="q-pb-xl bg-white q-mt-sm"
            style="padding-top: 36px"
            @select="setSelected('propertyType', $event)"
            @selectDetail="setSelected('propertyTypeDetailed', $event)"
          ></property-type>

          <!-- property sale | 부동산 매매  -->
          <!-- <property-sale-price
            class="q-pb-xl bg-white q-mt-sm"
            style="padding-top: 36px"
            @select="setSelected('propertySalePrice', $event)"
          ></property-sale-price> -->

          <!--  Charter price deposit | 전세가 / 보증금 -->
          <!-- <charter-price-deposit
            class="q-pb-xl bg-white q-mt-sm"
            style="padding-top: 36px"
            @select="setSelected('charterPriceDeposit', $event)"
          ></charter-price-deposit> -->
          <!-- Property Monthly | 매월 부동산 -->
          <!-- <property-monthly
            class="q-pb-xl bg-white q-mt-sm"
            style="padding-top: 36px"
            @select="setSelected('propertyMonthly', $event)"
          ></property-monthly> -->
          <!-- Exclusive Area | 전용면적 -->

          <exclusive-area
            class="q-pb-xl bg-white q-mt-sm"
            style="padding-top: 36px"
            @select="setSelected('exclusiveArea', $event)"
          ></exclusive-area>

          <price-filter class="q-pb-xl bg-white q-mt-sm" style="padding-top: 36px" />
          <person-filter class="q-pb-xl bg-white q-mt-sm" style="padding-top: 36px" />

          <q-card-section class="q-pa-none bg-white q-mt-md notosanskr-medium">
            <!-- Action buttons -->
            <div class="row q-py-md justify-around notosanskr-medium">
              <div class="col q-mx-xs">
                <!-- reset | 초기화 -->
                <q-btn
                  class="reset-btn bg-grey-3"
                  flat
                  text-color="black"
                  label="초기화"
                  padding="12px"
                  @click="resetFilters()"
                />
              </div>
              <div class="col q-mx-xs">
                <!-- apply | 적용 -->
                <q-btn
                  class="apply-btn bg-primary text-white"
                  flat
                  label="적용"
                  padding="12px"
                  @click="applyFilters"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-section class="empty-bottom-space"></q-card-section>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  PropertyType,
  ExclusiveArea,
  PriceFilter,
  PersonFilter
} from "components/Utilities/PropertySearchFilter/Selections";

export default {
  components: {
    "property-type": PropertyType,
    "exclusive-area": ExclusiveArea,
    "price-filter": PriceFilter,
    "person-filter": PersonFilter
  },
  data() {
    return {
      modal: false,
      moreFilters: false,
      overallFilter: {}
    };
  },
  props: {
    disable: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.overallFilter = this.setInitValue();
  },
  methods: {
    setInitValue() {
      return {
        // 거래 유형
        transactionType: "전체",
        // 주택 유형
        propertyType: "아파트",
        // 재개발 or 가로주택 시 주택 세부 유형
        propertyTypeDetailed: null,
        // 매매가
        propertySalePrice: {
          max: null,
          min: null,
          text: "전체"
        },
        // 매매가
        charterPriceDeposit: {
          max: null,
          min: null,
          text: "전체"
        },
        // 월세
        propertyMonthly: {
          max: null,
          min: null,
          text: "전체"
        },
        // 전용 면적
        exclusiveArea: "10평대",
        // 프리미엄가
        propertyPremiumPrice: null,
        // 감정가
        propertyConnoisseur: null
      };
    },
    resetFilters() {
      this.overallFilter = this.setInitValue();
      console.log(this.overallFilter, "reset");
    },
    setSelected(property, value) {
      this.overallFilter[property] = value;
    },
    applyFilters() {
      console.log(this.overallFilter);
    }
  }
};
</script>

<style lang="scss" scoped>
$max-width: 1000px;

.q-card {
  width: 100%;
  max-width: $max-width;
  height: 100vh;
  border-radius: 16px 16px 0 0;
  background: #f0f0f0;
  .empty-bottom-space {
    height: 200px;
  }
}
.head-section {
  font-weight: 500;
  font-size: 17px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
}

.more-filters {
  background: #f0f0f0;
}

.apply-btn,
.reset-btn {
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 28px;
  text-align: center;
  letter-spacing: -1.275px;
  color: #1a1a1a;
  width: 100%;
  border-radius: 12px;
}
</style>
