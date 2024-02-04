<template>
  <q-card flat square>
    <q-card-section class="row justify-between items-center q-py-sm q-px-none">
      <!-- left section items -->
      <div class="row items-center">
        <div
          class="flex align-center location-text large text-left notosanskr-regular q-ml-sm"
          style="height: 30px"
        >
          <img
            :src="require('assets/tumi-icon-high.png')"
            class="q-mr-sm cursor-pointer"
            style="height: 100%"
            @click="$router.push({ name: 'home' })"
          />
          <span
            class="text-h6 text-bold"
            style="
              -webkit-user-select: none;
              -moz-user-select: none;
              -ms-user-select: none;
              user-select: none;
              color: #222222;
            "
            >{{ getHeaderLabel }}
          </span>
        </div>
      </div>

      <!-- right section-items -->
      <section class="q-pr-md">
        <q-btn flat padding="4px" color="black" :to="{ name: 'recently_seen' }">
          <q-icon name="menu" size="24px"></q-icon>
        </q-btn>
        <q-btn flat padding="4px" :to="{ name: 'home' }">
          <q-icon size="24px">
            <img src="~assets/icons/regular-house.svg" alt="" />
          </q-icon>
        </q-btn>
      </section>
    </q-card-section>
    <!--
      Dialog Section for Property Information | 찾아볼 매물 정보
      this Dialog will show if getMapMode is not "default"
      -->
    <!-- <dialog-property-information ref="DialogPropertyInformation" /> -->
  </q-card>
</template>

<script>
// import DialogPropertyInformation from "./DialogPropertyInformation";
export default {
  components: {
    // DialogPropertyInformation
  },
  methods: {
    toggleHeaderTitle() {
      this.$router.push({ name: "map_view_search" });
    }
  },
  computed: {
    getHeaderLabel() {
      const _routename = this.$route.name;
      const _routeArr = [
        {
          text: "매물 지도",
          route: "map_city"
        },
        {
          text: "정비사업/실거래가 지도",
          route: "map_city_area"
        },
        {
          text: "매물 검색",
          route: "listHouses"
        },
        {
          text: "실거래가 검색",
          route: "listTransactions"
        },
        {
          text: "부동산 인사이트",
          route: "insights"
        }
      ];
      return _routeArr.find((item) => item.route === _routename)?.text;
    }
  }
};
</script>

<style lang="scss" scoped>
.helper {
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.9px;
  color: #707070;
}
.location-text {
  letter-spacing: -1.575px;
  color: #1a1a1a;
}
</style>
