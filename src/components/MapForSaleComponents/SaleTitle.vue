<template>
  <q-card flat>
    <q-card-section>
      <div class="row q-gutter-xs justify-start">
        <q-badge class="bread-crumbs-badge" color="primary">
            토지
        </q-badge>
        <q-badge class="bread-crumbs-badge text-grey-7" outline color="grey-6">
          <q-icon>
            <img src="~assets/icons/shovel.svg" alt="">
          </q-icon>
          재개발
        </q-badge>
      </div>

      <div class="q-mt-md">
        <p class="area-name">한남 3구역</p>
      </div>

      <div class="q-mt-md">
        <p class="price-name"><span>매매</span> 120억 8천만</p>
      </div>

      <div class="row q-pa-md initial-investment-container items-center justify-start content-center">
        <q-icon>
          <img src="~assets/icons/coins.svg" alt="">
        </q-icon>

        <div class="q-ml-md title">초기투자금</div>

        <q-separator class="q-ml-sm q-mr-sm" vertical inset style="height: 16px" />

        <div class="price">100억 5천만</div>
      </div>
    </q-card-section>
    <q-separator color="grey-3" />
    <q-card-section class="no-padding">
      <div class="q-ml-md bottom-title">“상업단지, 돈되는 땅”</div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'sale-title'
}
</script>

<style lang="scss" scoped>
.bread-crumbs-badge {
  border-radius: 4px;
  font-family:'notosanskr-medium';
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.9px;
  color: #FFFFFF;
  padding: 5px;
  height: 24px;
  min-width: 30px;
}

.area-name {
  font-family:'notosanskr-medium';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -1.2px;
  color: #707070;
}

.price-name {
  font-family: 'notosanskr-medium';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -2.7px;
  span {
    color: #00A4AA
  }
}

.initial-investment-container {
  height: 48px;
  left: 0px;
  top: 0px;
  background: #F7F7F7;
  border-radius: 8px;

  .title {
    font-family: 'notosanskr-medium';
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 36px;
    letter-spacing: -1.275px;
    color: #707070;
  }

  .price {
      font-family: 'notosanskr-medium';
      font-style: normal;
      font-weight: 500;
      font-size: 17px;
      line-height: 36px;
      letter-spacing: -1.275px;
      color: #1A1A1A;
    }
}
.bottom-title {
  font-family: 'notosanskr-regular';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 60px;
  letter-spacing: -1.2px;
  color: #1A1A1A;
  height: 60px;
}
</style>
