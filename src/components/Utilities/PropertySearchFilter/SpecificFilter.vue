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
      <span style="min-width: 5vw">{{ label }}</span>
    </q-btn>

    <!-- Dialog Section -->
    <q-dialog v-model="modal" position="bottom">
      <q-card class="notosanskr-regular">
        <q-card-section class="head-section bg-white notosanskr-medium">
          <div class="indicator"></div>
        </q-card-section>

        <q-card-section
          class="q-pa-none bg-white notosanskr-medium"
          style="min-height: 200px"
        >
          <component
            ref="component"
            :is="component"
            @select="select"
            @selectDetail="selectDetail"
            :value="value"
            :label="label"
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
  ExclusiveArea,
  PriceFilter,
  PersonFilter
} from "components/Utilities/PropertySearchFilter/Selections";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    "transaction-type": TransactionType,
    "maintenance-type": MaintenanceType,
    "property-type": PropertyType,
    "property-sale-price": PropertySalePrice,
    "charter-price-deposit": CharterPriceDeposit,
    "exclusive-area": ExclusiveArea,
    price: PriceFilter,
    person: PersonFilter
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
    component: { type: String, require: true },
    salePrice: { type: Boolean, default: false },
    charterPriceDeposit: { type: Boolean, default: false },
    disable: { type: Boolean, default: false },
    propsClass: { type: String, default: "" },
    value: { type: [Array, Object], require: false }
  },
  computed: {
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
      this.setQuery({
        key: this.$refs.component.keyName || this.keyName,
        data: this.selected
      });
      this.modal = false;
    },

    async init() {
      this.modal = false;
      const test = await this.initializeQuery("categories");
      this.selected = Array(test);
    }
  },
  mounted() {
    this.selected = this.value;
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
  line-height: calc((36 / 1312) * 100vh);
  font-size: calc((14 / 1312) * 100vh);
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
