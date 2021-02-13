<template>
  <q-card flat class="bg-white ">
    <q-card-section class="q-pb-none justify-between">
      <div class="title-heading notosanskr-medium">
        실거래가 히스토리
      </div>
      <q-tabs
        v-model="tab"
        align="justify"
        class="tabs bg-white notosanskr-medium"
        :breakpoint="0"
        indicator-color="primary"
        active-color="primary"
      >
        <q-tab name="all" label="전체" />
        <q-tab name="trading" label="매매" />
        <q-tab name="charter" label="전세" />
        <q-tab name="monthly" label="월세" />
      </q-tabs>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  data() {
    return {
      tab: "all"
    };
  }
};
</script>
<style lang="scss" scoped>
.title-heading {
  font-size: 17px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
  line-height: 26px;
  margin-bottom: 16px;
}
.tabs {
  font-weight: 500;
  font-size: 16px;
  line-height: 44px;
  text-align: center;
  letter-spacing: -1.125px;
  color: #707070;
  .q-tab {
    border-bottom: #e8e8e8 solid 3px;
  }
}
</style>
