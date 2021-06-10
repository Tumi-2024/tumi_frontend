<template>
  <q-item
    class="column  notosanskr-regular "
    :to="{ name: 'for_sale_apartment', params: { data: item } }"
  >
    <div class="row">
      <div class="column align-start" style="flex-basis: 400px">
        <q-item-section>
          <div class="row">
            <template v-for="(badge, index) of getBadges(item)">
              <q-badge :key="index" :class="badge.class" v-if="badge.isShow">
                <q-icon v-if="badge.icon">
                  <img :src="badge.icon" alt="" srcset="" />
                </q-icon>
                <slot name="label">
                {{badge.text}}
                </slot>
              </q-badge>
            </template>
          </div>
        </q-item-section>
        <q-item-section class="area-name q-pt-sm">
          {{ item.address }}
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
      <div class="flex items-center justify-center q-py-sm" style="flex: 1 1 500px">
        <area-item-info :item="item" />
      </div>
    </div>
    <q-separator style="margin-top: 20px" />
  </q-item>
</template>

<script>
import { toMoneyString, toKr, toDateFormat } from "src/utils";
import areaItemInfo from './AreaItemInfo'
export default {
  name: "AreaItem",
  components: {
    "area-item-info": areaItemInfo
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
        console.log(item)
        return [
          { class: 'text-white bg-primary q-mr-sm', text: toKr(item.type_house), isShow: true },
          { class: 'text-white bg-green q-mr-sm', text: item.pyeong + '평', isShow: true },
          { class: 'text-primary bg-white q-mr-sm', text: "투미추천 매물", isShow: item.recommend, outline: true },
          { class: 're-develop bg-white q-mr-sm', text: '재개발', isShow: item.redevelopment, icon: '~assets/icons/redevelop.svg' },
          { class: 'bg-blue q-mr-sm', text: `${toKr(this.sale.type)} ${this.sale.price !== "" ? "/ " + this.sale.price : ""}`, isShow: true },
          { class: 'date text-white bg-black', text: toDateFormat(item.created), isShow: true }
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
.q-badge {
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: -0.9px;

}
.area-name {
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -1.05px;
  color: #707070;
  margin-left: 0px;
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
