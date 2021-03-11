<template>
  <q-dialog v-model="dialogPropertyInfo" position="bottom">
    <q-card class="notosanskr-regular">
      <q-card-section class="header-title bg-white notosanskr-medium">
        찾아볼 매물 정보
      </q-card-section>

      <q-card-section class="row bg-white q-pa-none notosanskr-medium">
        <div v-for="(item, i) of properties" :key="i" class="col-3">
          <q-btn
            flat
            padding="12px 0"
            class="full-width"
            @click="() => navigateInto(item.value)"
          >
            <q-icon size="56px">
              <img :src="require(`assets/icons/${item.iconSrc}`)" alt="icon" />
            </q-icon>
            <div class="col-12">
              {{ item.title }}
            </div>
          </q-btn>
        </div>
      </q-card-section>

      <q-card-section class="bg-white">
        <q-btn
          color="primary"
          unelevated
          text-color="positive"
          label="정보 조회하기"
          class="btn-retrieving-info full-width notosanskr-medium"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dialogPropertyInfo: false,
      properties: [
        {
          title: "실거래가 조회",
          iconSrc: "PropertyInfoDialog/actual-transaction-price.svg",
          value: "mapActualTransaction"
        },
        {
          title: "재개발 매물",
          iconSrc: "PropertyInfoDialog/redevelopment-forsale.svg",
          value: ""
        },
        {
          title: "아파트매물",
          iconSrc: "PropertyInfoDialog/apartment-forsale.svg",
          value: "mapApartment"
        },
        {
          title: "재개발 구역 정보",
          iconSrc: "PropertyInfoDialog/redevelopment-area-info.svg",
          value: "MapRedevelopmentArea"
        },
        {
          title: "부동산 인사이트",
          iconSrc: "PropertyInfoDialog/real-estate-insight.svg",
          value: "insights"
        }
      ]
    };
  },
  methods: {
    ...mapActions("map", [
      "changeMapMode",
      "changeMapZoom",
      "changeMapCenter",
      "changeToolbarTitle"
    ]),
    showDialog() {
      this.dialogPropertyInfo = true;
    },
    navigateInto(routeName) {
      switch (routeName) {
        case "mapActualTransaction":
          this.changeMapMode("transaction");
          this.changeMapZoom(16);
          this.changeMapCenter({
            lat: 37.53718802127926,
            lng: 127.09262711456654
          });
          this.changeToolbarTitle("실거래가 조회");
          this.$router.push({ name: "map_city" });
          break;

        case "mapApartment":
          this.changeMapMode("apartment");
          this.changeMapZoom(16);
          this.changeMapCenter({
            lat: 37.55931046167917,
            lng: 127.06229167224119
          });
          this.changeToolbarTitle("아파트 매물");
          this.$router.push({ name: "map_city" });
          break;

        case "MapRedevelopmentArea":
          this.$router.push({ name: "map_city_area" });
          break;

        case "insights":
          this.$router.push({ path: "/insights/부동산팁" });
          break;

        default:
          break;
      }
      this.dialogPropertyInfo = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.q-dialog {
  .q-card {
    width: 100%;
    max-width: 1000px;
    height: auto;
    border-radius: 16px 16px 0 0;
    background: #f0f0f0;
    .empty-bottom-space {
      height: 200px;
    }

    .header-title {
      font-weight: 500;
      font-size: 17px;
      line-height: 26px;
      letter-spacing: -1.2px;
      color: #1a1a1a;
    }

    .btn-retrieving-info {
      font-weight: 500;
      font-size: 17px;
      line-height: 52px;
      text-align: center;
      letter-spacing: -1.275px;
      border-radius: 12px;
    }
  }
}
</style>
