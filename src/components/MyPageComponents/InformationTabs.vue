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

    <q-btn
      padding="0px"
      align="left"
      flat
      class="item row full-width"
      @click="toRedevelopmentArea"
    >
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
          <q-btn
            flat
            dense
            align="left"
            label="아파트"
            class="col-6"
            @click="toApartmentArea"
          />
          <q-btn
            flat
            dense
            align="left"
            label="재개발"
            class="col-6"
            @click="toApartmentArea"
          />
          <q-btn
            flat
            dense
            align="left"
            label="가로주택"
            class="col-6"
            @click="toApartmentArea"
          />
          <q-btn
            flat
            dense
            align="left"
            label="기타매물"
            class="col-6"
            @click="toApartmentArea"
          />
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
    ...mapActions("map", [
      "changeMapMode",
      "changeMapZoom",
      "changeMapCenter",
      "changeToolbarTitle"
    ]),
    toMapActualTransaction() {
      this.changeMapMode("transaction");
      this.changeMapZoom(16);
      this.changeMapCenter({ lat: 37.53718802127926, lng: 127.09262711456654 });
      this.changeToolbarTitle("실거래가 조회");
      this.$router.push({ name: "map_city" });
    },
    toRedevelopmentArea() {
      this.$router.push({ name: "map_city_area" });
    },
    toApartmentArea() {
      this.changeMapMode("apartment");
      this.changeMapZoom(16);
      this.changeMapCenter({ lat: 37.55931046167917, lng: 127.06229167224119 });
      this.changeToolbarTitle("아파트 매물");
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

.investment-sale {
  font-weight: 500;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -0.975px;
  color: #707070;
}
</style>
