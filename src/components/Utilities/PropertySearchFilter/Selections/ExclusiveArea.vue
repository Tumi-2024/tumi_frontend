<template>
  <q-card-section>
    <div
      class="title q-pa-none row justify-between items-center notosanskr-medium"
    >
      <div class="title row">
        <text-under-highlight text="전용면적"></text-under-highlight>
        <span class="notosanskr-regular q-ml-xs">(평)</span>
      </div>
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
        @click="changeValue(pyeong)"
      />
    </div>
  </q-card-section>
</template>

<script>
import TextUnderHighlight from "components/Utilities/TextUnderHighlight";

export default {
  components: {
    "text-under-highlight": TextUnderHighlight
  },
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
  },
  methods: {
    changeValue(val) {
      this.selected = val;
      this.$emit('select', val);
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
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
