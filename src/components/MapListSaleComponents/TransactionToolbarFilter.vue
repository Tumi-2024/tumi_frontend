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
              // { label: '건물/단지', value: 'building' }
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
            @input.native="filter($event.target.value)"
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
        <!-- <overall-filter :disable="disable" /> -->
        <TransactionOverallFilter :disable="disable" @change="onChangeFilter"  />
        <div
          class="scrolling-wrapper-flexbox nanum-square row float-right"
          :class="{ hideScrollbar: $q.platform.is.mobile }"
        >
          <slot>
            <div class="items" v-for="(filter, i) of getFilters" :key="i">
              <TransactionToolbarFilterDetail
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
import TransactionOverallFilter from "components/Utilities/PropertySearchFilter/TransactionOverallFilter";
import TransactionToolbarFilterDetail from "./TransactionToolbarFilterDetail.vue";
// import SpecificFilter from "components/Utilities/PropertySearchFilter/SpecificFilter";
import { mapGetters, mapActions } from "vuex";
import { debounce } from 'quasar';

export default {
  components: {
    TransactionOverallFilter,
    TransactionToolbarFilterDetail
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
        return Object.entries(query).some(query => {
          return query[0] === keyname && !!query[1]
        })
      }

      return [
        {
          label: "주택유형",
          type: "property-type",
          class:
          hasKey('category__in')
            ? "text-white bg-primary"
            : "text-grey",
          keyName: "category__in"
        },
        {
          label: "면적",
          type: "exclusive-area",
          class: hasKey('size_private__range') || hasKey('size_yean__range') || hasKey('size_daeji__range') || hasKey('size_land__range') ? "text-white bg-green" : "text-grey",
          keyName: "areaType"
        },
        {
          label: "매매가",
          type: "PriceFilter",
          class:
            hasKey('price__range')
              ? "text-white bg-blue"
              : "text-grey",
          keyName: "price__range"
        },
        {
          label: this.$route.name === "listHouses" ? "수정일자" : "거래일자",
          type: "PropertyPeriod",
          class: hasKey('date__range') ? "text-white bg-brown-4" : "text-grey",
          keyName: "date__range",
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
    this.filter = debounce(this.filter, 500);
  },

  methods: {
    filter(keyword) {
      this.$refs.keywordRef.filter(keyword);
      this.text = keyword;
    },
    ...mapActions("map", ["changeMapMode", "changeMapZoom", "setAreaType"]),
    onChangeFilter(params) {
      const houseParam = {
        category__in: params.category__in || null,
        size_private__range: params.size_private__range || null,
        size_yean__range: params.size_yean__range || null,
        size_daeji__range: params.size_daeji__range || null,
        size_land__range: params.size_land__range || null,
        price__range: params.price__range || null,
        date__range: params.date__range || null

      }
      this.$emit("changeFilter", houseParam);
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

      const oldQuery = { ...this.$route.query }

      let query = {};
      if (obj.subcityId) {
        query = {
          title: obj.label,
          redevelopment_area: type.value === "redev" ? obj.id : undefined,
          subcity: type.value === "location" ? obj.subcityId : undefined,
          search: type.value === "building" ? obj.value : undefined
        }
        delete oldQuery.location
      } else {
        query = {
          title: obj.label,
          redevelopment_area: type.value === "redev" ? obj.id : undefined,
          location: type.value === "location" ? obj.id : undefined,
          search: type.value === "building" ? obj.value : undefined
        }
        delete oldQuery.subcity
      }

      this.$router.push({
        query: { ...oldQuery, ...query }
      })
    },
    async filterFn(val, update, abort) {
      const type = [
        { label: "정비사업", value: "redev" },
        { label: "지역", value: "location" }
        // { label: "건물/단지", value: "building" }
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
            }).reduce((acc, cur) => {
              if (!acc.find((obj) => obj.value === cur.value)) {
                acc.push(cur);
              }
              return acc;
            }, []);
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
            console.log('house')
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
