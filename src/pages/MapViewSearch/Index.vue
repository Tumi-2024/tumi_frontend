<template>
  <div>
    <top-toolbar></top-toolbar>
    <search-field></search-field>
    <!-- shows steps -->
    <bread-crumb ref="breadCrumb" @setStep="stepChanged"></bread-crumb>
    <!-- shows regions selections -->
    <table-region-selection
      :activeStep="activeStep"
      @changeStepValue="changeStepValue"
    ></table-region-selection>
  </div>
</template>

<script>
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
      activeStep: { step: "one", value: "서울시" }
    };
  },
  methods: {
    stepChanged(v) {
      this.activeStep = v;
      console.log(v);
    },
    changeStepValue(val) {
      this.activeStep = val;
      this.$refs.breadCrumb.setStepValue(val);
    }
  }
};
</script>

<style scoped></style>
