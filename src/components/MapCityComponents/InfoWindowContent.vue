<template>
  <div
    style="position: relative; width: 120px; height: 85px"
    class="flex justify-center"
  >
    <div
      v-if="item.count"
      class="absolute text-primary bg-white"
      style="
        right: 0px;
        top: 3px;
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
    <div
      style="
        position: absolute;
        width: 100px;
        flex-direction: column;
        bottom: 0;
        border-radius: 8px;
        overflow: hidden;
      "
      :style="{ borderColor: getColor(item) }"
      class="flex bg-white"
      @click="$emit('viewArea')"
    >
      <div class="col items-center q-py-sm">
        <!-- <div
          class="info-heading notosanskr-medium text-center"
          style="padding: 4px"
          :style="{ backgroundColor: getColor(item) }"
        >
          {{ getItemInfo(item).type }}
        </div> -->
        <div class="info-text text-center" style="padding: 0 8px">
          {{ toSimpleMoneyString(price) }}
        </div>
        <div class="info-text text-center" style="padding: 0 8px">
          {{ getItemInfo(item).date }}
        </div>
      </div>
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
        const dd = d.getMonth() < 10 ? "0" + d.getMonth() : d.getMonth();
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
  font-size: 15px;
  line-height: 22px;
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
