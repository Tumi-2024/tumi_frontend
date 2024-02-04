<template>
  <q-card-section class="row items-center flex justify-end q-pa-none q-ma-none">
    <div class="col flex items-end justify-between q-mb-xs">
      <div class="row items-center justify-between q-mr-xs" style="flex: 1">
        <div class="column" style="min-width: 150px">
          <div
            class="helper text-left"
            style="font-family: 'notosanskr-medium'"
          >
            {{ getToolbarLabel }}
          </div>
          <div
            class="location-text text-left"
            style="font-family: 'notosanskr-medium'"
          >
            {{ getToolbarTitle }}
          </div>
        </div>
        <div
          class="q-my-xs text-left notosanskr-medium q-ml-xs flex"
          style="gap: 4px"
        >
          <q-select
            style="margin-right: 4px; display: flex; flex: 1"
            outlined
            :value="searchType"
            @input="onChangeSelect"
            map-options
            dense
            :options="[
              { label: '정비사업', value: 'redev' },
              { label: '지역/주소', value: 'location' }
            ]"
          >
          </q-select>
          <q-select
            ref="keywordRef"
            style="display: flex; flex: 1"
            class="icon"
            filled
            label="검색"
            dense
            :value="searchText"
            @input="onSelect"
            @change="onChangeText"
            :input-debounce="400"
            use-input
            fill-input
            :loading="false"
            hide-selected
            :options="options"
            @filter="filterFn"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
            <template v-slot:prepend>
              <q-icon name="search" @click.stop.prevent />
            </template>
            <!-- <template v-slot:option="scope">
              <q-item-section>
                <q-item-label class="ellipsis">
                  {{ scope.opt.label }}
                </q-item-label>
              </q-item-section>
            </template> -->
          </q-select>
        </div>
      </div>
      <div class="flex" style="margin: 6px 0">
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
import { mapGetters, mapActions } from "vuex";

const ellipsisText = (string) => {
  const stringLength = 20;
  let resultString = "";
  if (string.length > stringLength) {
    resultString = string.substr(0, stringLength - 3) + "...";
  } else {
    resultString = string;
  }
  return resultString;
};

export default {
  components: {
    "overall-filter": OverallFilter,
    "specific-filter": SpecificFilter
  },
  computed: {
    ...mapGetters("map", [
      "getMapMode",
      "getToolbarLabel",
      "getToolbarTitle",
      "getAreaType"
    ]),
    ...mapGetters("search", [
      "categories",
      "area",
      "price",
      "initPrice",
      "person",
      "isMultiSelect",
      "period"
    ]),
    getFilters() {
      const hasValue = (array) => {
        if (!array.length) return false;
        return array.every((obj) => obj);
      };
      return [
        {
          label: "주택유형",
          type: "property-type",
          class:
            this.categories.length !== 8
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
          isHide: this.$route.path !== "/map/city",
          keyName: "initPrices"
        },
        {
          label: "거래일자",
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
      searchText: "",
      searchType: "redev",
      options: [],
      redev: [],
      location: []
    };
  },
  props: {
    disable: {
      type: Boolean,
      default: false
    }
  },
  beforeMount() {
    if (this.$route.query.redev) {
      this.searchText = this.$route.query.redev;
      this.searchType = "redev";
    }

    if (this.$route.query.location) {
      this.searchText = this.$route.query.location;
      this.searchType = "location";
    }
  },
  methods: {
    ...mapActions("map", ["changeMapMode", "changeMapZoom", "changeMapCenter"]),
    onChangeFilter(params) {
      this.$emit("changeFilter", params);
    },
    onChangeSelect(e) {
      this.searchType = e.value;
    },
    onSelect(obj) {
      this.changeMapCenter(obj.position);
      setTimeout(() => {
        this.changeMapZoom(18);
      }, 1000);
      this.searchText = obj.label;
    },
    onChangeText(e) {
      console.log(e.target.value);
      this.searchText = e.target.value;
    },
    async filterRedev(val, update, abort) {
      return new Promise((resolve) => {
        const getAreaTypeString = () => {
          switch (this.getAreaType) {
            case null:
              return "";
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

        Vue.prototype.$axios
          .get(
            `redevelopment_areas/?search=${
              this.searchText
            }&redevelopment_area__category=${getAreaTypeString()}`
          )
          .then((res) => {
            update(async () => {
              this.redev = res.data.results.map(
                ({ title, latitude, longitude }) => {
                  return {
                    value: title,
                    label: ellipsisText(title),
                    position: {
                      lat: Number(latitude),
                      lng: Number(longitude)
                    }
                  };
                }
              );
            });
            resolve();
          });
      });
    },

    async filterLocation(val, update, abort) {
      return new Promise((resolve) => {
        Vue.prototype.$axios
          .get(`locations/?search=${this.searchText}`)
          .then((res) => {
            update(async () => {
              this.location = res.data.results.map(
                ({ subcity, latitude, longitude, title }) => {
                  return {
                    value: `${subcity.city.title} ${subcity.title} ${title}`,
                    label: ellipsisText(
                      `${subcity.city.title} ${subcity.title} ${title}`
                    ),
                    position: {
                      lat: Number(latitude),
                      lng: Number(longitude)
                    }
                  };
                }
              );
            });
            resolve();
          });
      });
    },

    async filterFn(val, update, abort) {
      console.log("filterFn", val);
      this.searchText = val;
      if (!val || val === "") {
        update();
        return;
      }
      if (this.searchType === "redev") {
        await this.filterRedev(val, update, abort);
        this.options = this.redev;
      } else {
        await this.filterLocation(val, update, abort);
        this.options = this.location;
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
