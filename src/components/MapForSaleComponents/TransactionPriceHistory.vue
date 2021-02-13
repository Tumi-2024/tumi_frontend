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
      <div class="reference notosanskr-regular">
        <div class="box-colors primary"></div>
        <span>매매</span>
        <div class="box-colors secondary"></div>
        <span>전세</span>
        <div class="box-colors white"></div>
        <span>월세</span>
      </div>
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
.reference {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  padding: 20px 0 8px 0;

  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.9px;

  border-bottom: 1px solid #1a1a1a;
  color: #707070;
  .box-colors {
    width: 12px;
    height: 8px;
    margin: auto 2px auto 8px;
    &.primary {
      background: #ff5100;
      opacity: 0.2;
    }
    &.secondary {
      background-color: #00a4aa;
      opacity: 0.2;
    }
    &.white {
      border: 1px solid #d5d5d5;
      box-sizing: border-box;
      border-radius: 2px;
    }
  }
}
</style>
