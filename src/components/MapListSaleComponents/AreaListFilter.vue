<template>
  <div style="display :flex; align-items: center;">
      <div class="scrolling-wrapper-flexbox notosanskr-medium row items-center">
        <q-btn
          v-for="(filter, i) of filters"
          :key="i"
          unelevated
          padding="0px"
          class="q-mr-xs q-px-md"
          :class="getColor(filter.type)"
        >
          {{ filter.label }}
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
      filters: [
        { label: "주택유형", type: 'houseType' },
        { label: "거래유형", type: 'pyeong' },
        { label: "매매가", type: 'sale' },
        { label: "전세가/보증금", type: 'charter' },
        { label: '매물 등록일자', type: 'date' }
      ]
    };
  },
  computed: {
    getColor() {
      return (type) => {
        switch (type) {
          case 'houseType':
            return 'text-white bg-primary'
          case 'pyeong':
            return 'text-white bg-green'
          case 'recommend':
            return 'text-white  bg-white'
          case 'redevelopment':
            return 'text-white  bg-white'
          case 'charter':
            return 'text-white bg-blue-grey'
          case 'sale':
            return 'text-white bg-blue'
          case 'date':
            return 'date text-white bg-black'
          default:
            return ''
        }
      }
    }
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
