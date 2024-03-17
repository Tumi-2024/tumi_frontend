<template>
  <div class="flex items-center">
    <q-btn
      unelevated
      outline
      :color="!disable ? 'primary' : 'orange-3'"
      style="
        border-radius: 8px;
        width: calc((36 / 1312) * 100vh);
        height: calc((36 / 1312) * 100vh);
        min-width: 30px;
        min-height: 30px;
      "
      class="q-mx-xs justify-center items-center"
      @click="openModal"
      :disable="disable"
    >
      <q-icon size="calc((20 / 1312) * 100vh)">
        <img src="~assets/icons/Filter.svg" alt="filter" />
      </q-icon>
    </q-btn>
    <!-- Dialog Section -->
    <q-dialog v-model="modal" position="bottom">
      <q-card class="notosanskr-regular overflow-hidden">
        <q-card-section
          class="head-section bg-white nanum-square row justify-between items-center"
        >
          <div>검색 필터</div>
          <q-btn flat padding="0px">
            <q-icon
              name="close"
              class="cursor-pointer"
              size="24px"
              @click="modal = false"
            />
          </q-btn>
        </q-card-section>
        <div class="full-height relative-position overflow-auto">
          <!-- Property Type | 주택 유형 -->
          <property-type
            class="q-pb-xl bg-white q-mt-sm"
            style="padding-top: 36px"
            @select="setSelected('categories', $event)"
            :value="[]"
            ref="option1"
          />
          <exclusive-area
            class="q-pb-xl bg-white q-mt-sm"
            style="padding-top: 36px"
            @select="setSelected('areas', $event)"
            @selectDetail="setSelected('areaType', $event)"
            :categories="[]"
            :activeAreaType="activeAreaType"
            ref="option2"
          />

          <price-filter
            label="매매가"
            class="q-pb-xl bg-white q-mt-sm"
            style="padding-top: 36px"
            @select="setSelected('prices', $event)"
            ref="option3"
          />

          <price-filter
            label="초기투자금"
            class="q-pb-xl bg-white q-mt-sm"
            style="padding-top: 36px"
            @select="setSelected('initPrices', $event)"
            keyName="initPrices"
            ref="option4"
          />
          <!--
          <person-filter
            class="q-pb-xl bg-white q-mt-sm"
            style="padding-top: 36px"
            @select="setSelected('persons', $event)"
            ref="option5"
          /> -->

          <q-card-section class="q-pa-none bg-white q-mt-md nanum-square">
            <!-- Action buttons -->
            <div class="row q-py-md justify-around nanum-square">
              <div class="col q-mx-xs">
                <!-- reset | 초기화 -->
                <q-btn
                  class="reset-btn bg-grey-3"
                  flat
                  text-color="black"
                  label="초기화"
                  style="font-size: calc((18 / 1000) * 100vh)"
                  padding="12px"
                  @click="resetFilters"
                />
              </div>
              <div class="col q-mx-xs">
                <!-- apply | 적용 -->
                <q-btn
                  class="apply-btn bg-primary text-white"
                  flat
                  label="적용"
                  style="font-size: calc((18 / 1000) * 100vh)"
                  padding="12px"
                  @click="applyFilters"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-section class="empty-bottom-space" />
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  PropertyType,
  ExclusiveArea,
  PriceFilter
} from "components/Utilities/PropertySearchFilter/Selections";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    PropertyType,
    ExclusiveArea,
    PriceFilter
  },

  props: {
    disable: {
      type: Boolean,
      default: false
    }
  },
  created() {
    // this.overallFilter = this.setInitValue();
  },
  computed: {
    ...mapGetters("searchQuery", ["getQueryString", "getOption"]),
    ...mapGetters("search", ["getCategoriesByKorean"]),
    getInitCategory() {
      const query = this.$route.query;

      return query.type_house__in
        ? query.type_house__in
          .replace("토지", "토지")
          .replace("오피스텔", "오피스텔")
          .replace("연립다세대", "연립다세대")
          .replace("아파트", "아파트")
          .replace("상업업무용", "상업업무용")
          .replace("단독다가구", "단독다가구")
          .replace("무허가건축물", "무허가건축물")
          .replace("입주권", "입주권").split(",")
        : ["아파트"];
    }
  },
  data() {
    return {
      activeAreaType: undefined,
      modal: false,
      moreFilters: false,
      searchValue: {

      },
      prices: [
        { label: "최저가", value: 0 },
        { label: "최고가", key: "max", value: 999999 }
      ],
      initPrices: [
        { label: "최저가", value: 0 },
        { label: "최고가", key: "max", value: 999999 }
      ],
      areaType: [
        {
          label: "전용면적",
          value: "size_dedicated_area_m2",
          type: [
            "아파트",
            "연립다세대",
            "원룸/오피스텔",
            "상업업무용",
            "입주권"
          ]
        }
      ],
      areas: [
        { label: "최소면적", value: 0 },
        { label: "최대면적", value: 100000 }
      ]
    };
  },
  methods: {
    ...mapActions("search", ["setIsMultiSelect", "initialize"]),
    ...mapActions("area", ["fetchMapAreas"]),
    ...mapActions(["getSimpleHouses"]),
    openModal() {
      this.setIsMultiSelect(false);
      this.modal = true;
    },
    resetFilters() {
      this.initialize();
      for (const ref in this.$refs) {
        this.$refs[ref].initialize();
      }
    },
    setSelected(property, value) {
      const _searchValue = {}

      if (property === "categories") {
        this.activeAreaType = value
        _searchValue.type_house__in = value
      }

      console.log(property, value)
      this[property] = value;
    },
    applyFilters() {
      const area = this.$refs.option2.selectValue
      const price = this.$refs.option3.selectValue
      const initPrice = this.$refs.option4.selectValue
      const category = this.$refs.option1.selected
      this.modal = false;

      const getQueryArray = (keyName, params) => {
        if (keyName === "type_house__in" && params.length === 8) {
          return {};
        }
        if (Array.isArray(params)) {
          const hasValue = params.every((value) => value !== undefined && value !== '');
          if (!hasValue || params.length === 0) return {};
          return {
            [keyName]: params.join(",")
          };
        }
        if (!params) return {};
        return {
          [keyName]: params
        };
      };

      this.$emit("change", {
        page_size: 1000,
        ...getQueryArray("type_house__in", category.join(",")
          .replace("토지", "토지")
          .replace("오피스텔", "오피스텔")
          .replace("연립다세대", "연립다세대")
          .replace("아파트", "아파트")
          .replace("상업업무용", "상업업무용")
          .replace("단독다가구", "단독다가구")
          .replace("무허가건축물", "무허가건축물")
          .replace("입주권", "입주권")
          .split(",")),
        ...getQueryArray("price_selling_hope__range", [price.min, price.max]),
        ...getQueryArray("price_initial_investment__range", [
          initPrice.min,
          initPrice.max
        ]),
        ...getQueryArray([`${area?.value}__range`], [area?.min, area?.max]),
        ...getQueryArray(
          "redevelopment_area__category"
          // getAreaTypeString()
        )
        // ...getRedevQuery(),
        // ...getAreaTypeString()
      });
      this.modal = false;
    }
  }
};
</script>

<style lang="scss" scoped>
$max-width: 1000px;

.q-card {
  width: 100%;
  max-width: $max-width;
  height: 100vh;
  border-radius: 16px 16px 0 0;
  background: #f0f0f0;
  .empty-bottom-space {
    height: 200px;
  }
}
.head-section {
  font-weight: 500;
  font-size: 17px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
}

.more-filters {
  background: #f0f0f0;
}

.apply-btn,
.reset-btn {
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 28px;
  text-align: center;
  letter-spacing: -1.275px;
  color: #1a1a1a;
  width: 100%;
  border-radius: 12px;
}
</style>
