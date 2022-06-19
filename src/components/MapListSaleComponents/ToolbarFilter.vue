<template>
  <q-card-section
    class="row items-center flex justify-end q-pa-none q-ma-none"
    style="flex: 1"
  >
    <!-- Dialog containing all filters-->

    <div class="col flex items-center justify-between">
      <div class="row items-center">
        <div
          class="q-my-xs col-4 text-left notosanskr-medium row"
          style="flex: 1"
        >
          <q-select
            class="q-mr-md"
            style="width: 120px"
            dense
            emit-value
            map-options
            v-model="option"
            :options="[
              { label: '개발정비사업', value: 'redev' },
              { label: '지역', value: 'location' },
              { label: '건물/단지', value: 'building' }
            ]"
          />
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
      <div class="flex">
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
// import SpecificFilter from "components/Utilities/PropertySearchFilter/SpecificFilter";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    "overall-filter": OverallFilter,
    "specific-filter": SpecificFilter
  },
  computed: {
    ...mapGetters("map", ["getMapMode", "getToolbarLabel", "getToolbarTitle"]),
    ...mapGetters("searchOption", [
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
          class: "text-white bg-primary",
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
          type: "price",
          class:
            this.price.min || this.price.max
              ? "text-white bg-blue"
              : "text-grey",
          keyName: "prices"
        },
        {
          label: "초기투자금",
          type: "price",
          class:
            this.initPrice.min || this.initPrice.max
              ? "text-white bg-purple"
              : "text-grey",
          isHide: this.$route.path !== "/map/city",
          keyName: "initPrices"
        },
        {
          label: "담당자",
          type: "person",
          class: this.person?.length > 0 ? "text-white bg-black" : "text-grey",
          keyName: "users"
        }
      ];
    }
  },
  data() {
    return {
      options: [],
      option: "redev",
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
      ],
      searchText: ""
    };
  },
  props: {
    disable: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions("map", ["changeMapMode", "changeMapZoom", "changeMapCenter"]),
    onChangeSearchText(e) {
      this.searchText = e;
      this.options = [];
    },
    onSelect(obj) {
      const type = [
        { label: "개발정비사업", value: "redev" },
        { label: "지역", value: "location" },
        { label: "건물/단지", value: "building" }
      ].find((obj) => obj.value === this.option);

      // if (type.value === "redev") {
      //   console.log("redev");
      // } else if (type.value === "location") {
      //   console.log("location");
      // } else {
      //   console.log("building");
      // }
      this.$emit("search", type.label, obj.id);
    },
    async filterFn(val, update, abort) {
      const type = [
        { label: "개발정비사업", value: "redev" },
        { label: "지역", value: "location" },
        { label: "건물/단지", value: "building" }
      ].find((obj) => obj.value === this.option);

      if (val !== "") {
        if (type.value === "redev") {
          const {
            data: { results }
          } = await Vue.prototype.$axios.get(
            `redevelopment_areas/?search=${val}`
          );
          update(async () => {
            this.options = results.map(({ title, id }) => {
              return {
                value: title,
                label: title,
                id: id
              };
            });
          });
        } else if (type.value === "location") {
          const {
            data: { results }
          } = await Vue.prototype.$axios.get(`locations/?search=${val}`);
          update(async () => {
            this.options = results.map(({ title, id }) => {
              return {
                value: title,
                label: title,
                id: id
              };
            });
          });
        } else {
          const {
            data: { results }
          } = await Vue.prototype.$axios.get(`houses/?search=${val}`);
          update(async () => {
            this.options = results.map(({ group_building_house: building }) => {
              return {
                value: building.title_building,
                label: building.title_building,
                id: building.title_building
              };
            });
          });
        }
      } else {
        update();
      }
    }
  },
  mounted() {}
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
  font-size: calc((60 / 1312) * 100vh);
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
