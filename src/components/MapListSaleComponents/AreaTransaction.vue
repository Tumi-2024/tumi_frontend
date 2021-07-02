<template>
  <q-item class="column  notosanskr-regular">
    <div class="row">
      <div class="column" style="flex: 1 0 300px; margin-right: 20px">
        <q-item-section>
          <address-with-badges :item="{address: currentItem.address}" :tags="getBadges(item)" />
        </q-item-section>
      </div>
      <div class="flex items-center q-py-sm" style="flex: 1 1 600px">
        <area-item-info :infoProps="[]" :subInfoProps="[]" />
      </div>
    </div>
    <q-separator style="margin-top: 20px" />
  </q-item>
</template>

<script>
import { toMoneyString, toKr, toDateFormat } from "src/utils";
import areaItemInfo from './AreaItemInfo'
import AddressWithBadges from '../Address/AddressWithBadges';

export default {
  name: "AreaItem",
  components: {
    "area-item-info": areaItemInfo,
    "address-with-badges": AddressWithBadges
  },
  props: {
    item: Object,
    currentItem: Object
  },
  data() {
    return {
      category: [
        { key: 'COMMERCIAL ', label: '상업업무용' },
        { key: 'SINGLE', label: '단독다가구' },
        { key: 'OFFICETEL', label: '오피스텔' },
        { key: 'APARTMENT', label: '아파트' },
        { key: 'LAND', label: '토지' },
        { key: 'ALLIANCE', label: '연립/다세대' }
      ],
      sellType: [

      ]
    }
  },
  methods: {
    toKr,
    toMoneyString,
    getdate(string1, string2) {
      const str1 = string1
      let str2 = string2
      if (str2.length === 1) {
        str2 = 0 + str2
      }
      return str1.slice(0,4) + '.' + str1.slice(4,6) + '.' + str2
    }
  },
  computed: {
    getBadges() {
      return (item) => {
        return [
          { type: 'houseType', value: (this.category.find(ctgr => ctgr.key === item.category) || {label: ''} ).label },
          { type: 'pyeong', value: item.pyeong || '-' + '평' },
          { type: this.sale.type, value: `${toKr(this.sale.type)} ${this.sale.price !== "" ? "/ " + this.sale.price : ""}` },
          { type: 'date', value: this.getdate(item.text_month, item.text_day) }
        ]
      }
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
