<template>
  <q-item
    class="column notosanskr-regular"
    :to="{ name: 'for_sale_apartment', query }"
  >
    <div class="row">
      <div class="column" style="flex: 1 0 300px; margin-right: 20px">
        <q-item-section>
          <address-with-badges
            :item="{
              address: item.address,
              building: `${item.transaction_group ? item.transaction_group.building ||
                item.transaction_group.text_road : ''}
              ${item.text_building || item.text_danji || ''}`
            }"
            :tags="getBadges(item)"
          />
        </q-item-section>
      </div>
      <div class="flex items-center q-py-sm" style="flex: 1 1 600px">
        <area-item-info :item="item" />
      </div>
    </div>
    <q-separator style="margin-top: 20px" />
  </q-item>
</template>

<script>
import { toMoneyString, toKr, toDateFormat } from "src/utils";
import areaItemInfo from "./AreaItemInfo";
import AddressWithBadges from "../Address/AddressWithBadges";

export default {
  name: "AreaItem",
  components: {
    "area-item-info": areaItemInfo,
    "address-with-badges": AddressWithBadges
  },
  props: {
    item: Object,
    ctgr: String,
    type: String,
    query: Object
  },
  methods: {
    toKr,
    toMoneyString,
    toDateFormat,
    getdate(string1, string2) {
      const str1 = string1;
      let str2 = string2;
      if (str2.length === 1) {
        str2 = 0 + str2;
      }
      return str1.slice(0, 4) + "." + str1.slice(4, 6) + "." + str2;
    },
    reshape(item) {
      if(!item.group_building_house) {
        item['group_building_house'] = {'type_house': item.type_house}
      }
      if(!item.group_individual_household) {
        item['group_individual_household'] = {'size_dedicated_area': item.size_dedicated_area}
      }
      if(!item.group_land_use) {
        item['group_land_use'] = {'type_structure_building': item.type_structure_building}
      }
      if(!item.group_trading_terms) {
        item['group_trading_terms'] = { 
          'price_selling_hope': item.price_selling_hope,
          'price_charter_deposit_hope': item.price_charter_deposit_hope,
        }
      }
      return item
    }
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
    getBadges() {
      return (item, ctgr) => {
        item = this.reshape(item)
        const getDate = (date) => {
          const d = new Date(date)
          const y = String(d.getFullYear()).split(0, 2)[1]
          return y + String('.' + d.getMonth() + '.' + d.getDate())
        }

        return [
          {
            type: "transactionStatus",
            value: item.transactionStatus ? false : "재개발",
            icon: require("src/assets/icons/redevelop.svg")
          },
          { type: "houseType", value: item.group_building_house.type_house },
          { type: "redevelopment", value: item.redevelopment },
          { type: "stageProgress", value: item.stageProgress },
          { type: 'pyeong', value: (item.group_individual_household.size_dedicated_area / 3.3).toFixed(0) + '평' },
          {
            type: 'price',
            value: `${toMoneyString(item.group_trading_terms.price_selling_hope || item.group_trading_terms.price_charter_deposit_hope)}`
          },
          { type: "date", value: getDate(item.created) }
        ];
      };
    },
    // getBadges() {
    //   return (item) => {
    //     return [
    //       { type: 'houseType', value: toKr(item.type_house) },
    //       { type: 'pyeong', value: item.pyeong + '평' },
    //       { type: 'recommend', value: "투미추천 매물", isShow: item.recommend },
    //       { type: 'redevelopment', value: '재개발', isShow: item.redevelopment_area, icon: '~assets/icons/redevelop.svg' },
    //       { type: this.sale.type, value: `${toKr(this.sale.type)} ${this.sale.price !== "" ? "/ " + this.sale.price : ""}` },
    //       { type: 'date', value: toDateFormat(item.created) }
    //     ]
    //   }
    // },
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
