<template>
  <div>
    <q-btn
      unelevated
      padding="0px"
      class="q-ma-none no-wrap"
      @click="modal = true"
    >
      {{ label }}
    </q-btn>

    <!-- Dialog Section -->
    <q-dialog v-model="modal" position="bottom">
      <q-card class="notosanskr-regular">
        <q-card-section class="head-section bg-white notosanskr-medium">
          <div class="indicator"></div>
        </q-card-section>

        <q-card-section class="q-pa-none bg-white notosanskr-medium">
          <component :is="contentComponent" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  TransactionType,
  PropertyType,
  PropertySalePrice,
  CharterPriceDeposit
} from "components/Utilities/PropertySearchFilter/Selections";
export default {
  components: {
    "transaction-type": TransactionType,
    "property-type": PropertyType,
    "property-sale-price": PropertySalePrice,
    "charter-price-deposit": CharterPriceDeposit
  },
  data() {
    return {
      modal: false
    };
  },
  props: {
    label: { type: String, default: "" },
    transactionType: { type: Boolean, default: false },
    propertyType: { type: Boolean, default: false },
    salePrice: { type: Boolean, default: false },
    charterPriceDeposit: { type: Boolean, default: false }
  },
  computed: {
    contentComponent() {
      if (this.transactionType) {
        return "transaction-type";
      }
      if (this.propertyType) {
        return "property-type";
      }
      if (this.salePrice) {
        return "property-sale-price";
      }
      if (this.charterPriceDeposit) {
        return "charter-price-deposit";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.q-btn {
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 36px;
  text-align: center;
  letter-spacing: -1.05px;
  color: #1a1a1a;

  padding: 0px 4px;
  margin: 0px 2px;
}
.q-dialog {
  .q-card {
    width: 100%;
    max-width: 1000px;
    height: auto;
    border-radius: 16px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background: #f0f0f0;
    .empty-bottom-space {
      height: 200px;
    }
  }
  .head-section {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 17px;
    line-height: 44px;
    letter-spacing: -1.275px;
    color: #1a1a1a;
    height: 44px;
    .indicator {
      background: #dbdbdb;
      padding: 2px;
      width: 49px;
    }
  }
}
</style>
