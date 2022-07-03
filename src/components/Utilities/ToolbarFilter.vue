<template>
  <q-card-section class="row items-center flex justify-end q-pa-none q-ma-none">
    <!-- Dialog containing all filters-->

    <div class="col flex items-end justify-between">
      <div class="row items-center" style="margin-bottom: 12px; display: flex">
        <div class="column" style="min-width: 150px">
          <div class="helper text-left notosanskr-regular">
            {{ getToolbarLabel }}
          </div>
          <div class="location-text text-left notosanskr-regular">
            {{ getToolbarTitle }}
          </div>
        </div>
        <div
          class="q-my-xs col-4 text-left notosanskr-medium q-ml-lg flex"
          v-if="$route.name !== 'map_city'"
        >
          <q-select
            ref="keywordRef"
            filled
            label="검색"
            dense
            :value="searchText"
            @input-value="onChangeSearchText"
            @input="onSelect"
            :input-debounce="0"
            use-input
            fill-input
            hide-selected
            :options="options"
            @filter="filterFn"
            style="flex: 1"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>
      <div class="flex" style="margin-bottom: 12px">
        <overall-filter :disable="disable" />
        <div
          class="scrolling-wrapper-flexbox notosanskr-medium row float-right"
          :class="{ hideScrollbar: $q.platform.is.mobile }"
        >
          <slot>
            <div class="items" v-for="(filter, i) of getFilters" :key="i">
              <specific-filter
                v-if="!filter.isHide"
                :propsClass="filter.class"
                :label="filter.label"
                :component="filter.type"
                :keyName="filter.keyName"
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
    ...mapGetters("queryBuilder", [
      "categories",
      "area",
      "price",
      "initPrice",
      "person",
      "isMultiSelect"
    ]),
    getFilters() {
      return [
        {
          label: "주택유형",
          type: "property-type",
          class: this.categories.length ? "text-white bg-primary" : "text-grey",
          keyName: "categories"
        },
        {
          label: "면적종류",
          type: "exclusive-area",
          class: this.area.value ? "text-white bg-green" : "text-grey",
          keyName: "areaType"
        },
        {
          label: "가격",
          type: "PriceFilter",
          class:
            this.price.min || this.price.max
              ? "text-white bg-blue"
              : "text-grey",
          keyName: "prices"
        },
        {
          label: "초기투자금",
          type: "PriceFilter",
          class:
            this.initPrice.min || this.initPrice.max
              ? "text-white bg-purple"
              : "text-grey",
          isHide: this.$route.path !== "/map/city",
          keyName: "initPrices"
        },
        {
          label: "담당자",
          type: "PersonFilter",
          class: this.person?.length > 0 ? "text-white bg-black" : "text-grey",
          isHide: this.$route.path !== "/map/city",
          keyName: "users"
        }
      ];
    }
  },
  data() {
    return {
      searchText: "",
      options: []
    };
  },
  props: {
    disable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions("map", ["changeMapMode", "changeMapZoom", "changeMapCenter"]),
    onSelect(obj) {
      this.changeMapCenter(obj.position);
      this.changeMapZoom(16);
    },
    onChangeSearchText(e) {
      this.searchText = e;
      this.options = [];
    },
    async filterFn(val, update, abort) {
      if (val !== "") {
        const {
          data: { results }
        } = await Vue.prototype.$axios.get(
          `redevelopment_areas/?search=${val}`
        );
        update(async () => {
          this.options = results.map(({ title, latitude, longitude }) => {
            return {
              value: title,
              label: title,
              position: { lat: Number(latitude), lng: Number(longitude) }
            };
          });
        });
      } else {
        update();
      }
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
  font-size: calc((12 / 1312) * 100vh);
  line-height: calc((16 / 1312) * 100vh);
  letter-spacing: -0.9px;
  color: #707070;
}
.location-text {
  font-weight: 500;
  font-size: calc((18 / 1312) * 100vh);
  line-height: calc((24 / 1312) * 100vh);
  letter-spacing: -1.575px;
  color: #1a1a1a;
}
</style>
