<template>
  <div>
    <top-toolbar></top-toolbar>
    <search-field></search-field>
    <!-- shows steps -->
    <bread-crumb
      ref="breadCrumb"
      :first="addr1 && addr1.title"
      :second="addr2 && addr2.title"
      @setStep="stepChanged"
    />
    <!-- shows regions selections -->

    <table-region-selection
      v-if="step === 0"
      :data="$store.state.search.location"
      @select="selectFirst"
    />

    <table-region-selection
      v-if="step === 1"
      :data="$store.state.search.location[addr1.title].sub"
      @select="selectSecond"
      @visit="visitMap"
      hide-no-coords
      show-button-bottom
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  TopToolbar,
  SearchField,
  BreadCrumb,
  TableRegionSelection
} from "components/MapViewSearchComponents";
export default {
  components: {
    "top-toolbar": TopToolbar,
    "search-field": SearchField,
    "bread-crumb": BreadCrumb,
    "table-region-selection": TableRegionSelection
  },
  data() {
    return {
      step: 0,
      addr1: "",
      addr2: ""
    };
  },
  methods: {
    ...mapActions("map", [
      "changeMapMode",
      "changeMapZoom",
      "changeMapCenter",
      "changeToolbarTitle"
    ]),
    stepChanged(v) {
      this.step = v;
    },
    selectFirst(val) {
      this.addr1 = val;
      this.step = 1;
      this.$refs.breadCrumb.setStep(1);
    },
    selectSecond(val) {
      this.addr2 = val;
    },
    visitMap(val) {
      this.changeMapZoom(16);
      this.changeMapCenter({
        lat: Number(val.latitude),
        lng: Number(val.longitude)
      });
      this.$router.push({ name: "map_city" });
    }
  }
};
</script>

<style scoped></style>
