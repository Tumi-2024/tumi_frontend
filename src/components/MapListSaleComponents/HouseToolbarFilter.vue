<template>
  <q-card-section
    class="row items-center flex justify-end q-pa-none q-pt-none q-ma-none"
    style="flex: 1"
  >
    <div class="col flex items-center justify-between">
      <div class="row items-center">
        <div class="col-4 text-left nanum-square row" style="flex: 1; gap: 8px">
          <q-select
            class="notosanskr-regular self-end"
            dense
            :options="['전체', '재개발', '재건축', '기타']"
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
            @input="onChangeSearchType"
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
            style="flex: 1; ime-mode: active"
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
        <HouseOverallFilter :disable="disable" @change="onChangeFilter" />
        <div
          class="scrolling-wrapper-flexbox nanum-square row float-right"
          :class="{ hideScrollbar: $q.platform.is.mobile }"
        >
          <slot>
            <div class="items" v-for="(filter, i) of getFilters" :key="i">
              <HouseToolbarFilterDetail
                v-if="!filter.isHide"
                :propsClass="filter.class"
                :label="filter.label"
                :component="filter.type"
                :keyName="filter.keyName"
                :value="filter.value"
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
import HouseOverallFilter from "components/Utilities/PropertySearchFilter/HouseOverallFilter";
import HouseToolbarFilterDetail from "./HouseToolbarFilterDetail.vue";
// import SpecificFilter from "components/Utilities/PropertySearchFilter/SpecificFilter";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    HouseOverallFilter,
    HouseToolbarFilterDetail
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
      const query = this.$route.query;

      const hasKey = (keyname) => {
        return Object.entries(query).some(query => query[0] === keyname)
      }

      const propertyTypeValue = query.type_house__in
        ? query.type_house__in
          .replace("토지", "토지")
          .replace("오피스텔", "오피스텔")
          .replace("연립다세대", "연립다세대")
          .replace("아파트", "아파트")
          .replace("상업|업무용", "상업업무용")
          .replace("단독다가구", "단독다가구")
          .replace("무허가건축물", "무허가건축물")
          .replace("입주권", "입주권").split(",")
        : [];

      return [
        {
          label: "주택유형",
          type: "property-type",
          class:
          hasKey('type_house__in')
            ? "text-white bg-primary"
            : "text-grey",
          keyName: "categories",
          value: propertyTypeValue
        },
        {
          label: "면적",
          type: "exclusive-area",
          class: hasKey('size_dedicated_area_m2__range') || hasKey('size_gross_floor_area__range') || hasKey('size_land_area__range') || hasKey('size_land_area_m2__range') ? "text-white bg-green" : "text-grey",
          keyName: "areaType"
        },
        {
          label: "매매가",
          type: "PriceFilter",
          class:
            hasKey('price_selling_hope__range')
              ? "text-white bg-blue"
              : "text-grey",
          keyName: "prices"
        },
        {
          label: "초기투자금",
          type: "PriceFilter",
          class:
            hasKey('price_initial_investment__range')
              ? "text-white bg-purple"
              : "text-grey",
          isHide: this.$route.name !== "listHouses",
          keyName: "initPrices"
        },
        {
          label: this.$route.name === "listHouses" ? "수정일자" : "거래일자",
          type: "PropertyPeriod",
          class: hasKey('modified__range') ? "text-white bg-brown-4" : "text-grey",
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
      const { name } = this.$route
      if (name === 'listTransactions' || name === "map_city_area") {
        const _newParam = params
        _newParam.size_private__range = _newParam.size_dedicated_area_m2__range;
        _newParam.size_yean__range = _newParam.size_gross_floor_area__range;
        _newParam.size_daeji__range = _newParam.size_land_area__range;
        _newParam.size_land__range = _newParam.size_land_area_m2__range;
        _newParam.price__range = _newParam.price_selling_hope__range;
        _newParam.date__range = _newParam.modified__range;

        delete _newParam.size_dedicated_area_m2__range;
        delete _newParam.size_gross_floor_area__range;
        delete _newParam.size_land_area__range;
        delete _newParam.size_land_area_m2__range;
        delete _newParam.price_selling_hope__range;
        delete _newParam.modified__range;
        /**
         * size_private__range 전용면적 size_dedicated_area_m2
         size_yean__range 연면적 size_gross_floor_area__range
         size_daeji__range 대지면적 size_land_area__range
         size_land__range 대지권면적 size_land_area2__range
         */

        this.$emit("changeFilter", _newParam);
      } else {
        this.$emit("changeFilter", params);
      }
    },
    changeDevType(event) {
      if (this.$route.query.redevelopment_area__category === event) return;
      this.$router.replace({
        query: { ...this.$route.query, redevelopment_area__category: event }
      });
    },
    onChangeSearchType(e) {
      this.options = [];
      this.text = "";
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

      const query = obj.subcityId ? {
        title: obj.label,
        redevelopment_area: type.value === "redev" ? obj.id : undefined,
        subcity: type.value === "location" ? obj.subcityId : undefined,
        search: type.value === "building" ? obj.value : undefined
      } : {
        title: obj.label,
        redevelopment_area: type.value === "redev" ? obj.id : undefined,
        location: type.value === "location" ? obj.id : undefined,
        search: type.value === "building" ? obj.value : undefined
      }

      this.$router.replace({
        query
      })
    },
    async filterFn(val, update, abort) {
      const type = [
        { label: "정비사업", value: "redev" },
        { label: "지역", value: "location" },
        { label: "건물/단지", value: "building" }
      ].find((obj) => obj.value === this.option);
      if (!val || val === "") {
        update();
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
              subcityId: obj.id
            };
          });

          const locationArr = results.map(({ title, id, subcity }) => {
            return {
              value: `${subcity.city.title} ${subcity.title} ${title}`,
              label: `${subcity.city.title} ${subcity.title} ${title}`,
              id: id,
              subcityId: null
            };
          });
          update(async () => {
            this.options = [...subArr, ...locationArr];
          });
        } else {
          const { name } = this.$route
          if (name === 'listTransactions') {
            const {
              data: { results }
            } = await Vue.prototype.$axios.get(`transactions/?search=${val}`);
            update(async () => {
              this.options = results.map((building) => {
                return {
                  value: building.text_danji,
                  label: building.text_danji,
                  id: building.text_danji
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
        }
      }
    }
  },
  beforeMount() {
    const { query } = this.$route;
    switch (true) {
      case !!query?.location:
      case !!query?.subcity:
        this.option = "location";
        break;
      case query?.redevelopment_area:
        this.option = "redev";
        break;
      case query?.search:
        this.option = "building";
        break;
      default:
        this.option = "redev";
        break;
    }

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
