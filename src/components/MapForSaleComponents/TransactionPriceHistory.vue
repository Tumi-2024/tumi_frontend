<template>
  <q-card flat class="bg-white">
    <q-card-section class="q-pb-none justify-between">
      <div class="title-heading nanum-square">실거래가 히스토리</div>
      <q-tabs
        v-model="tab"
        align="justify"
        class="tabs bg-white nanum-square"
        :breakpoint="0"
        indicator-color="primary"
        active-color="primary"
      >
        <q-tab name="all" label="전체" />
        <q-tab name="trading" label="매매" />
        <q-tab name="charter" label="전세" />
        <q-tab name="monthly" label="월세" />
      </q-tabs>
      <div class="reference notosanskr-regular">
        <div class="box-colors box-primary"></div>
        <span>매매</span>
        <div class="box-colors box-secondary"></div>
        <span>전세</span>
        <div class="box-colors box-white"></div>
        <span>월세</span>
      </div>

      <div class="transaction-table notosanskr-regular">
        <section class="header row">
          <div class="col">계약일</div>
          <div class="col">거래</div>
          <div class="col">가격</div>
          <div class="col">층수</div>
        </section>

        <section
          v-for="(item, i) of transactions"
          :key="i"
          class="item row"
          :class="{
            'box-primary': item.deal === '매매',
            'box-secondary': item.deal === '전세'
          }"
        >
          <div class="date col row justify-center">
            {{ item.date }}
          </div>
          <div
            class="deal col row justify-center"
            :class="{
              'text-primary': item.deal === '매매',
              'text-secondary': item.deal === '전세'
            }"
          >
            {{ item.deal }}
          </div>
          <div class="price col row justify-center nanum-square">
            {{ item.price }}
          </div>
          <div class="number-floors col row justify-center">
            {{ item.numberFloors }}
          </div>
        </section>
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  data() {
    return {
      tab: "all"
    };
  },
  props: {
    transactions: {
      type: Array,
      default: () => ({
        date: "",
        deal: "",
        price: "",
        numberFloors: ""
      })
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
  margin-bottom: 16px;
}
.tabs {
  font-weight: 500;
  font-size: 16px;
  line-height: 44px;
  text-align: center;
  letter-spacing: -1.125px;
  color: #707070;
  .q-tab {
    border-bottom: #e8e8e8 solid 3px;
  }
}
.reference {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  padding: 20px 0 8px 0;

  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.9px;

  border-bottom: 1px solid #1a1a1a;
  color: #707070;
  .box-colors {
    width: 12px;
    height: 8px;
    margin: auto 2px auto 8px;
  }
}
.box-primary {
  background: #ff51001e;
}
.box-secondary {
  background-color: #00a4aa34;
}
.box-white {
  border: 1px solid #d5d5d5;
  box-sizing: border-box;
  border-radius: 2px;
}
.transaction-table {
  section.header {
    background: #f7f7f7;
    font-size: 13px;
    line-height: 36px;
    text-align: center;
    letter-spacing: -0.98px;
    color: #1a1a1a;
  }
  section.item {
    font-size: 13px;
    line-height: 36px;
    text-align: center;
    letter-spacing: -0.98px;
    color: #1a1a1a;

    border: 1px solid #e8e8e8;
    border-left: none;
    border-right: none;
  }
}
</style>
