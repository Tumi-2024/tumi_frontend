<template>
  <div>
    <top-toolbar></top-toolbar>
    <search-field></search-field>
    <!-- shows steps -->
    <bread-crumb ref="breadCrumb" @setStep="stepChanged"></bread-crumb>
    <!-- shows regions selections -->
    <table-region-selection
      :step="step"
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
      step: 1
    };
  },
  methods: {
    stepChanged(v) {
      this.step = v;
    },
    changeStepValue(val) {
      this.$refs.breadCrumb.setStepValue(val);
    }
  }
};
</script>

<style scoped>
.toolbar {
  font-weight: 500;
  font-size: 17px;
  line-height: 44px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
}
</style>
