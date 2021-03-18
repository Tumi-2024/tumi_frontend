<template>
  <q-card-section class="redevelop-area-section q-pa-none">
    <!-- Summary Info | 요약 정보  -->
    <information-summary v-if="isSummary" @hideSummary="isSummary = false" />
    <!-- Full Redevelopment Area Info 재개발 구역정보 -->
    <information-full
      ref="fullInfoDialog"
      @hide="setSummary"
    ></information-full>
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
      isSummary: true
    };
  },
  methods: {
    setSummary() {
      this.$emit("hide");
      this.isSummary = true;
    }
  },
  watch: {
    isSummary(value) {
      this.$refs.fullInfoDialog.toggleDialog(!value);
      !value && this.$emit("seamless-off");
    }
  }
};
</script>

<style lang="scss" scoped></style>
