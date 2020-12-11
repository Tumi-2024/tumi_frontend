<template>
  <q-card
    flat
    class="q-mx-md"
    style="background: #FFD8CC; border-radius: 8px; margin-top: 36px"
  >
    <q-card-section class="row justify-around items-center notosanskr-medium">
      <div class="col">
        <q-btn
          padding="2px"
          class="full-width"
          flat
          :label="selections.one ? selections.one : '시도 선택'"
          :class="{ 'current-step': step >= 1 }"
          @click="setStep(1)"
        />
      </div>
      <q-icon name="keyboard_arrow_right" size="24px" />
      <div class="col">
        <q-btn
          padding="2px"
          class="full-width"
          flat
          :label="selections.two ? selections.two : '시군구 선택'"
          :class="{ 'current-step': step >= 2 }"
          @click="setStep(2)"
        />
      </div>
      <q-icon name="keyboard_arrow_right" size="24px" />
      <div class="col">
        <q-btn
          padding="2px"
          class="full-width"
          flat
          :label="selections.three ? selections.three : '읍면동 선택'"
          :class="{ 'current-step': step >= 3 }"
          @click="setStep(3)"
        />
      </div>
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
      let step;
      if (number == 1) step = "one";
      if (number == 2) step = "two";
      if (number == 3) step = "three";
      this.$emit("setStep", { step, value: this.selections[step] });
      this.step = number;
    },
    setStepValue({ step, value }) {
      switch (step) {
        case "one":
          this.selections.one = value;
          break;
        case "two":
          this.selections.two = value;
          break;
        case "three":
          this.selections.three = value;
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style scoped>
.current-step {
  color: #d32c00;
}
</style>
