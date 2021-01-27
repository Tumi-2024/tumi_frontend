<template>
  <q-card-section class="redevelop-area-section q-pa-none">
    <!-- Summary Info | 요약 정보  -->
    <information-summary
      v-if="showSummaryInfo"
      @showSummaryInfo="showSummaryInfo = false"
    />
    <!-- Full Redevelopment Area Info 재개발 구역정보 -->
    <information-full @hide="hide" v-else></information-full>
  </q-card-section>
</template>

<script>
import InformationSummary from "./InformationSummary";
import InformationFull from "./InformationFull";
export default {
  components: {
    "information-summary": InformationSummary,
    "information-full": InformationFull
  },
  data() {
    return {
      showSummaryInfo: true
    };
  },
  methods: {
    hide() {
      this.$emit("hide");
      this.showSummaryInfo = true;
    }
  },
  watch: {
    showSummaryInfo() {
      !this.showSummaryInfo && this.$emit("seamless-off");
    }
  }
};
</script>

<style lang="scss" scoped></style>
