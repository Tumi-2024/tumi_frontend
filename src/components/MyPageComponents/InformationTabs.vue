<template>
  <q-card-section class="q-pa-none full-width" style="padding: 30px 16px;">
    <div class="item row full-width">
      <div class="row">
        <div class="text col-12 notosanskr-medium">실거래가 조회</div>
        <span class="highlighter full-width q-py-xs"></span>
      </div>
    </div>

    <div class="item row full-width">
      <div class="row">
        <div class="text col-12 notosanskr-medium">재개발 구역 정보</div>
        <span class="highlighter full-width q-py-xs"></span>
      </div>
    </div>

    <q-expansion-item class="q-pa-none q-ma-none" header-class="q-px-none">
      <template v-slot:header>
        <div class="full-width row q-pa-none">
          <div class="row" style="height: 24px">
            <div class="text col-12 notosanskr-medium">아파트 매물 찾기</div>
            <span class="highlighter full-width q-py-xs"></span>
          </div>
        </div>
      </template>
      <q-card class="investment-sale">
        <q-card-section
          style="padding: 14px; background: #F6F6F6"
          class="row notosanskr-regular"
        >
          <div class="col-6 q-pa-sm">아파트</div>
          <div class="col-6 q-pa-sm">재개발</div>
          <div class="col-6 q-pa-sm">가로주택</div>
          <div class="col-6 q-pa-sm">기타매물</div>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <div class="item row full-width">
      <div class="row">
        <div class="text col-12 notosanskr-medium">부동산 인사이트</div>
        <span class="highlighter full-width q-py-xs"></span>
      </div>
    </div>
  </q-card-section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.item {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -1.2px;
  color: #1a1a1a;
  padding: 14px 0;
}
.text {
  z-index: 1;
}

.highlighter {
  background: #ffd8cc;
  margin-top: -10px;
  z-index: 0;
}

.investment-sale {
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  /* identical to box height, or 147% */

  letter-spacing: -0.975px;

  /* Font/30 */

  color: #707070;
}
</style>
