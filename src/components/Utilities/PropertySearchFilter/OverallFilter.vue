<template>
  <div>
    <q-btn
      unelevated
      outline
      :color="!disable ? 'primary' : 'orange-3'"
      padding="8px"
      style="border-radius: 8px; height: 36px;"
      class="q-mx-xs"
      @click="modal = true"
      :disable="disable"
    >
      <q-icon size="20px">
        <img src="~assets/icons/Filter.svg" alt="filter" />
      </q-icon>
    </q-btn>
    <!-- Dialog Section -->
    <q-dialog v-model="modal" position="bottom">
      <q-card class="notosanskr-regular overflow-hidden">
        <q-card-section
          class="head-section bg-white notosanskr-medium row justify-between items-center"
        >
          <div>검색 필터</div>
          <q-btn flat padding="0px"
            ><q-icon
              name="close"
              class="cursor-pointer"
              size="24px"
              @click="modal = false"
            />
          </q-btn>
        </q-card-section>
        <!-- contents starts here -->
        <div class="full-height relative-position overflow-auto">

          <!-- Property Type | 주택 유형 -->
          <property-type
            class="q-pb-xl bg-white q-mt-sm"
            style="padding-top: 36px"
            @select="setSelected('categories', $event)"
            :isUnique="true"
          />
          <exclusive-area
            class="q-pb-xl bg-white q-mt-sm"
            style="padding-top: 36px"
            @select="setSelected('areaType', $event)"
            :isCondition="true"
            :selectedProps="categories"
          ></exclusive-area>

          <price-filter class="q-pb-xl bg-white q-mt-sm" style="padding-top: 36px" />
          <person-filter class="q-pb-xl bg-white q-mt-sm" style="padding-top: 36px" />

          <q-card-section class="q-pa-none bg-white q-mt-md notosanskr-medium">
            <!-- Action buttons -->
            <div class="row q-py-md justify-around notosanskr-medium">
              <div class="col q-mx-xs">
                <!-- reset | 초기화 -->
                <q-btn
                  class="reset-btn bg-grey-3"
                  flat
                  text-color="black"
                  label="초기화"
                  padding="12px"
                  @click="resetFilters()"
                />
              </div>
              <div class="col q-mx-xs">
                <!-- apply | 적용 -->
                <q-btn
                  class="apply-btn bg-primary text-white"
                  flat
                  label="적용"
                  padding="12px"
                  @click="applyFilters"
                />
              </div>
            </div>
          </q-card-section>

          <q-card-section class="empty-bottom-space"></q-card-section>
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {
  PropertyType,
  ExclusiveArea,
  PriceFilter,
  PersonFilter
} from "components/Utilities/PropertySearchFilter/Selections";

export default {
  components: {
    "property-type": PropertyType,
    "exclusive-area": ExclusiveArea,
    "price-filter": PriceFilter,
    "person-filter": PersonFilter
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
  data() {
    return {
      modal: false,
      moreFilters: false,
      categories: [{
        icon: require("assets/iconsNew/11.png"),
        label: "아파트",
        valueTransaction: "APARTMENT",
        valueHouse: "아파트"
      }],
      prices: [
        { label: "최저가", value: 0 },
        { label: "최고가", key: "max", value: 999999 }

      ],
      areaType: [{
        label: "전용면적",
        value: "size_dedicated_area_m2",
        type: ["아파트", "연립/다세대", "원룸/오피스텔", "상업업무용", "입주권"]
      }],
      areas: [
        { label: '최소면적', value: 0 },
        { label: '최대면적', value: 100000 }
      ]
    }
  },
  methods: {
    resetFilters() {
      // this.overallFilter = this.setInitValue();
      // console.log(this.overallFilter, "reset");
    },
    setSelected(property, value) {
      this[property] = value;
    },
    applyFilters() {
      console.log(this.overallFilter);
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
