<template>
  <q-card class="my-card" flat>
    <q-card-section class="q-px-md row notosanskr-regular">
      <div
        class="item-container col-4"
        v-for="(list, i) of listDisplayed"
        :key="i"
      >
        <q-btn
          flat
          class="full-width full-height"
          :label="list"
          @click="itemSelected(list)"
          :text-color="activeStep.value == list ? 'primary' : 'black'"
        ></q-btn>
      </div>
    </q-card-section>
    <button-bottom :modal="buttonBottom"></button-bottom>
  </q-card>
</template>

<script>
import { listFirst, listSecond, listThird } from "./dummy-data-regions.js";
import ButtonBottom from "./ButtonBottom";
export default {
  components: {
    ButtonBottom
  },
  data() {
    return {
      listFirst: listFirst,
      listSecond: listSecond,
      listThird: listThird,
      listDisplayed: [],
      buttonBottom: false
    };
  },
  props: {
    activeStep: Object
  },
  mounted() {
    this.listDisplayed = this.listFirst;
  },
  methods: {
    itemSelected(value) {
      this.buttonBottom = false;
      if (this.activeStep.step == "three") this.buttonBottom = true;
      this.$emit("changeStepValue", { step: this.activeStep.step, value });
    }
  },
  watch: {
    activeStep(newValue) {
      switch (newValue.step) {
        case "one":
          this.listDisplayed = this.listFirst;
          break;
        case "two":
          this.listDisplayed = this.listSecond;
          break;
        case "three":
          this.listDisplayed = this.listThird;
          break;
        default:
          this.listDisplayed = this.listFirst;
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
q-btn {
  font-size: 16px;
  line-height: 52px;
  text-align: center;
  letter-spacing: -1.2px;
  color: #1a1a1a;
}
.item-container {
  min-height: 52px;
  border: 1px solid rgba(86, 61, 124, 0.2);
}
</style>
