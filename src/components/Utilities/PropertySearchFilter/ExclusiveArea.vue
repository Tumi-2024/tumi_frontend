<template>
  <q-card-section class="q-mt-md q-pt-lg bg-white">
    <div class="title q-pa-none q-pt-sm notosanskr-medium">
      전용면적 <span class="notosanskr-regular">(평)</span>
      <q-btn
        flat
        class="float-right q-ma-none q-pa-none"
        color="white"
        padding="0px 10px"
        text-color="secondary"
        label="66m~165m"
      />
    </div>

    <div class="selection row q-my-lg">
      <q-btn
        v-for="(pyeong, i) of pyeongs"
        :key="i"
        flat
        class="col-3 notosanskr-medium"
        :class="{ selected: selected === pyeong && selected != '' }"
        :label="pyeong"
        @click="selected = pyeong"
      />
    </div>
  </q-card-section>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
      pyeongs: [
        "10평대",
        "20평대",
        "30평대",
        "40평대",
        "50평대",
        "60평대",
        "70평대",
        "80평대"
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -1.2px; /* Font/40 */
  color: #3a3a3a;
  span {
    color: #a0a0a0;
  }
}
.selection {
  font-size: 15px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -1.125px;
  color: #1a1a1a;
  border: 1px solid rgba(128, 128, 128, 0.247);
  border-radius: 8px;
  .q-btn {
    border: 1px solid rgba(128, 128, 128, 0.171);
    border-top: none;
    height: 44px;
    &.selected {
      border: 2px solid #fc5b2e;
      border-radius: 8px;
      font-weight: 500;
      font-size: 15px;
      line-height: 24px;
      text-align: center;
      letter-spacing: -1.125px;
      color: #ff5100;
    }
  }
}
</style>
