<template>
  <q-item class="column  notosanskr-regular ">
    <q-item-section class="area-title">
      {{ title }}
    </q-item-section>

    <div class="row area-date">
      <div class="date">투미부동산</div>
      <div class="line"></div>
      <div class="value">{{ date }}</div>
    </div>
    <q-item>
      <q-item-section>
        <q-item-label class="area-description" lines="2">{{ description }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-separator style="margin-top: 20px" />
  </q-item>
</template>

<script>
export default {
  props: {
    title: String,
    date: String,
    description: String,
  }
};
</script>

<style lang="scss" scoped>

.area-title {
  font-weight: 600;
  font-size: 19px;
  line-height: 26px;
  letter-spacing: -1.35px;
  color: #1A1A1A;
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
      border-right: 1px solid #E8E8E8;
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
  line-height: 20px !important;
  margin-top: 8px;
  letter-spacing: -0.98px;
  color: #707070;
  white-space: pre-line;
}
  .q-item .q-item-type {
    padding: 0;
  }

</style>
