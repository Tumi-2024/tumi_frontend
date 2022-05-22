<template>
  <q-card flat square>
    <q-card-section class="row justify-between items-center q-py-sm q-px-none">
      <!-- left section items -->
      <div class="row items-center">
        <div
          class="flex align-center location-text large text-left notosanskr-regular q-ml-sm"
          style="height: calc((40 / 1312) * 100vh)"
        >
          <img
            :src="require('assets/tumi-logo.png')"
            class="q-mr-sm"
            style="height: 100%"
          />
          <span style="font-size: calc((30 / 1312) * 100vh)">
            {{ typeOfProduct }}
          </span>
        </div>
      </div>
      <!-- right section-items -->
      <section class="q-pr-md">
        <q-btn flat padding="4px" color="black" :to="{ name: 'my_page' }">
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
import { mapGetters, mapActions } from "vuex";

// import DialogPropertyInformation from "./DialogPropertyInformation";
export default {
  components: {
    // DialogPropertyInformation
  },
  computed: {
    ...mapGetters("map", ["getMapMode", "getToolbarLabel", "getToolbarTitle"]),
    typeOfProduct() {
      let text = "매물";
      if (this.$route.path === "/map/city/area") {
        text = "실거래가";
      }
      if (this.$route.query.transactionid) {
        text = "실거래가";
      }
      return text;
    }
  },
  methods: {
    ...mapActions("map", ["changeMapZoom", "changeMapCenter"]),

    toggleHeaderTitle() {
      this.$router.push({ name: "map_view_search" });
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
