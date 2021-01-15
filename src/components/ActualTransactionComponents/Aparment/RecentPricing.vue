<template>
  <div class="row bg-white notosanskr-medium">
    <div class="col-12">
      <div class="row" style="padding: 24px 16px 16px;">
        <div class="col-6">
          <span style="font-size: 17px; letter-spacing: -1.275px; color: #1A1A1A; line-height: 26px;">
            최근 실거래가
          </span>
        </div>
        <div class="col-6">
          <q-select dense outlined v-model="model" :options="options" label="35평" color="primary" label-color="primary" class="custom-option" style=""/>
        </div>
      </div>
      <!-- recent pricing -->
      <div class="row" style="padding: 0 16px 20px;">
        <div class="col-12">
          <div class="w-100 recent-pricing">
            <div class="row">
              <div class="col">
                <q-badge outline class="text-primary bg-white q-mr-sm">
                  매매가
                </q-badge>
                <q-badge outline class="text-grey bg-white q-mr-sm">
                  2020년 06월
                </q-badge>
                <div class="price">
                  <span>14억 5천만</span>
                </div>
              </div>
              <q-separator vertical style="margin: 0 20px"/>
              <div class="col">
                <q-badge outline class="text-teal bg-white q-mr-sm">
                  전세가
                </q-badge>
                <q-badge outline class="text-grey bg-white q-mr-sm">
                  2020년 03월
                </q-badge>
                <div class="price">
                  <span>
                    10억 2,580만
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row bg-white notosanskr-regular" style="padding: 0 16px 2px">
        <div class="col-12 table" style="padding-top: 20px; border-top: 1px dashed #E8E8E8;">
          <div class="row" v-for="detail in extra_details" :key="detail.label">
            <div class="col-4"><span class="label text-30">{{ detail.label }}</span></div> 
            <div class="col-8"><span class="label text-50">{{ detail.info }}</span></div> 
          </div>
        </div>
      </div>
      <div class="row bg-white notosanskr-regular" style="padding: 0 16px 6px;">
        <div class="col-12">
          <div class="float-right">단위(만)</div>
        </div>
      </div>
      <div class="row bg-white notosanskr-medium" style="padding: 6px 16px 36px;">
        <div class="col-12 unit-table">
          <div class="row notosanskr-regular">
            <div class="col-3">구분</div>
            <div class="col-3">
              <span class="underline-teal">
              하위평균가
              </span>
            </div>
            <div class="col-3">일반평균가</div>
            <div class="col-3">
              <span class="underline-primary"> 
                상위평균가
              </span>
            </div>
          </div>
          <div class="row">
            <div class="col-3">매매가</div>
            <div class="col-3">13억 8,250만</div>
            <div class="col-3">14억 1,750만</div>
            <div class="col-3">15억 1,000만</div>
          </div>
          <div class="row">
            <div class="col-3">전세가</div>
            <div class="col-3">10억 4,520만</div>
            <div class="col-3">10억 9,500만</div>
            <div class="col-3">11억 9,500만</div>
          </div>
          <div class="row">
            <div class="col-3">월세가</div>
            <div class="col">
              천만 <span class="text-30 notosanskr-regular">보증금 / </span>115~120만 <span class="text-30 notosanskr-regular">월세</span>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>

.custom-option {
  width: 72px; 
  font-size: 14px; 
  letter-spacing: -1.05px; 
  float: right;

  .q-field__marginal > i.q-select__dropdown-icon.q-icon {
    font-size: 16px !important;
  }

  .q-field--dense .q-field__append {
    padding: 0 !important;
  }
}

.recent-pricing {
  border-radius: 8px; 
  background: #F7F7F7; 
  padding: 20px 16px;

  .price {
    letter-spacing: -1.575px;
    color: #3A3A3A;
    font-size: 21px;
    line-height: 32px;
    margin-top: 4px;
  }

  
  .q-badge {
    margin-right: 4px;
    line-height: 20px;
    font-size: 12px;
    padding: 0 4px;
  }
}

.unit-table {
  font-size: 13px;
  line-height: 22px;
  letter-spacing: -1.05px;
  border-bottom: 1px solid #E8E8E8;
  border-top: 1px solid #1A1A1A;

  div:nth-child(1) {
    font-weight: 400;
    font-size: 14px;
  }

  .row div:nth-child(1) {
    color: #707070;
    background: #F7F7F7;
  }
  .col-3 {
    padding: 10px 0;
    text-align: center;
    border-bottom: 1px solid #E8E8E8;
  }

  .col-3:nth-child(3) {
    border-left: 1px solid #E8E8E8;
    border-right: 1px solid #E8E8E8;
  }

  .col {
    padding: 10px 12px;
  }

  .underline-teal {
    background: linear-gradient(to bottom, #ffffff 0%, #ffffff 50%, rgba(11, 205, 199, .3) 50%, rgba(11, 205, 199, .3) 100%)
  }

  .underline-primary {
    background: linear-gradient(to bottom, #ffffff 0%, #ffffff 50%, rgba(255, 81, 0, .3) 50%, rgba(255, 81, 0, .3) 100%);
  }
}

.text-30 {
  color: #707070;
}
</style>