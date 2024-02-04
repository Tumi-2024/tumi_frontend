<template>
  <q-card
    flat
    class="q-mx-md"
    style="background: #ffd8cc; border-radius: 8px; margin-top: 36px"
  >
    <q-card-section class="row justify-around items-center nanum-square">
      <div class="col">
        <q-btn
          padding="2px"
          class="full-width"
          flat
          :label="first ? first : '시도 선택'"
          :class="{ 'current-step': step >= 0 }"
          @click="setStep(0)"
        />
      </div>
      <q-icon name="keyboard_arrow_right" size="24px" />
      <div class="col">
        <q-btn
          padding="2px"
          class="full-width"
          flat
          :label="second ? second : '시군구 선택'"
          :class="{ 'current-step': step >= 1 }"
          @click="setStep(1)"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      step: 0
    };
  },
  props: {
    first: String,
    second: String
    // third: String,
  },
  methods: {
    setStep(number) {
      this.step = number;
      this.$emit("setStep", number);
    }
  }
};
</script>

<style scoped>
.current-step {
  color: #d32c00;
}
</style>
