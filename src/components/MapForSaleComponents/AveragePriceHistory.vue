<template>
  <q-card flat class="bg-white notosanskr-regular">
    <q-card-section class="row q-pb-none justify-between">
      <div class="title-heading col-6">
        최근 3년 평균 실거래가
      </div>

      <q-select
        dense
        v-model="areaSelected"
        :options="areaOptions"
        hide-selected
        :label="areaSelected || '평수'"
        class="area-selection"
        color="primary"
        label-color="primary"
        v-if="areaOptions"
      />
    </q-card-section>

    <q-card-section class="q-pa-none">
      <div class="average-pricing q-pa-md">
        <div class="title q-py-xs">
          최근 한달기준 실거래가 평균
          <q-badge outline color="grey-13" class="q-mx-xs bg-white">
            <span class="date  notosanskr-medium">2020년 06월</span>
          </q-badge>
        </div>
        <div class="price-value notosanskr-medium">
          11억 4,800만
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      areaSelected: ""
    };
  },
  props: {
    areaOptions: Array
  }
};
</script>

<style lang="scss" scoped>
.title-heading {
  font-size: 17px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
  line-height: 26px;
}
.area-selection {
  width: 75px;
  float: right;
  border: #ff5a00 solid 2px;
  border-radius: 8px;
  padding-left: 10px;
}
.average-pricing {
  border-radius: 8px;
  background: #f7f7f7;
  margin: 20px 16px;
  .title {
    font-size: 15px;
    line-height: 22px;
    letter-spacing: -1.125px;
    color: #d32c00;
    .date {
      font-weight: 500;
      font-size: 12px;
      letter-spacing: -0.9px;
      color: #707070;
    }
  }
  .price-value {
    font-weight: 500;
    font-size: 21px;
    line-height: 32px;
    letter-spacing: -1.575px;
    color: #1a1a1a;
  }
}
</style>
