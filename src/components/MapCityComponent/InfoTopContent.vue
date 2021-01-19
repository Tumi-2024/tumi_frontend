<template>
  <div class="top-info-container notosanskr-medium">
    <div class="markerYear" :class="{ 'mr-54': marker.infoNumber }">
      {{ marker.year }}
    </div>
    <div
      class="roundedNumber bg-primary text-positive"
      v-if="marker.infoNumber"
    >
      {{ marker.infoNumber }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    marker: Object
  }
};
</script>

<style lang="scss" scoped>
.top-info-container {
  position: absolute;
  width: 100%;
  padding-right: 15px;
  margin-top: -20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 10px;
  .markerYear {
    background: aliceblue;
    position: absolute;
    right: 0;
    width: 44px;
    margin-right: 20px;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    letter-spacing: -0.975px;
    color: #d32c00;
    border: 1px solid #d32c00;
    border-radius: 4px;
    padding: 2px;
    &.mr-54 {
      margin-right: 54px;
    }
  }
  .roundedNumber {
    position: absolute;
    float: right;
    width: 35px;
    height: 35px;
    font-size: 12;
    font-weight: bold;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
