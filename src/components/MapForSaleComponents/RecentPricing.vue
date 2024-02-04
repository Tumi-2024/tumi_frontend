<template>
  <q-card class="bg-white nanum-square">
    <q-card-section class="row q-pb-none justify-between">
      <div class="title-heading col-6">최근 실거래가</div>

      <q-select
        dense
        v-model="areaSelected"
        :options="areaOptions"
        hide-selected
        :label="areaSelected || '평수'"
        class="area-selection"
        color="primary"
        label-color="primary"
        v-if="areaOptions"
      />
    </q-card-section>
    <!-- recent pricing -->
    <q-card-section class="recent-pricing w-100">
      <div class="row">
        <div class="col">
          <q-badge outline class="text-primary bg-white q-mr-sm">
            매매가
          </q-badge>
          <q-badge outline class="text-grey bg-white q-mr-sm">
            {{ salePrice.date }}
          </q-badge>
          <div class="price">
            {{ salePrice.value }}
          </div>
        </div>

        <q-separator vertical style="margin: 0 20px" v-if="charter.value" />

        <div class="col" v-if="charter.value">
          <q-badge outline class="text-teal bg-white q-mr-sm"> 전세가 </q-badge>
          <q-badge outline class="text-grey bg-white q-mr-sm">
            {{ charter.date }}
          </q-badge>
          <div class="price">
            {{ charter.value }}
          </div>
        </div>
      </div>
      <div class="price-per-land-area row q-mt-md" v-if="pricePerLandArea">
        <div class="label text-grey-14 notosanskr-regular">토지면적당 단가</div>
        <q-separator vertical class="q-mx-xs" />
        <div class="value text-primary nanum-square">
          {{ pricePerLandArea }}/ 평
        </div>
      </div>
    </q-card-section>

    <q-card-section
      class="table bg-white notosanskr-regular"
      v-if="extraDetails"
    >
      <div
        class="row q-pb-sm"
        v-for="detail in extraDetails"
        :key="detail.label"
      >
        <div class="col-4">
          <span class="label text-30">{{ detail.label }}</span>
        </div>
        <div class="col-8">
          <span class="label text-50">{{ detail.info }}</span>
        </div>
      </div>
    </q-card-section>

    <q-card-section class="bg-white q-pb-xl nanum-square" v-if="showUnits">
      <div class="unit-heading q-py-xs notosanskr-regular">단위(만)</div>

      <div class="unit-table">
        <!-- Division | 구분 -->
        <div class="row notosanskr-regular">
          <div class="col-3">구분</div>
          <div class="col-3 bg-white row justify-center">
            <text-under-highlight text="하위평균가" secondary />
          </div>
          <div class="col-3">일반평균가</div>
          <div class="col-3 row justify-center">
            <text-under-highlight text="상위평균가" class="bg-white" />
          </div>
        </div>
        <!--  Sale Price | 매매가 -->
        <div class="row">
          <div class="col-3">매매가</div>
          <div class="col-3">{{ unit.salePrice.below }}</div>
          <div class="col-3">{{ unit.salePrice.general }}</div>
          <div class="col-3">{{ unit.salePrice.above }}</div>
        </div>
        <!-- Charter | 전세가 -->
        <div class="row">
          <div class="col-3">전세가</div>
          <div class="col-3">{{ unit.charter.below }}</div>
          <div class="col-3">{{ unit.charter.general }}</div>
          <div class="col-3">{{ unit.charter.above }}</div>
        </div>
        <!-- Monthly rent | 월세가 -->
        <div class="row">
          <div class="col-3">월세가</div>
          <div class="monthly col notosanskr-bold">
            {{ unit.monthly.deposit }}
            <span class="notosanskr-regular">보증금 /</span>
            {{ unit.monthly.rent }}
            <span class="notosanskr-regular">월세</span>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import TextUnderHighlight from "components/Utilities/TextUnderHighlight";
export default {
  components: {
    TextUnderHighlight
  },
  data() {
    return {
      areaSelected: ""
    };
  },
  props: {
    extraDetails: Array,
    areaOptions: Array,
    salePrice: {
      type: Object,
      default: () => ({
        value: "",
        date: ""
      })
    },
    charter: {
      type: Object,
      default: () => ({
        value: "",
        date: ""
      })
    },
    showUnits: {
      type: Boolean,
      default: false
    },
    unit: {
      type: Object,
      default: () => ({
        salePrice: {
          below: "-",
          general: "-",
          above: "-"
        },
        charter: {
          below: "-",
          general: "-",
          above: "-"
        },
        monthly: {
          deposit: "-천만",
          rent: "-~-만"
        }
      })
    },
    pricePerLandArea: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss" scoped>
.title-heading {
  font-size: 17px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
  line-height: 26px;
}
.area-selection {
  width: 75px;
  float: right;
  border: #ff5a00 solid 2px;
  border-radius: 8px;
  padding-left: 10px;
}

.recent-pricing {
  border-radius: 8px;
  background: #f7f7f7;
  margin: 20px 16px;

  .price {
    letter-spacing: -1.575px;
    color: #3a3a3a;
    font-size: 21px;
    line-height: 32px;
    margin-top: 4px;
  }

  .q-badge {
    margin-right: 4px;
    line-height: 20px;
    font-size: 12px;
    padding: 0 4px;
  }

  .price-per-land-area {
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -1.2px;
    .value {
      font-weight: 500;
    }
  }
}
.unit-heading {
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  text-align: right;
  letter-spacing: -0.9px;
  color: #909090;
}
.table {
  margin-top: 20px;
  border-top: 1px dashed #e8e8e8;
}
.unit-table {
  font-size: 13px;
  line-height: 22px;
  letter-spacing: -1.05px;
  border-bottom: 1px solid #e8e8e8;
  border-top: 1px solid #1a1a1a;

  div:nth-child(1) {
    font-weight: 400;
    font-size: 14px;
  }

  .row div:nth-child(1) {
    color: #707070;
    background: #f7f7f7;
  }
  .col-3 {
    padding: 10px 0;
    text-align: center;
    border-bottom: 1px solid #e8e8e8;
  }

  .col-3:nth-child(3) {
    border-left: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
  }

  .col {
    padding: 10px 12px;
  }
}

.text-30 {
  color: #707070;
}
.monthly {
  font-weight: 500;
  font-size: 13px;
  letter-spacing: -0.98px;
  color: #1a1a1a;
  span {
    color: #707070;
  }
}
</style>
