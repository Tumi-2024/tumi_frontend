<template>
  <div class="relative flex justify-center column">
    <div
      v-if="item.count"
      class="absolute text-primary bg-white"
      style="
        right: -10px;
        top: -10px;
        border-radius: 100%;
        border: 1px solid rgb(255, 90, 0);
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
        font-weight: 400;
      "
    >
      +{{ item.count }}
    </div>
    <!-- :style="{ borderColor: getColor(item) }" -->
    <div
      style="
        min-width: 80px;
        flex-direction: column;
        bottom: 0;
        border-radius: 8px;
        overflow: hidden;
      "
      class="flex bg-white"
      @mousedown="$emit('viewArea')"
    >
      <div class="col items-center">
        <div
          class="info-heading notosanskr-medium text-center"
          style="padding: 4px"
          :style="{ backgroundColor: getColor(item) }"
        >
          {{ getItemInfo(item).type }}
        </div>
        <div class="info-text text-center" style="padding: 1px 8px 0 8px">
          {{ toSimpleMoneyString(price) }}
        </div>
        <div class="info-text text-center" style="padding: 1px 8px 0 8px">
          {{ getItemInfo(item).date }}
        </div>
      </div>
    </div>
    <div
      style="
        position: absolute;
        z-index: 100;
        display: flex;
        width: 20px;
        height: 10px;
        left: 30px;
        bottom: 1px;
        clip-path: polygon(0 0, 100% 0, 50% 100%);
        background-color: white;
      "
    ></div>
    <div style="display: block; float: left; width: 100%; height: 10px"></div>
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
        { key: "ALLIANCE", label: "연립ￜ다세대" }
      ]
    };
  },
  computed: {
    ...mapGetters("map", ["getMapMode"]),
    getColor() {
      return (item) => {
        if (item.group_price) {
          return "#FF5A00";
        } else {
          return "#4caf50";
        }
      };
    },
    getItemInfo() {
      return (item) => {
        if (this.getMapMode === "redevelop-area") {
          const TYPE_HOUSE = {
            "COMMERCIAL ": "상업업무용",
            SINGLE: "단독다가구",
            OFFICETEL: "오피스텔",
            APARTMENT: "아파트",
            LAND: "토지",
            ALLIANCE: "연립ￜ다세대"
          };
          const transactionItem = item.recent_transactions?.[item.types[0]];
          if (!transactionItem) {
            return {
              date: null,
              type: null
            };
          }
          return {
            date:
              transactionItem?.text_month.slice(0, 4) +
              "." +
              transactionItem?.text_month.slice(4, 6),
            type: TYPE_HOUSE[transactionItem.category]
          };
        }
        const d = new Date(item.created);
        const dd = d.getMonth() < 10 ? "0" + (d.getMonth() + 1) : d.getMonth();
        console.log(d);
        console.log(d.getMonth());
        return {
          date: `${d.getFullYear()}.${dd}`,
          type: item?.group_building_house?.type_house || "-"
        };
      };
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.info-heading {
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -1.125px;
  color: white;
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
