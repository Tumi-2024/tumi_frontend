<template>
  <div v-if="isVisible()">
    <q-separator class="q-my-lg" />

    <div class="title q-mb-lg notosanskr-medium">
      가로주택 세부유형 <span>(중복 선택 가능)</span>
    </div>

    <div class="selection row q-mt-lg">
      <q-btn
        v-for="(type, i) of types"
        :key="i"
        flat
        class="col-4 notosanskr-medium"
        :class="{ selected: selected === type && selected != '' }"
        :label="type"
        @click="select(type)"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "전체",
      types: [
        "전체",
        "상가",
        "멸실 입주권",
        "연립다세대",
        "단독다가구",
        "토지",
        "뚜껑매물",
        "1+1매물",
        ""
      ]
    };
  },
  props: {
    selectedCategory: Array
  },
  mounted() {
    this.selected = this.$store.state.search.typeHouseDetail;
  },
  methods: {
    select(type) {
      this.selected = type;
      this.$emit("select", type);
    },
    isVisible() {
      return (
        this.selectedCategory === "재개발" ||
        this.selectedCategory === "가로주택"
      );
    }
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
