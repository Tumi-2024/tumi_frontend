<template>
  <q-card-section class="q-pa-none full-width" style="padding: 30px 16px;">
    <div class="item row full-width" v-for="(tab, i) in tabs" :key="i">
      <div class="row">
        <div class="text col-12 notosanskr-medium">{{ tab }}</div>
        <span class="highlighter full-width q-py-xs"></span>
      </div>
    </div>
  </q-card-section>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        "실거래가 조회",
        "재개발 구역 정보",
        "아파트 매물 찾기",
        "투자 매물 찾기",
        "부동산 인사이트"
      ]
    };
  }
};
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
</style>
