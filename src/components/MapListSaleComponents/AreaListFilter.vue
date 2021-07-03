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
          :label="filter.label"
        >
          <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>New tab</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>New incognito tab</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Recent tabs</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>History</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        </q-btn>
      </div>
      <!-- <toolbar-filter /> -->
  </div>
</template>

<script>
import ToolbarFilter from './ToolbarFilter.vue';
export default {
  components: { ToolbarFilter },
  data() {
    return {
      filters: [
        { label: "주택유형", type: 'houseType' },
        { label: "평형", type: 'pyeong' },
        { label: "매매가", type: 'sale' },
        { label: "전월세가", type: 'charter' },
        { label: '매물등록일자', type: 'date' }
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
button .without-icon i {
  display: none
}
</style>
