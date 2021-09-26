<template>
  <div
    style="min-width: 192px; overflow-y: hidden; flex-direction: column;"
    @click="$emit('viewArea')"
  >
    <div style="display: flex; align-items: center; padding-bottom: 4px;">
      <q-img
        :src="
          isDev
            ? require('src/assets/icons/house_green.svg')
            : require('src/assets/icons/house_orange.svg')
        "
        spinner-color="white"
        style="height: 20px; max-width: 20px"
        class="q-mr-xs"
      />
      <div
        v-if="count && count > 1"
        style="height: 28px; width:28px; position: absolute; right: 0; top: 14px; border-radius: 14px; flex: 1"
        :style="{ backgroundColor: isDev ? '#007C87' : '#FF7D36' }"
      >
        <div
          style="color: white; font-size: 12px; font-weight: bold; line-height: 18px; text-align:center; margin-top: 6px;"
        >
          {{ `${count}` }}
        </div>
      </div>
      <div class="info-heading notosanskr-medium">
        {{ getItemInfo(item).address }}
      </div>
    </div>
    <div class="col">
      <div class="row bottom-toolbar notosanskr-regular">
        <div class="info-text">{{ badges.type }}</div>
        <q-separator vertical class="q-ma-xs" />
        <!-- <q-badge color="white" text-color="primary" :label="badges.type" /> -->
        <!-- <q-separator vertical class="q-ma-xs" /> -->
        <div class="info-text">{{ getItemInfo(item).land }}평</div>
        <q-separator vertical class="q-ma-xs" />
        <div class="info-text">
          {{ toMoneyString(price) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toMoneyString } from "src/utils";
import { mapGetters } from "vuex";
export default {
  props: {
    item: {
      type: Object
    },
    price: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 1
    },
    badges: {
      type: Object,
      default: () => ({
        type: "단독다가구",
        redevelop: true,
        charter: false,
        trading: false,
        area: "0평"
      })
    },
    isDev: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toMoneyString: toMoneyString
  },
  data() {
    return {
      category: [
        { key: "COMMERCIAL ", label: "상업업무용" },
        { key: "SINGLE", label: "단독다가구" },
        { key: "OFFICETEL", label: "오피스텔" },
        { key: "APARTMENT", label: "아파트" },
        { key: "LAND", label: "토지" },
        { key: "ALLIANCE", label: "연립/다세대" }
      ]
    };
  },
  computed: {
    ...mapGetters("map", [
      "getMapMode",
      "getMapZoom",
      "getMapCenter",
      "getMapOptions",
      "getIsCone"
    ]),
    getItemInfo() {
      return item => {
        if (this.getMapMode === "redevelop-area") {
          const transactionItem =
            item.recent_transactions?.[item.categories[0]];
          return {
            address:
              transactionItem?.text_building ||
              transactionItem?.text_danji ||
              transactionItem?.road_name,
            date:
              transactionItem?.text_month.slice(0, 4) +
              "." +
              transactionItem?.text_month.slice(4, 6),
            land: Math.floor(transactionItem?.text_size_land / 3.3) || "- ",
            price: toMoneyString(this.price, 1000),
            ...transactionItem
          };
        } else {
          return {
            address: item.address,
            date: item.created,
            land:
              Math.floor(
                item?.group_individual_household.size_dedicated_area / 3.3
              ) || "- ",
            price: toMoneyString(item.price, 1000),
            types: []
          };
        }
      };
    }
  },
  mounted() {
    // console.log(this.item, 'item')
  }
};
</script>

<style lang="scss" scoped>
.info-heading {
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -1.125px;
  color: #1a1a1a;
  &.small {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
  }
}
.bottom-toolbar {
  display: flex;
  align-items: center;
  .info-text {
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
    letter-spacing: -0.97px;
    color: #707070;
  }
}
.q-badge {
  font-size: 12px;
  height: 20px;
  text-align: center;
  letter-spacing: -0.9px;
  margin: auto 2px;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 4px;
  font-weight: 500;
  color: #909090;
  background: white;
}
</style>
