<template>
  <q-item
    class="column notosanskr-regular q-py-md q-px-sm"
    style="border-bottom: 1px solid #e9e9e9"
    :to="{ name: !disabled ? to : '', query: !disabled ? query : '' }"
    :manual-focus="disabled"
    @mouseenter="onHover = true"
    @mouseleave="onHover = false"
    :focused="isSelected || onHover"
  >
    <div class="row" style="gap: 8px">
      <div style="flex: 1 0 60px" class="q-mt-sm">
        <q-item-section>
          <address-with-badges
            :item="getItem(item)"
            :tags="getBadges(item)"
            :redevName="`${
              item.group_location.redevelopment_area
                ? item.group_location.redevelopment_area.category
                : ''
            }`"
          />
        </q-item-section>
      </div>
      <div class="flex items-center q-py-sm" style="flex: 3 0 0">
        <area-item-info :item="item" />
      </div>
    </div>
  </q-item>
</template>

<script>
import {
  toMoneyString,
  toSimpleMoneyString,
  toKr,
  toDateFormat
} from "src/utils";
import areaItemInfo from "./AreaItemInfo";
import AddressWithBadges from "../Address/AddressWithBadges";

export default {
  name: "AreaItem",
  components: {
    "area-item-info": areaItemInfo,
    "address-with-badges": AddressWithBadges
  },
  props: {
    item: { type: Object, required: true },
    ctgr: String,
    type: String,
    query: Object,
    to: {
      type: String,
      default: "for_sale_apartment"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    is_selected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toKr,
    toMoneyString,
    toSimpleMoneyString,
    toDateFormat,
    reshape(item) {
      if (!item.group_building_house) {
        item.group_building_house = { type_house: item.type_house };
      }
      if (!item.group_individual_household) {
        item.group_individual_household = {
          size_dedicated_area: item.size_dedicated_area
        };
      }
      if (!item.group_land_use) {
        item.group_land_use = {
          type_structure_building: item.type_structure_building
        };
      }
      if (!item.group_trading_terms) {
        item.group_trading_terms = {
          price_selling_hope: item.price_selling_hope,
          price_charter_deposit_hope: item.price_charter_deposit_hope
        };
      }
      return item;
    }
  },
  data() {
    return {
      category: [
        { key: "상업업무용 ", label: "상업업무용" },
        { key: "단독다가구", label: "단독다가구" },
        { key: "오피스텔", label: "오피스텔" },
        { key: "아파트", label: "아파트" },
        { key: "토지", label: "토지" },
        { key: "연립다세대", label: "연립다세대" }
      ],
      onHover: false
    };
  },
  computed: {
    isSelected() {
      return this.is_selected;
    },
    getItem() {
      return (item) => {
        return {
          address: item.group_location?.address || "",
          building: item.group_building_house?.title_building
        };
      };
    },
    getBadges() {
      return (item, ctgr) => {
        item = this.reshape(item);
        const getDate = (date) => {
          return this.toDateFormat(date, "YYYY.MM.DD");
        };
        const getColor = (label) => {
          switch (label) {
            case "재개발":
              return "primary";
            case "재건축":
              return "blue";
            case "가로주택":
              return "green";
            default:
              return "";
          }
        };
        return [
          {
            type: "transactionStatus",
            value: item.transactionStatus
              ? false
              : item.group_location.redevelopment_area?.category,
            color: getColor(item.group_location.redevelopment_area?.category),
            label: "개발유형"
            // icon: getIcon()
          },
          {
            type: "houseType",
            value: item.group_building_house.type_house?.replace("|", "|"),
            label: "주택유형"
          },
          { type: "redevelopment", value: item.redevelopment },
          { type: "stageProgress", value: item.stageProgress },
          {
            type: "pyeong",
            value:
              (item.group_individual_household.size_dedicated_area_pyeong ||
                Math.floor(
                  item.group_building_house.size_gross_floor_area / 3.3
                )) + "평",
            label: "건물면적"
          },
          // size_dedicated_area_m2 size_gross_floor_area
          {
            type: "price",
            value: `${toSimpleMoneyString(
              item.group_trading_terms.price_selling_hope ||
                item.group_trading_terms.price_charter_deposit_hope
            )}`,
            label: "매매가"
          },
          { type: "date", value: getDate(item.modified), label: "매물수정일자" }
        ];
      };
    },
    sale() {
      const sale = {};
      sale.type = this.item.type_sale;
      if (sale.type === "sale") {
        sale.price = toMoneyString(this.item.price_sale);
        return sale;
      }

      if (sale.type === "charter" || sale.type === "half-charter") {
        sale.price =
          toMoneyString(this.item.price_rent) !== ""
            ? `${toMoneyString(this.item.price_charter)}, ${toMoneyString(
                this.item.price_rent
              )}`
            : toMoneyString(this.item.price_charter);
        return sale;
      }

      if (sale.type === "rent") {
        sale.price =
          toMoneyString(this.item.price_rent) !== ""
            ? `${toMoneyString(this.item.price_deposit)}, ${toMoneyString(
                this.item.price_rent
              )}`
            : toMoneyString(this.item.price_deposit);
        return sale;
      }

      return {
        sale: {
          type: "",
          price: ""
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.area-name {
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -1.05px;
  color: #707070;
  margin-left: 0px;
  &.sub {
    font-size: 14px;
  }
}
.area-amount {
  font-weight: 500;
  font-size: 19px;
  line-height: 26px;
  letter-spacing: -1.35px;
  color: #00a4aa;
  margin-left: 0px;
}
.additional-info {
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.9px;
  color: #3a3a3a;
  div {
    background: #f6f6f6;
    margin-right: 7px;
  }
}
</style>
