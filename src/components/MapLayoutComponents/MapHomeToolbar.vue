<template>
  <q-card flat square style="height: 60px">
    <q-card-section class="row justify-between items-center q-pa-none">
      <!-- left section items -->
      <q-btn class="row" flat padding="4px 16px">
        <div class="helper text-left col-12 notosanskr-regular">
          {{ getToolbarLabel }}
        </div>
        <div class="q-mt-xs col-12 text-left notosanskr-medium">
          <div class="location-text " flat text-color="black">
            {{ getToolbarTitle }}
            <!-- <q-icon name="keyboard_arrow_down" size="24px" /> -->
          </div>
        </div>
      </q-btn>
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
import { mapGetters } from "vuex";
// import DialogPropertyInformation from "./DialogPropertyInformation";
export default {
  components: {
    // DialogPropertyInformation
  },
  computed: {
    ...mapGetters("map", ["getMapMode", "getToolbarLabel", "getToolbarTitle"])
  },
  methods: {
    toggleHeaderTitle() {
      // this.getMapMode === "default"
      //   ? this.$router.push({ name: "map_view_search" })
      //   : this.$refs.DialogPropertyInformation.showDialog();
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
  font-weight: 500;
  font-size: 21px;
  line-height: 30px;
  letter-spacing: -1.575px;
  color: #1a1a1a;
}
</style>
