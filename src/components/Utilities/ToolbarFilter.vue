<template>
  <q-card-section
    class="row items-center flex justify-between q-pa-none q-ma-none"
  >
    <!-- Dialog containing all filters-->
    <overall-filter :disable="disable" />

    <div class="col flex items-center">
      <div
        class="scrolling-wrapper-flexbox notosanskr-medium row float-right"
        :class="{ hideScrollbar: $q.platform.is.mobile }"
      >
        <slot>
          <div class="items" v-for="(filter, i) of filters" :key="i">
            <!-- :transactionType="filter.type === 'transactionType'"
              :maintenanceType="filter.type === 'maintenanceType'" -->
            <specific-filter
              :propsClass="filter.class"
              :label="filter.label"
              :propertyType="filter.type === 'propertyType'"
              :salePrice="filter.type === 'salePrice'"
              :registrationDate="filter.type === 'registrationDate'"
              :disable="disable"
            />
            <!-- :charterPriceDeposit="filter.type === 'charterPriceDeposit'" -->
          </div>
        </slot>
        <div class="q-px-xs"></div>
      </div>
    </div>
  </q-card-section>
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
          label: "주택유형",
          type: "propertyType",
          class: "text-white bg-primary"
        },
        {
          label: "평형",
          type: "propertyType",
          class: "text-white bg-green"
        },
        {
          label: "매매가",
          type: "salePrice",
          class: "text-white bg-blue"
        },
        {
          label: "매물등록일자",
          type: "registrationDate",
          class: "text-white bg-black"
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
