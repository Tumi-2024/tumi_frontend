<template>
  <q-card-section
    class="sort-section row bg-positive q-pa-none notosanskr-regular"
  >
    <q-btn
      flat
      :class="{ 'text-primary': selected == '최신순' }"
      @click="setSelected('최신순')"
      >최신순</q-btn
    >
    <q-separator vertical />
    <q-btn
      flat
      :class="{ 'text-primary': selected == '추천순' }"
      @click="setSelected('추천순')"
      >추천순</q-btn
    >
    <q-separator vertical />
    <q-btn
      flat
      :class="{ 'text-primary': selected == '면적순' }"
      @click="setSelected('면적순')"
      >면적순</q-btn
    >
    <q-separator vertical />
    <q-btn
      flat
      :class="{ 'text-primary': selected == '가격순' }"
      @click="setSelected('가격순')"
      >가격순</q-btn
    >
  </q-card-section>
</template>

<script>
export default {
  data() {
    return {
      selected: "최신순"
    };
  },
  methods: {
    setSelected(sortby) {
      if (sortby === this.selected) {
        return;
      }
      this.selected = sortby;
      this.$emit("sortBy", this.selected);
    }
  }
};
</script>

<style lang="scss" scoped>
.sort-section {
  .q-btn {
    font-size: 14px;
    line-height: 44px;
    text-align: center;
    letter-spacing: -1.05px;
    color: #707070;
  }
  .q-separator {
    margin-top: 20px;
    height: 14px;
  }
  .see-more {
    font-size: 17px;
    line-height: 52px;
    text-align: center;
    letter-spacing: -1.275px;
    color: #3a3a3a;
  }
}
</style>
