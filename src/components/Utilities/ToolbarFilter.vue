<template>
  <q-card flat>
    <q-card-section class="row justify-between q-pa-none q-ma-none">
      <!-- Dialog containing all filters-->
      <overall-filter :disable="disable" />

      <div class="col w-100" :class="{ 'set-height': $q.platform.is.desktop }">
        <div
          class="scrolling-wrapper-flexbox notosanskr-medium row w-100 float-right"
          :class="{ hideScrollbar: $q.platform.is.mobile }"
        >
          <slot>
            <div class="items" v-for="(filter, i) of filters" :key="i">
              <specific-filter
                :label="filter.label"
                :transactionType="filter.type === 'transactionType'"
                :propertyType="filter.type === 'propertyType'"
                :salePrice="filter.type === 'salePrice'"
                :charterPriceDeposit="filter.type === 'charterPriceDeposit'"
                :disable="disable"
              />
            </div>
          </slot>
          <div class="q-px-xs"></div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import OverallFilter from "components/Utilities/PropertySearchFilter/OverallFilter";
import SpecificFilter from "components/Utilities/PropertySearchFilter/SpecificFilter";

export default {
  components: {
    "overall-filter": OverallFilter,
    "specific-filter": SpecificFilter
  },
  data() {
    return {
      filters: [
        {
          label: "거래유형",
          type: "transactionType"
        },
        {
          label: "매물유형",
          type: "propertyType"
        },
        {
          label: "매매가",
          type: "salePrice"
        },
        {
          label: "전세가/보증금",
          type: "charterPriceDeposit"
        }
      ]
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
.q-card {
  width: 100%;
  overflow: hidden;
}
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  scroll-padding: 0px;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;

  .items {
    flex: 0 0 auto;
  }
  &.hideScrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.set-height {
  height: 55px;
}
</style>
