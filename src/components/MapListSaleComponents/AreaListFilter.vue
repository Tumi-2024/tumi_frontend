<template>
  <div style="display :flex; align-items: center;">
      <div class="scrolling-wrapper-flexbox notosanskr-medium row items-center">
        <q-btn
          v-for="(filter, i) of filters"
          :key="i"
          unelevated
          padding="0px"
          class="q-mr-xs q-px-md"
        >
          {{ filter }}
        </q-btn>
      </div>
      <q-btn
        unelevated
        outline
        color="primary"
        padding="8px"
        style="border-radius: 8px; height: 36px;"
        class="q-mr-sm"
      >
        <q-icon size="20px">
          <img src="~assets/icons/Filter.svg" />
        </q-icon>
      </q-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filters: ["주택유형", "거래유형", "매매가", "전세가/보증금"]
    };
  }
};
</script>

<style lang="scss" scoped>
.q-btn {
  background: #ffffff;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 36px;
  text-align: center;
  letter-spacing: -1.05px;
  color: #1a1a1a;
}
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  .q-btn {
    line-height: 36px;
    flex: 0 0 auto;
  }
}
.scrolling-wrapper-flexbox::-webkit-scrollbar {
  display: none;
}
</style>
