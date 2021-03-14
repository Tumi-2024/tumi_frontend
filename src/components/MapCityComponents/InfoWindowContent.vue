<template>
  <div
    class="row"
    style="width: 192px; overflow-y: hidden"
    @click="$emit('viewArea')"
  >
    <q-img
      src="~assets/icons/house_orange.svg"
      spinner-color="white"
      style="height: 20px; max-width: 20px"
      class="q-mr-xs q-mt-xs"
    />

    <div v-if="count && count > 1" style="height: 28px; width:28px; background-color: #FF7D36; position: absolute; right: 0; top: 14px; border-radius: 14px; flex: 1">
      <div style="color: white; font-size: 12px; font-weight: bold; line-height: 18px; text-align:center; margin-top: 6px;">
        {{ `${count}` }}
      </div>
    </div>

    <div class="col">
      <div class="info-heading notosanskr-medium">
        {{ toMoneyString(price) }}
      </div>
      <div class="row bottom-toolbar notosanskr-regular">
        <div class="info-text" v-if="badges.type_house">{{ (badges.type_house === 'apartment') ? '아파트' : ''}}</div>
        <q-badge class="re-develop bg-white q-mr-sm" v-if="badges.redevelop">
          <q-icon>
            <img src="~assets/icons/redevelop.svg" alt="" srcset="" />
          </q-icon>
        </q-badge>

        <q-badge
          color="white"
          text-color="primary"
          :label="
          (badges.type_sale === 'sale') ? '매매' : 
          (badges.type_sale === 'charter') ? '전세' : 
          (badges.type_sale === 'half-charter') ? '반전세' : 
          (badges.type_sale === 'rent') ? '월세' : badges.type_sale"
          v-if="badges.type_sale"
        />
        <!-- 여러개할라면 여러개넣고 하나만할라면 하나만해라 -->
        <!-- <q-badge
          color="white"
          text-color="secondary"
          label="전세"
          v-if="badges.type_sale === 'charter'"
        />
        <q-badge
          color="white"
          text-color="primary"
          label="매매"
          v-if="badges.type_sale === 'sale'"
        /> -->
        <q-separator vertical class="q-ma-xs" />
        <div class="info-text" v-if="badges.area">{{ Math.round(badges.area/3.3) }}평</div>
      </div>
    </div>
  </div>
</template>

<script>
import { toMoneyString } from 'src/utils';
export default {
  props: {
    item: {
      type: Object,
    },
    price: {
      type: Number,
      default: ""
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
    toMoneyString: toMoneyString,
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
  padding-bottom: 4px;
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
