<template>
  <q-item
    class="column  notosanskr-regular "
    :to="{ name: 'for_sale_apartment', params: { data: item } }"
  >
    <div class="row">
      <div class="column" style="flex: 1 0 300px; margin-right: 20px">
        <q-item-section>
          <address-with-badges :item="item" :tags="getBadges(item)" />
        </q-item-section>
        <!-- <div class="additional-info row items-center q-pt-sm">
          <div>
            {{
              item.area_common
                ? `전용면적 ${item.area_common}㎡(${Math.round(
                    item.area_common / 3.3
                  )}평)`
                : ""
            }}
          </div>
          <div>{{ item.floor && `${item.floor}층` }}</div>

        </div> -->
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
import areaItemInfo from './AreaItemInfo'
import AddressWithBadges from '../Address/AddressWithBadges';

export default {
  name: "AreaItem",
  components: {
    "area-item-info": areaItemInfo,
    "address-with-badges": AddressWithBadges
  },
  props: {
    item: Object
  },
  methods: {
    toKr,
    toMoneyString,
    toDateFormat
  },
  computed: {
    getBadges() {
      return (item) => {
        return [
          { type: 'houseType', value: toKr(item.type_house) },
          { type: 'pyeong', value: item.pyeong + '평' },
          { type: 'recommend', value: "투미추천 매물", isShow: item.recommend },
          { type: 'redevelopment', value: '재개발', isShow: item.redevelopment_area, icon: '~assets/icons/redevelop.svg' },
          { type: this.sale.type, value: `${toKr(this.sale.type)} ${this.sale.price !== "" ? "/ " + this.sale.price : ""}` },
          { type: 'date', value: toDateFormat(item.created) }
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
