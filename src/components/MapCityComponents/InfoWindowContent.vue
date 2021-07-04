<template>
  <div
    style="min-width: 192px; overflow-y: hidden; flex-direction: column;"
    @click="$emit('viewArea')"
    v-if="$route.path !== '/for-sale/apartment'"
  >
    <div style="display: flex; align-items: center; padding-bottom: 4px;">
      <q-img
        src="~assets/icons/house_orange.svg"
        spinner-color="white"
        style="height: 20px; max-width: 20px"
        class="q-mr-xs"
      />

      <div v-if="count && count > 1" style="height: 28px; width:28px; background-color: #FF7D36; position: absolute; right: 0; top: 14px; border-radius: 14px; flex: 1">
        <div style="color: white; font-size: 12px; font-weight: bold; line-height: 18px; text-align:center; margin-top: 6px;">
          {{ `${count}` }}
        </div>
      </div>
      <div class="info-heading notosanskr-medium">
        {{ getItemInfo(item).text_building || getItemInfo(item).text_danji || getItemInfo(item).road_name  }}
      </div>
      <q-separator vertical class="q-ma-xs q-mx-sm" />
        <div class="info-heading small notosanskr-medium">
        {{ getItemInfo(item).text_month.slice(0,4) + '.' + getItemInfo(item).text_month.slice(4,6) }}
      </div>
    </div>
    <div class="col">

      <div class="row bottom-toolbar notosanskr-regular">
        <div class="info-text" v-if="item.type_house">{{ (item.type_house[0] === 'apartment') ? '아파트' : ''}}</div>
        <q-badge class="re-develop bg-white q-mr-sm" v-if="badges.redevelop">
          <q-icon>
            <img src="~assets/icons/redevelop.svg" alt="" srcset="" />
          </q-icon>
        </q-badge>
        <div class="info-text">
          {{(category.find(ct => item.categories.indexOf(ct.key) >= 0) || {label: item.categories}).label}}
        </div>
        <q-separator vertical class="q-ma-xs" />
        <!-- {{badges.type_sale.includes("RENT")}} -->
        <q-badge
          color="white"
          text-color="primary"
          label="월세"
          v-if="item.types.includes('RENT')"
        />
        <q-badge
          color="white"
          text-color="secondary"
          label="전세"
          v-if="item.types.includes('CHARTER')"
        />
        <q-badge
          color="white"
          style="color: #FF5100"
          label="매매"
          v-if="item.types.includes('SALE')"
        />
        <q-badge
          color="white"
          style="color: #FF5100"
          label="매매"
          v-if="item.types.includes('half-charter')"
        />
        <q-separator vertical class="q-ma-xs" />
        <div class="info-text">{{ getItemInfo(item).text_size_land ? Math.floor(getItemInfo(item).text_size_land / 3.3) : '- ' }}평</div>
        <q-separator vertical class="q-ma-xs" />
        <div class="info-text">{{ toMoneyString(getItemInfo(item).text_price, 1000) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { toMoneyString } from 'src/utils';
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
    }
  },
  methods: {
    toMoneyString: toMoneyString
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
      ]
    }
  },
  computed: {
    getItemInfo() {
      return item => {
        return item.recent_transactions[item.categories[0]]
      }
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
