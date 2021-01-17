<template>
  <q-card-section class="q-pa-none full-width" style="padding: 30px 16px;">
    <q-btn
      padding="0px"
      align="left"
      flat
      class="item row full-width"
      @click="toMapActualTransaction"
    >
      <text-under-highlight text="실거래가 조회"></text-under-highlight>
    </q-btn>

    <q-btn padding="0px" align="left" flat class="item row full-width">
      <text-under-highlight text="재개발 구역 정보"></text-under-highlight>
    </q-btn>

    <q-expansion-item class="q-pa-none q-ma-none" header-class="q-px-none">
      <template v-slot:header>
        <div class="full-width row q-pa-none">
          <text-under-highlight text="아파트 매물 찾기"></text-under-highlight>
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

    <q-btn
      padding="0px"
      align="left"
      flat
      class="item row full-width"
      :to="{ path: '/insights/부동산팁' }"
    >
      <text-under-highlight text="부동산 인사이트"></text-under-highlight>
    </q-btn>
  </q-card-section>
</template>

<script>
import TextUnderHighlight from "components/Utilities/TextUnderHighlight";
import { mapActions } from "vuex";
export default {
  components: {
    "text-under-highlight": TextUnderHighlight
  },
  methods: {
    ...mapActions("map", ["changeMapMode", "changeMapZoom", "changeMapCenter"]),
    toMapActualTransaction() {
      this.changeMapMode("actualTransaction");
      this.changeMapZoom(17);
      this.changeMapCenter({ lat: 37.53718802127926, lng: 127.09262711456654 });
      this.$router.push({ name: "map_city" });
    }
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
