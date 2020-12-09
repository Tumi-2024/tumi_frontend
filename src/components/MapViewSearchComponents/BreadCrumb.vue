<template>
  <q-card
    flat
    class="q-mx-md"
    style="background: #FFD8CC; border-radius: 8px; margin-top: 36px"
  >
    <q-card-section class="row justify-around items-center notosanskr-medium">
      <q-btn
        padding="2px"
        flat
        :label="selections.one ? selections.one : '시도 선택'"
        :class="{ 'current-step': step >= 1 }"
        @click="setStep(1)"
      />
      <q-icon name="keyboard_arrow_right" size="24px" />
      <q-btn
        padding="2px"
        flat
        :label="selections.two ? selections.two : '시군구 선택'"
        :class="{ 'current-step': step >= 2 }"
        @click="setStep(2)"
      />
      <q-icon name="keyboard_arrow_right" size="24px" />
      <q-btn
        padding="2px"
        flat
        :label="selections.three ? selections.three : '읍면동 선택'"
        :class="{ 'current-step': step >= 3 }"
        @click="setStep(3)"
      />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      selections: {
        one: "",
        two: "",
        three: ""
      }
    };
  },
  methods: {
    setStep(number) {
      this.$emit("setStep", number);
      this.step = number;
    }
  }
};
</script>

<style scoped>
.current-step {
  color: #d32c00;
}
</style>
