<template>
  <q-card-section
    class="row items-center flex justify-end q-pa-none q-pt-none q-ma-none"
    style="flex: 1"
  >
    <div class="col flex items-center justify-between">
      <div class="row items-center">
        <div
          class="col-4 text-left notosanskr-medium row"
          style="flex: 1; gap: 8px"
        >
          <q-select
            class="notosanskr-regular self-end"
            dense
            :options="['전체', '재개발', '재건축', '가로/모아', '기타']"
            @input="changeDevType"
            :value="$route.query.redevelopment_area__category || '전체'"
            emit-value
          />
          <q-select
            style="min-width: 125px"
            dense
            emit-value
            map-options
            v-model="option"
            :options="[
              { label: '정비사업', value: 'redev' },
              { label: '지역', value: 'location' },
              { label: '건물/단지', value: 'building' }
            ]"
          />
          <q-select
            ref="keywordRef"
            filled
            label="검색"
            dense
            :value="text"
            @input="onSelect"
            @focus="onFocus"
            :input-debounce="200"
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
                @change="onChangeFilter"
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
    ...mapGetters("search", [
      "getCategoriesByKorean",
      "area",
      "price",
      "initPrice",
      "person",
      "period"
    ]),
    ...mapGetters("map", ["getAreaType"]),
    getFilters() {
      const hasValue = (array) => {
        return array.every((obj) => obj);
      };

      return [
        {
          label: "주택유형",
          type: "property-type",
          class:
            this.getCategoriesByKorean.length !== 8
              ? "text-white bg-primary"
              : "text-grey",
          keyName: "categories"
        },
        {
          label: "면적",
          type: "exclusive-area",
          class: this.area.value ? "text-white bg-green" : "text-grey",
          keyName: "areaType"
        },
        {
          label: "매매가",
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
          isHide: this.$route.name !== "listHouses",
          keyName: "initPrices"
        },
        {
          label: this.$route.name === "listHouses" ? "수정일자" : "거래일자",
          type: "PropertyPeriod",
          class: hasValue(this.period) ? "text-white bg-brown-4" : "text-grey",
          keyName: "period",
          isHide: this.$route.path === "/map/city"
        }
      ];
    }
  },
  data() {
    return {
      options: [],
      option: "redev",
      text: ""
    };
  },
  props: {
    disable: {
      type: Boolean,
      default: false
    }
  },

  mounted() {
    const el = this.$refs.keywordRef;
    const el2 = el.$refs.target;
    el2.addEventListener("input", (e) => {
      el.filter();
      this.text = e.target.value;
    });
  },

  methods: {
    ...mapActions("map", ["changeMapMode", "changeMapZoom", "setAreaType"]),
    onChangeFilter(params) {
      this.$emit("changeFilter", params);
    },
    changeDevType(event) {
      if (this.$route.query.redevelopment_area__category === event) return;
      this.$router.replace({
        query: { ...this.$route.query, redevelopment_area__category: event }
      });
    },
    onChangeSearchText(e) {
      this.$emit("change", e);
      this.options = [];
      if (e === "") {
        this.$emit("search");
      }
    },
    onFocus() {
      this.$emit("focus");
    },
    onSelect(obj) {
      const type = [
        { label: "정비사업", value: "redev" },
        { label: "지역", value: "location" },
        { label: "건물/단지", value: "building" }
      ].find((obj) => obj.value === this.option);
      this.text = obj.label;

      this.$emit("search", type.label, obj.id, obj.label, obj.subcityId);
    },
    async filterFn(val, update, abort) {
      const type = [
        { label: "정비사업", value: "redev" },
        { label: "지역", value: "location" },
        { label: "건물/단지", value: "building" }
      ].find((obj) => obj.value === this.option);
      if (!val || val === "") {
        update();
        return;
      }
      if (val) {
        if (type.value === "redev") {
          const getAreaTypeString = () => {
            switch (this.getAreaType) {
              case null:
                return null;
              case "재개발":
              case "재건축":
              case "일반":
                return this.getAreaType;
              case "기타사업":
                return "기타";
              default:
                return this.getAreaType;
            }
          };

          const {
            data: { results }
          } = await Vue.prototype.$axios.get(`redevelopment_areas/`, {
            params: {
              search: val,
              redevelopment_area__category: getAreaTypeString()
            }
          });
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
            data: { results: subCityResults }
          } = await Vue.prototype.$axios.get(`sub_cities?search=${val}`);
          const {
            data: { results }
          } = await Vue.prototype.$axios.get(`locations?search=${val}`);

          const subArr = subCityResults.map((obj) => {
            return {
              value: obj.address,
              label: obj.address,
              id: obj.id,
              subcityId: null
            };
          });

          const locationArr = results.map(({ title, id, subcity }) => {
            return {
              value: `${subcity.city.title} ${subcity.title} ${title}`,
              label: `${subcity.city.title} ${subcity.title} ${title}`,
              id: id,
              subcityId: subcity.id
            };
          });
          update(async () => {
            this.options = [...subArr, ...locationArr];
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
      }
    }
  },
  beforeMount() {
    const { query } = this.$route;
    switch (true) {
      case !!query?.subcity:
        this.option = "location";
        break;
      case query?.redevelopment_area:
        this.option = "redev";
        break;
      case query?.building:
        this.option = "building";
        break;
      default:
        this.option = "redev";
        break;
    }

    console.log(query);
    this.text = query?.title || "";
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
