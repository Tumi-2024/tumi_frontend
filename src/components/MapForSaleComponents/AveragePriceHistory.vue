<template>
  <q-card flat class="bg-white notosanskr-medium">
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
</style>
