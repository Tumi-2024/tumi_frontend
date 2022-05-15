<template>
  <q-item class="column notosanskr-regular">
    <q-item-section class="area-title"> {{ title }}123123 </q-item-section>

    <div class="row area-date">
      <div class="date">투미부동산</div>
      <div class="line"></div>
      <div class="value">{{ date }}</div>
    </div>

    <q-item-section class="area-description">
      {{ description }}123123
    </q-item-section>

    <q-separator style="margin-top: 20px" />
  </q-item>
</template>

<script>
export default {
  props: {
    title: String,
    date: String,
    description: String
  }
};
</script>

<style lang="scss" scoped>
.area-title {
  font-weight: 600;
  font-size: 19px;
  line-height: 26px;
  letter-spacing: -1.35px;
  color: #1a1a1a;
  margin-left: 0px;
}

.area-date {
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.98px;
  color: #909090;
  margin-top: 8px;
  margin-left: 0px;
  div.date {
    padding-right: 4px;
  }
  div.line {
    border-right: 1px solid #e8e8e8;
    height: 12px;
    margin-top: 4px;
  }
  div.value {
    padding-left: 4px;
  }
}

.area-description {
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
  margin-top: 8px;
  letter-spacing: -0.98px;
  color: #707070;
}
</style>
