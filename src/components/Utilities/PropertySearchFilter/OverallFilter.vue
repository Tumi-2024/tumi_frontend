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
          <!-- Transaction type | 거래유형 -->
          <transaction-type class="bg-white q-pb-xl q-pt-md"></transaction-type>
          <!-- Property Type | 매물유형 -->
          <property-type
            class="q-pb-xl bg-white q-mt-sm"
            style="padding-top: 36px"
          ></property-type>
          <!-- property sale | 부동산 매매  -->
          <property-sale-price
            class="q-pb-xl bg-white q-mt-sm"
            style="padding-top: 36px"
          ></property-sale-price>
          <!--  Charter price deposit | 전세가 / 보증금 -->
          <charter-price-deposit
            class="q-pb-xl bg-white q-mt-sm"
            style="padding-top: 36px"
          ></charter-price-deposit>
          <!-- Property Monthly | 매월 부동산 -->
          <property-monthly
            class="q-pb-xl bg-white q-mt-sm"
            style="padding-top: 36px"
          ></property-monthly>
          <!-- Exclusive Area | 전용면적 -->
          <exclusive-area
            class="q-pb-xl bg-white q-mt-sm"
            style="padding-top: 36px"
          ></exclusive-area>

          <!-- Premium price | 프리미엄가, 감정가 -->
          <q-card-section class="q-pa-none bg-white q-mt-md notosanskr-medium">
            <!-- Dropdown Button -->
            <q-btn
              flat
              color="white"
              align="between"
              class="full-width"
              text-color="black"
              padding="16px"
            >
              프리미엄가, 감정가
              <q-icon name="keyboard_arrow_down" size="24px" />
            </q-btn>

            <div class="more-filters">
              <property-premium-price
                class="q-pb-xl bg-white q-mt-sm"
                style="padding-top: 36px"
              ></property-premium-price>
              <property-connoisseur
                class="q-pb-xl bg-white q-mt-sm"
                style="padding-top: 36px"
              ></property-connoisseur>
            </div>

            <!-- Action buttons -->
            <div class="row q-pb-md justify-around notosanskr-medium">
              <div class="col q-mx-xs">
                <!-- reset | 초기화 -->
                <q-btn
                  class="reset-btn bg-grey-3"
                  flat
                  text-color="black"
                  label="초기화"
                  padding="12px"
                />
              </div>
              <div class="col q-mx-xs">
                <!-- apply | 적용 -->
                <q-btn
                  class="apply-btn bg-primary text-white"
                  flat
                  label="적용"
                  padding="12px"
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
  TransactionType,
  PropertyType,
  PropertySalePrice,
  CharterPriceDeposit,
  PropertyMonthly,
  ExclusiveArea,
  PropertyPremiumPrice,
  PropertyConnoisseur
} from "components/Utilities/PropertySearchFilter/Selections";
export default {
  components: {
    "transaction-type": TransactionType,
    "property-type": PropertyType,
    "property-sale-price": PropertySalePrice,
    "charter-price-deposit": CharterPriceDeposit,
    "property-monthly": PropertyMonthly,
    "exclusive-area": ExclusiveArea,
    "property-premium-price": PropertyPremiumPrice,
    "property-connoisseur": PropertyConnoisseur
  },
  data() {
    return {
      modal: false
    };
  },
  props: {
    disable: {
      type: Boolean,
      default: false
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
