<template>
  <div
    style="min-width: 80px; overflow-y: hidden; flex-direction: column;"
    class="flex"
    @click="$emit('viewArea')"
  >
    <div class="col items-center">
      <div class="info-heading notosanskr-medium text-center">
        {{ getItemInfo(item).type }}
      </div>
      <div class="info-text  text-center">
        {{ toSimpleMoneyString(price) }}
      </div>
      <div class="info-text text-center">{{ getItemInfo(item).date }}</div>
    </div>
  </div>
</template>

<script>
import { toSimpleMoneyString } from "src/utils";
import { mapGetters } from "vuex";
export default {
  props: {
    item: {
      type: Object
    },
    price: {
      type: [Number, String],
      default: 0
    },
    isDev: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toSimpleMoneyString: toSimpleMoneyString
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
        const TYPE_HOUSE = {
          "COMMERCIAL ": "상업업무용",
          SINGLE: "단독다가구",
          OFFICETEL: "오피스텔",
          APARTMENT: "아파트",
          LAND: "토지",
          ALLIANCE: "연립/다세대"
        };
        if (this.getMapMode === "redevelop-area") {
          const transactionItem =
            item.recent_transactions?.[item.categories[0]];
          return {
            date:
              transactionItem?.text_month.slice(0, 4) +
              "." +
              transactionItem?.text_month.slice(4, 6),
            type: TYPE_HOUSE?.[item?.categories?.[0]]
          };
        } else {
          const d = new Date(item.created);
          const dd = d.getMonth() < 10 ? "0" + d.getMonth() : d.getMonth();
          return {
            date: `${d.getFullYear()}.${dd}`,
            type: item?.group_building_house?.type_house
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
