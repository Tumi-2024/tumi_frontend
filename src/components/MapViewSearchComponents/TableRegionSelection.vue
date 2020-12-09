<template>
  <q-card class="my-card" flat>
    <q-card-section class="q-px-md row notosanskr-regular">
      <div
        class="item-container col-4"
        v-for="(list, i) of listDisplayed"
        :key="i"
      >
        <q-btn flat class="full-width full-height" :label="list"></q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { listFirst, listSecond, listThird } from "./dummy-data-regions.js";
export default {
  data() {
    return {
      listFirst: listFirst,
      listSecond: listSecond,
      listThird: listThird,
      listDisplayed: []
    };
  },
  mounted() {
    this.listDisplayed = this.listFirst;
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
