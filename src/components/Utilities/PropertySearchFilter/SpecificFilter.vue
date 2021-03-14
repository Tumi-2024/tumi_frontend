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
          <component :is="contentComponent" v-on:select="select" v-on:selectDetail="selectDetail" />
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
import { toQueryString } from 'src/utils'
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
      modal: false,
      selected: '',
      selectedDetail: '',
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
  mounted() {
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
  },
  methods: {
    select(val) {
      console.log(val);
      this.selected = val;
    },
    selectDetail(val) {
      console.log(val);
      this.selectedDetail = val;
    },
    save() {
      if (this.selected) {
        console.log('저장 ', this.selected, this.selectedDetail);
        if (this.transactionType) {
          this.$store.dispatch('setTypeSale', this.selected);
        }
        if (this.propertyType) {
          this.$store.dispatch('setTypeHouse', this.selected);
          if (this.selectedDetail) {
            this.$store.dispatch('setTypeHouseDetail', this.selectedDetail);
          }
        }
        if (this.salePrice) {
          this.$store.dispatch('setSalePrice', this.selected);
        }
        if (this.charterPriceDeposit) {
          this.$store.dispatch('setDepositPrice', this.selected);
        }
      }
      this.$store.dispatch('getSimpleHouses', toQueryString(this.$store.state.search));
      this.$store.dispatch('getDistinctHouses', toQueryString(this.$store.state.search));
      this.$store.dispatch('getDetailHouses', toQueryString({
        latitude: this.$store.state.map.mapCenter.lat,
        longitude: this.$store.state.map.mapCenter.lng,
        ...this.$store.state.search
      }));
      this.modal = false;
    },
    init() {
      if (this.selected) {
        console.log('저장 ', this.selected);
        if (this.transactionType) {
          this.selected = '전체';
          this.$store.dispatch('setTypeSale', '전체');
        }
        if (this.propertyType) {
          this.selected = '';
          this.$store.dispatch('setTypeHouse', '');
          if (this.selectedDetail) {
            this.selectedDetail = '전체';
            this.$store.dispatch('setTypeHouseDetail', '전체');
          }
        }
        if (this.salePrice) {
          this.selected = { text: '전체', min: null, max: null, };
          this.$store.dispatch('setSalePrice', {
            text: '전체',
            min: null,
            max: null,
          });
        }
        if (this.charterPriceDeposit) {
          this.selected = { text: '전체', min: null, max: null, };
          this.$store.dispatch('setDepositPrice', {
            text: '전체',
            min: null,
            max: null,
          });
        }
      }
      // this.$store.dispatch('getSimpleHouses', toQueryString(this.$store.state.search));
      // this.$store.dispatch('getDistinctHouses', toQueryString(this.$store.state.search));
      // this.$store.dispatch('getDetailHouses', toQueryString({
      //   latitude: this.$store.state.map.mapCenter.lat,
      //   longitude: this.$store.state.map.mapCenter.lng,
      //   ...this.$store.state.search
      // }));
      this.modal = false;
    },
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
