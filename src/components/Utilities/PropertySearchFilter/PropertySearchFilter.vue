<template>
  <div>
    <q-btn
      unelevated
      outline
      color="primary"
      padding="8px"
      style="border-radius: 8px; height: 36px;"
      class="q-mx-xs"
      @click="modal = true"
    >
      <q-icon size="20px">
        <img src="~assets/icons/Filter.svg" />
      </q-icon>
    </q-btn>
    <!-- Dialog Section -->
    <q-dialog v-model="modal" position="bottom">
      <q-card class="notosanskr-regular">
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
        <!-- Transactio type | 거래유형 -->
        <transaction-type></transaction-type>
        <!-- Property Type | 매물유형 -->
        <property-type class="q-mt-md"></property-type>
        <!-- property sale | 부동산 매매  -->
        <property-sale-price></property-sale-price>
        <!--  Charter price deposit | 전세가 / 보증금 -->
        <charter-price-deposit></charter-price-deposit>
        <!-- Property Monthly | 매월 부동산 -->
        <property-monthly></property-monthly>
        <!-- Exclusive Area | 전용면적 -->
        <exclusive-area></exclusive-area>
        <!-- Premium price | 프리미엄가, 감정가 -->
        <q-card-section class="q-pa-none bg-white q-mt-md notosanskr-medium">
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
        </q-card-section>
        <q-card-section class="empty-bottom-space"></q-card-section>
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
  ExclusiveArea
} from "components/Utilities/PropertySearchFilter/Selections";
export default {
  components: {
    "transaction-type": TransactionType,
    "property-type": PropertyType,
    "property-sale-price": PropertySalePrice,
    "charter-price-deposit": CharterPriceDeposit,
    "property-monthly": PropertyMonthly,
    "exclusive-area": ExclusiveArea
  },
  data() {
    return {
      modal: false
    };
  }
};
</script>

<style lang="scss" scoped>
.q-card {
  width: 100%;
  max-width: 1000px;
  height: 100vh;
  border-radius: 16px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background: #f0f0f0;
  .empty-bottom-space {
    height: 200px;
  }
}
.head-section {
  font-weight: 500;
  font-size: 17px;
  line-height: 44px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
  height: 44px;
}
</style>
