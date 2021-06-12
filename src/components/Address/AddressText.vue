<template>
  <q-item-section>
    <div class="area-name" :class="this.textClass"> {{address}} </div>
    <div class="area-name sub">{{building}}</div>
  </q-item-section>
</template>
<script>
export default {
  props: {
    textClass: String,
    address: {
      type: String,
      required: true
    },
    building: {
      type: String,
      default() {
        return '아파트단지/주택/건물 명'
      }
    }
  }
}
</script>
<style lang="scss">
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
</style>
