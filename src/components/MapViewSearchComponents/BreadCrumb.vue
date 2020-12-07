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
        label="서울시"
        :class="{ 'current-step': step >= 1 }"
        @click="step = 1"
      />
      <q-icon name="keyboard_arrow_right" size="24px" />
      <q-btn
        padding="2px"
        flat
        label="시군구 선택"
        :class="{ 'current-step': step >= 2 }"
        @click="step = 2"
      />
      <q-icon name="keyboard_arrow_right" size="24px" />
      <q-btn
        padding="2px"
        flat
        label="읍면동 선택"
        :class="{ 'current-step': step >= 3 }"
        @click="step = 3"
      />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data() {
    return {
      step: 1
    };
  }
};
</script>

<style scoped>
.current-step {
  color: #d32c00;
}
</style>
