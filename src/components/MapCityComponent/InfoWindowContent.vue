<template>
  <div class="row" style="width: 192px; overflow-y: hidden" @click="viewArea()">
    <q-img
      src="~assets/icons/house_orange.svg"
      spinner-color="white"
      style="height: 20px; max-width: 20px"
      class="q-mr-xs q-mt-xs"
    />

    <div class="col">
      <div class="info-heading notosanskr-medium">
        {{ marker.price }}
      </div>
      <div
        class="row bottom-toolbar notosanskr-regular"
        :class="{ 'q-pb-sm': $q.platform.is.mobile }"
      >
        <div class="info-text">단독다가구</div>
        <q-badge color="white" text-color="primary" label="매매" />
        <q-badge class="re-develop bg-white q-mr-sm">
          <q-icon>
            <img src="~assets/icons/redevelop.svg" alt="" srcset="" />
          </q-icon>
        </q-badge>
        <div class="info-text">25평</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    marker: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    ...mapActions("map", ["changeMapMode", "changeMapZoom", "changeMapCenter"]),
    viewArea() {
      this.changeMapMode("transaction");
      this.changeMapZoom(17);
      this.changeMapCenter({
        lat: 37.54439180667893,
        lng: 127.04601120488171
      });
      this.$route.name !== "map_sale_land" &&
        this.$router.push({ name: "map_sale_land" });
    }
  }
};
</script>

<style lang="scss" scoped>
.info-heading {
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -1.125px;
  color: #1a1a1a;
  padding-bottom: 4px;
}
.bottom-toolbar {
  display: flex;
  align-items: center;
  .info-text {
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
    letter-spacing: -0.97px;
    color: #707070;
  }
}
.q-badge {
  font-weight: bold;
  font-size: 12px;
  height: 20px;
  text-align: center;
  letter-spacing: -0.9px;
  margin: auto 2px;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 4px;
  font-weight: 500;
  color: #909090;
  background: white;
}
</style>
