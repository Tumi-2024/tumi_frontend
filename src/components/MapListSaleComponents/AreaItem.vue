<template>
  <q-item class="column  notosanskr-regular " :to="{ name: 'for_sale_apartment', params: { data: item } }">
    <q-item-section>
      <div class="row">
        <!-- badge for item type -->
        <q-badge class="text-white bg-primary q-mr-sm">{{ toKr(item.type_house) }}</q-badge>
        <!-- badge for item status -->
        <q-badge
          outline
          class="text-primary bg-white q-mr-sm"
          v-if="item.recomend"
        >
          {{ '투미추천 매물' }}
        </q-badge>
        <!-- badge for redevelopment -->
        <q-badge class="re-develop bg-white q-mr-sm" v-if="item.redevelopment">
          <q-icon>
            <img src="~assets/icons/redevelop.svg" alt="" srcset="" />
          </q-icon>
          재개발
        </q-badge>
        <!-- badge for item date -->
        <q-badge class="date">{{ new Date(item.modified).toLocaleDateString() }}</q-badge>
      </div>
    </q-item-section>
    <q-item-section class="area-name q-pt-sm">
      {{ item.address }}
    </q-item-section>
    <q-item-section class="area-amount">
      {{ `${toKr(item.type_sale)} ${toMoneyString(item.price)}` }}
    </q-item-section>
    <div class="additional-info row items-center q-pt-sm">
      <div>{{ (item.area_common) ? `전용면적 ${item.area_common}㎡(${Math.round(item.area_common/3.3)}평)` : '' }}</div>
      <div>{{ item.floor && `${item.floor}층` }}</div>
      <q-icon size="16px">
        <img src="~assets/icons/sun.svg" />
      </q-icon>
      <div>
        {{ item.type_direction && `${toKr(item.type_direction)}향` }}
      </div>
    </div>
    <q-separator style="margin-top: 20px" />
  </q-item>
</template>

<script>
import { toQueryString, toMoneyString, toKr } from 'src/utils';
export default {
  props: {
    item: Object,
  },
  methods: {
    toKr,
    toMoneyString,
  }
};
</script>

<style lang="scss" scoped>
.q-badge {
  font-weight: bold;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.9px;

  &.date,
  &.re-develop {
    border: 1px solid #dbdbdb;
    box-sizing: border-box;
    border-radius: 4px;
    font-weight: 500;
    color: #909090;
    background: white;
  }
}
.area-name {
  font-weight: 500;
  font-size: 14px;
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
