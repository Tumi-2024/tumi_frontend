<template>
  <q-card class="bg-white notosanskr-medium">
    <q-card-section class="row q-pb-none justify-between">
      <div class="title-heading col-6">
        실거래가 히스토리
      </div>
    </q-card-section>
    <!-- recent hitory -->
    <q-card-section
      class="bg-white notosanskr-regular"
    >
       <q-tabs
        v-model="activeTab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab
          v-for="tab in tabs"
          :key="tab.level"
          :name="tab.level"
          :label="tab.label"
        />
      </q-tabs>
      <q-separator />
      <div class="flex justify-end items-center" style="margin-top: 20px; margin-bottom: 8px;">
        <div style="background-color: #FF5100; width: 12px; height: 8px; opacity: 0.2; border-radius: 2px;"/>
        <div style="margin-left:5px">매매</div>
        <div style="background-color: #00A4AA; width: 12px; height: 8px; margin-left:7px; opacity: 0.2; border-radius: 2px;"/>
        <div style="margin-left:5px">전세</div>
        <div style="border: 1px solid #D5D5D5; width: 12px; height: 8px; margin-left:7px; border-radius: 2px;"/>
        <div style="margin-left:5px">월세</div>
      </div>
      <q-tab-panels v-model="activeTab" animated>
        <q-tab-panel class="q-pa-none" v-for="tab in tabs" :key="tab.level" :name="tab.level">
          <q-list separator style="border-top: 1px solid #1A1A1A;">
            <q-item class="item header">
              <div>계약일</div>
              <div>거래</div>
              <div>가격</div>
              <div>층수</div>
            </q-item>
            <q-virtual-scroll
              style="min-height: 220px;"
              :items="getTransactions"
              separator
            >
            <template v-slot="{ item, index }">
              <q-item class="item" :style="{backgroundColor: isSale(item) ? 'rgba(255, 81, 0, 0.05)': 'rgba(0, 164, 170, 0.05)'}" :key="index">
                <div>
                  {{
                    item.text_month.slice(0,4)
                    + '.' + item.text_month.slice(4,6)
                    + '.' + (item.text_day.length === 1 ? '0' + item.text_day : item.text_day)
                  }}
                  </div>
                  <div class="text-weight-medium" :style="{color: isSale(item) ? 'rgba(255, 81, 0)': 'rgba(0, 164, 170)'}"> {{tabs.find(tab => tab.level === item.type).label}} </div>
                  <div class="text-weight-bold"> {{toMoneyString(item.price)}} </div>
                  <div> {{item.text_floor.replace(/null/i, '-')}}층</div>
              </q-item>
            </template>
            </q-virtual-scroll>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>

  </q-card>
</template>
<script>
import { toMoneyString } from 'src/utils';

export default {
  components: {
    // TextUnderHighlight
  },
  props: {
    item: Array
  },
  data() {
    return {
      areaSelected: "",
      activeTab: "all",
      tabs: [
        { level: "all", label: "전체" },
        { level: "SALE", label: "매매" },
        { level: "RENT", label: "전세" }
        // { level: "monthly", label: "월세" }
      ],
      transactions: []
    };
  },
  computed: {
    getTransactions() {
      if (this.activeTab === 'all') {
        return this.item
      }
      return this.item.filter(transaction => transaction.type === this.activeTab)
    },
    isRent() {
      return (item) => item.type === this.tabs[2].level
    },
    isSale() {
      return (item) => item.type === this.tabs[1].level
    }
  },
  methods: {
    toMoneyString(value, add) {
      return toMoneyString(value, add)
    }
  }
};
</script>
<style lang="scss" scoped>
.title-heading {
  font-size: 17px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
  line-height: 26px;
}
.unit-heading {
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  text-align: right;
  letter-spacing: -0.9px;
  color: #909090;
}

.text-30 {
  color: #707070;
}

.item {
  display: flex;
  align-items: center;
  &.header {
  background-color: #F7F7F7;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12)
  }
  div {
    display: flex;
    flex: 1;
    justify-content: center;
  }
}
</style>
