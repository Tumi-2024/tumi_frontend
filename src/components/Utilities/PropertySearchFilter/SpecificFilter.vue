<template>
  <div>
    <q-btn
      unelevated
      padding="0px"
      class="modal-btn q-ma-none no-wrap"
      :class="[disable, propsClass]"
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
          <component
            :is="contentComponent"
            @select="select"
            @selectDetail="selectDetail"
          />
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
                @click="init"
              />
            </div>
            <div class="col q-mx-xs">
              <!-- apply | 적용 -->
              <q-btn
                class="apply-btn bg-primary text-white"
                flat
                label="적용"
                padding="12px"
                @click="save"
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
  CharterPriceDeposit,
  MaintenanceType,
  ExclusiveArea
} from "components/Utilities/PropertySearchFilter/Selections";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    "transaction-type": TransactionType,
    "maintenance-type": MaintenanceType,
    "property-type": PropertyType,
    "property-sale-price": PropertySalePrice,
    "charter-price-deposit": CharterPriceDeposit,
    "exclusive-area": ExclusiveArea
  },
  data() {
    return {
      modal: false,
      keyName: "",
      selected: [],
      selectedDetail: ""
    };
  },
  props: {
    label: { type: String, default: "" },
    maintenanceType: { type: Boolean, default: false },
    transactionType: { type: Boolean, default: false },
    propertyType: { type: Boolean, default: false },
    exclusiveArea: { type: Boolean, default: false },
    salePrice: { type: Boolean, default: false },
    charterPriceDeposit: { type: Boolean, default: false },
    disable: { type: Boolean, default: false },
    propsClass: { type: String, default: "" }
  },
  computed: {
    contentComponent() {
      let component;
      if (this.transactionType) {
        component = "transaction-type";
      }
      if (this.exclusiveArea) {
        component = "exclusive-area";
      }
      if (this.maintenanceType) {
        component = "maintenance-type";
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
    },
    ...mapGetters("searchQuery", ["getQueryString", "getQuery"]),
    ...mapGetters("map", ["getMapCenter"])
  },
  methods: {
    ...mapActions("searchQuery", ["setQuery", "initializeQuery"]),
    // STORE MODULE ACTIONS ***
    // ...mapActions("searchQuery", [
    //   "setTypeSale",
    //   "setTypeHouse",
    //   "setTypeHouseDetail",
    //   "setSalePrice",
    //   "setDepositPrice"
    // ]),
    // COMPONENTS METHODS STARTS ***
    select(obj, key) {
      this.selected = obj;
      this.keyName = key;
    },
    selectDetail(val) {
      this.selectedDetail = val;
    },
    save() {
      // if (this.keyName )
      const isTransaction = this.$route.path === "map/city/area";
      if (isTransaction) {
        this.selected.map(obj => {
          return obj.valueTransaction;
        });
      } else {
        this.selected.map(obj => {
          return obj.valueHouse;
        });
      }
      this.setQuery({ key: this.keyName, data: this.selected });
      this.modal = false;
    },
    async init() {
      this.selected = await this.initializeQuery("categories");
      this.modal = false;
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
