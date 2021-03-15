<template>
  <q-card class="my-card" flat>
    <q-card-section class="q-px-md row notosanskr-regular">
      <div
        class="item-container col-4"
        v-for="(item, i) of Object.keys(data)"
        :key="i"
      >
        <q-btn
          flat
          class="full-width full-height"
          :label="data[item].title"
          @click="itemSelected(data[item])"
          :text-color="selected && selected.title == data[item].title ? 'primary' : 'black'"
        ></q-btn>
      </div>
    </q-card-section>
    <button-bottom :modal="buttonBottom"></button-bottom>
  </q-card>
</template>

<script>
import ButtonBottom from "./ButtonBottom";
export default {
  components: {
    ButtonBottom
  },
  data() {
    return {
      // listFirst: listFirst,
      // listSecond: listSecond,
      // listThird: listThird,
      // listDisplayed: [],
      selected: null,
      buttonBottom: false
    };
  },
  props: {
    data: Array
  },
  mounted() {

  },
  methods: {
    itemSelected(value) {
      // this.buttonBottom = false;
      // if (this.activeStep.step == "three") this.buttonBottom = true;
      this.selected = value;
      this.$emit("select", value);
    }
  },
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
