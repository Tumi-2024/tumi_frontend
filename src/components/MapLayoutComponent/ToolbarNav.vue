<template>
  <q-card
    flat
    square
    class="row justify-between items-center q-px-md"
    style="height: 60px"
  >
    <div>
      <div class="helper notosanskr-regular">
        지금 보고있는 지역
      </div>
      <div class="location-text q-mt-xs notosanskr-medium">
        서울시 종로구
      </div>
    </div>
    <div>
      <q-btn flat>
        <q-icon name="menu" size="24px"></q-icon>
      </q-btn>
      <q-icon size="24px">
        <img src="~assets/icons/regular-house.svg" alt="" />
      </q-icon>
    </div>
  </q-card>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.helper {
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.9px;
  color: #707070;
}
.location-text {
  font-weight: 500;
  font-size: 21px;
  line-height: 30px;
  letter-spacing: -1.575px;
  color: #1a1a1a;
}
</style>
