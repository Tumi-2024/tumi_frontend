<template>
  <q-card-section class="row items-center flex justify-end q-pa-none q-ma-none">
    <!-- Dialog containing all filters-->

    <div class="col flex items-center justify-between">
      <div class="row items-center">
        <div class="column" v-if="$router.name === 'map_list_sale'">
          <div class="helper text-left notosanskr-regular">
            {{ getToolbarLabel }}
          </div>
          <div class="location-text text-left notosanskr-regular">
            {{ getToolbarTitle }}
          </div>
        </div>
        <div class="q-my-xs col-4 text-left notosanskr-medium" style="flex: 1">
          <q-input
            v-model="searchText"
            filled
            class="q-mr-sm"
            type="search"
            placeholder="검색"
            @keydown.enter.prevent="onSearch"
          >
            <template v-slot:append>
              <q-icon @click="onSearch" name="search" />
            </template>
          </q-input>

          <!-- <q-select
            ref="keywordRef"
            filled
            label="검색"
            v-model="searchText"
            @input="onSelect"
            use-input
            fill-input
            hide-selected
            clearable
            :options="options"
            @filter="filterFn"
            style="width: 250px"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select> -->
        </div>
      </div>
      <div class="flex">
        <overall-filter :disable="disable" />
        <div
          class="scrolling-wrapper-flexbox notosanskr-medium row float-right"
          :class="{ hideScrollbar: $q.platform.is.mobile }"
        >
          <slot>
            <div class="items" v-for="(filter, i) of filters" :key="i">
              <specific-filter
                v-if="!filter.isHide"
                :propsClass="filter.class"
                :label="filter.label"
                :component="filter.type"
                :value="[...getOption(filter.keyName)]"
              />
            </div>
          </slot>
          <div class="q-px-xs"></div>
        </div>
      </div>
    </div>
  </q-card-section>
</template>

<script>
import Vue from "vue";
import OverallFilter from "components/Utilities/PropertySearchFilter/OverallFilter";
import SpecificFilter from "components/Utilities/PropertySearchFilter/SpecificFilter";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    "overall-filter": OverallFilter,
    "specific-filter": SpecificFilter
  },
  computed: {
    ...mapGetters("map", ["getMapMode", "getToolbarLabel", "getToolbarTitle"]),
    ...mapGetters("searchQuery", ["getQueryString", "getOption"])
  },
  data() {
    return {
      searchText: "",
      options: [],
      filters: [
        {
          label: "주택유형",
          type: "property-type",
          class: "text-white bg-primary",
          keyName: "categories"
        },
        {
          label: "면적종류",
          type: "exclusive-area",
          class: "text-white bg-green"
        },
        {
          label: "가격",
          type: "price",
          class: "text-white bg-blue"
        },
        {
          label: "초기투자금",
          type: "price",
          class: "text-white bg-purple",
          isHide: this.$route.path !== "/map/city"
        },
        {
          label: "담당자",
          type: "person",
          class: "text-white bg-black"
        }
        // {
        //   label: "매매가",
        //   type: "salePrice",
        //   class: "text-white bg-blue"
        // },
        // {
        //   label: "매물등록일자",
        //   type: "registrationDate",
        //   class: "text-white bg-black"
        // }
      ]
    };
  },
  props: {
    disable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions("map", [
      "changeMapMode",
      "changeMapZoom",
      "changeMapCenter",
      "changeToolbarTitle"
    ]),
    onSearch() {
      this.$emit("search", this.searchText);
    }
  }
};
</script>

<style lang="scss" scoped>
.type-page {
  font-weight: 500;
  font-size: 21px;
  line-height: 32px;
  color: #3a3a3a;
}
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
.helper {
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.9px;
  color: #707070;
}
.location-text {
  font-weight: 500;
  font-size: 21px;
  line-height: 30px;
  letter-spacing: -1.575px;
  color: #1a1a1a;
}
</style>
