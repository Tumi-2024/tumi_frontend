<template>
  <q-item class="column  notosanskr-regular">
    <div class="row">
      <div class="column" style="flex: 1 0 300px; margin-right: 20px">
        <q-item-section>
          <address-with-badges
            :item="{
              address: `${item.address} (${item.text_road})`,
              building: `${item.text_building ? item.text_building : ''} ${`${item.text_floor ? item.text_floor + '층' : ''}`}`
            }"
            :tags="getBadges(item, ctgr)"
          />
        </q-item-section>
      </div>
      <div class="flex items-center q-py-sm" style="flex: 1 1 600px">
        <area-item-info :infoProps="[]" :subInfoProps="getSubInfoProps(item)" col="4"
        />
      </div>
    </div>
    <q-separator style="margin-top: 20px" />
  </q-item>
</template>

<script>
import { toMoneyString, toKr } from "src/utils";
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
    ctgr: Array,
    type: Array
  },
  mounted() {},
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
      sellType: [{ key: 'SALE', label: '매매' }, { key: 'RENT', label: '임대' }],
      subInfoProps: []
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
      return str1.slice(0, 4) + '.' + str1.slice(4, 6) + '.' + str2
    }
  },
  computed: {
    getSubInfoProps() {
      console.log(this.ctgr[0])
      return (item) => {
        switch (this.ctgr[0]) {
          case 'COMMERCIAL ':
            return [
              { title: '유형', value: item.text_type },
              { title: '용도지역', value: item.text_type_area },
              { title: '건축물주용도', value: item.text_type_yongdo },
              { title: '도로조건', value: item.text_type_road },
              { title: '전용/연면적(㎡)', value: item.text_size_total },
              { title: '계약년월', value: `${item.text_month.slice(0, 4)}.${item.text_month.slice(4, 6)}` },
              { title: '계약일', value: `${item.text_day.length === 1 ? '0' + item.text_day : item.text_day}` },
              { title: '거래금액(만원)', value: item.text_price },
              { title: '층', value: `${item.text_floor}층` },
              { title: '건축년도', value: item.text_year },
              { title: '해제사유발생일', value: '해제 사유' }]
          case 'SINGLE':
            return [
              { title: '주택유형', value: item.text_house_type },
              { title: '도로조건', value: item.text_type_road },
              { title: '연면적(㎡)', value: item.text_size_yean },
              { title: '대지면적(㎡)', value: item.text_size_daeji },
              { title: '계약년월', value: `${item.text_month.slice(0, 4)}.${item.text_month.slice(4, 6)}` },
              { title: '계약일', value: `${item.text_day.length === 1 ? '0' + item.text_day : item.text_day}` },
              { title: '거래금액(만원)', value: item.text_price },
              { title: '건축년도', value: item.text_year },
              { title: '해제사유발생', value: '해제 사유' }]
          case 'OFFICETEL':
            return [
              { title: '단지명', value: item.text_danji },
              { title: '전용면적(㎡)', value: item.text_size_private },
              { title: '계약년월', value: `${item.text_month.slice(0, 4)}.${item.text_month.slice(4, 6)}` },
              { title: '계약일', value: `${item.text_day.length === 1 ? '0' + item.text_day : item.text_day}` },
              { title: '거래금액(만원)', value: item.text_price },
              { title: '층', value: `${item.text_floor}층` },
              { title: '건축년도', value: item.text_year },
              { title: '해제사유발생', value: '해제 사유' }]
          case 'APARTMENT':
            return [
              { title: '단지명', value: item.text_danji },
              { title: '전용면적(㎡)', value: item.text_size_private },
              { title: '계약년월', value: `${item.text_month.slice(0, 4)}.${item.text_month.slice(4, 6)}` },
              { title: '계약일', value: `${item.text_day.length === 1 ? '0' + item.text_day : item.text_day}` },
              { title: '거래금액(만원)', value: item.text_price },
              { title: '층', value: `${item.text_floor}층` },
              { title: '건축년도', value: item.text_year },
              { title: '해제사유발생', value: '해제 사유' }]
          case 'LAND':
            return [
              { title: '지목', value: item.text_jimog },
              { title: '용도지역', value: item.text_type_area },
              { title: '도로조건', value: item.text_type_road },
              { title: '계약년월', value: `${item.text_month.slice(0, 4)}.${item.text_month.slice(4, 6)}` },
              { title: '계약일', value: `${item.text_day.length === 1 ? '0' + item.text_day : item.text_day}` },
              { title: '계약면적(㎡)', value: item.text_size_contract },
              { title: '거래금액(만원)', value: item.text_price },
              { title: '지분구분', value: item.text_type_land },
              { title: '해제사유발생', value: '해제 사유' }
            ]
          case 'ALLIANCE':
            return [
              { title: '건물명', value: item.text_building },
              { title: '전용면적(㎡)', value: item.text_size_private },
              { title: '대지권면적(㎡)', value: item.text_size_land },
              { title: '계약년월', value: `${item.text_month.slice(0, 4)}.${item.text_month.slice(4, 6)}` },
              { title: '계약일', value: `${item.text_day.length === 1 ? '0' + item.text_day : item.text_day}` },
              { title: '거래금액(만원)', value: item.text_price },
              { title: '층', value: `${item.text_floor}층` },
              { title: '건축년도', value: item.text_year },
              { title: '해제사유발생', value: '해제 사유' }]

          case '분양':
            return [
              { title: '분양/입주', value: '분양/입주' },
              { title: '단지명', value: item.text_danji },
              { title: '전용면적(㎡)', value: item.text_size_private },
              { title: '계약년월', value: `${item.text_month.slice(0, 4)}.${item.text_month.slice(4, 6)}` },
              { title: '계약일', value: `${item.text_day.length === 1 ? '0' + item.text_day : item.text_day}` },
              { title: '거래금액(만원)', value: item.text_price },
              { title: '층', value: `${item.text_floor}층` },
              { title: '해제사유발생', value: '해제 사유' }]
          default:
            return []
        }
      }
    },

    getBadges() {
      return (item, ctgr) => {
        return [
          { type: 'houseType', value: (this.category.find(obj => obj.key === this.ctgr[0]) || { label: '' }).label },
          // { type: 'pyeong', value: Math.floor(Number(item.text_size_total) * 10 / 3.3) / 10 + '평' },
          { type: this.type[0].toLowerCase(), value: `${toMoneyString(item.price)}` },
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
