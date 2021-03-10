<template>
  <div>
    <q-btn
      unelevated
      padding="0px"
      class="modal-btn q-ma-none no-wrap"
      :class="{ disable: disable }"
      @click="modal = true"
      :disable="disable"
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

        <q-card-section class="q-pt-lg bg-white">
          <div class="row justify-around notosanskr-medium">
            <div class="col q-mx-xs">
              <!-- reset | 초기화 -->
              <q-btn
                class="reset-btn bg-grey-3"
                flat
                text-color="black"
                label="초기화"
                padding="12px"
                @click="modal = false"
              />
            </div>
            <div class="col q-mx-xs">
              <!-- apply | 적용 -->
              <q-btn
                class="apply-btn bg-primary text-white"
                flat
                label="적용"
                padding="12px"
                @click="modal = false"
              />
            </div>
          </div>
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
    charterPriceDeposit: { type: Boolean, default: false },
    disable: { type: Boolean, default: false }
  },
  computed: {
    contentComponent() {
      let component;
      if (this.transactionType) {
        component = "transaction-type";
      }
      if (this.propertyType) {
        component = "property-type";
      }
      if (this.salePrice) {
        component = "property-sale-price";
      }
      if (this.charterPriceDeposit) {
        component = "charter-price-deposit";
      }
      return component;
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-btn {
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

  padding: 0 4px;
  margin: 0 2px;

  &.disable {
    color: #909090;
  }
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
.q-dialog {
  .q-card {
    width: 100%;
    max-width: 1000px;
    height: auto;
    border-radius: 16px 16px 0 0;
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
