<template>
  <q-btn
    padding="20px 16px"
    class="full-width"
    flat
    @click="$emit('showSummaryInfo')"
  >
    <div class="col-12 column text-left">
      <div>
        <q-badge
          outline
          color="primary"
          class="badge-type notosanskr-medium"
          label="공공주택지구"
        />
      </div>
      <div class="info q-mt-sm notosanskr-medium">
        <div class="head">
          <q-badge outline class="q-mr-xs" color="grey-6">
            <q-icon size="14px">
              <img src="~assets/icons/info-i.svg" />
            </q-icon>
          </q-badge>
          서울영등포 공공주택지구
        </div>
        <div class="properties q-pt-xs notosanskr-regular">
          <div class="row q-mt-xs">
            <div class="title q-pr-xs">·위치 :</div>
            <div class="content">
              서울특별시 영등포구 영등포동 일원
            </div>
          </div>
          <div class="row q-mt-xs">
            <div class="title q-pr-xs">·면적 :</div>
            <div class="content">
              1,366㎡
            </div>
          </div>
          <div class="row q-mt-xs">
            <div class="title q-pr-xs">·사업단계 :</div>
            <div class="content">
              사업시행인가
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-btn>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.badge-type {
  font-weight: bold;
  font-size: 12px;
  line-height: 24px;
  letter-spacing: -0.9px;
  color: #ff5100;
  border: #ff5100 1px solid;
  padding: 0 4px;
}
.info {
  .head {
    font-weight: 500;
    font-size: 16px;
    letter-spacing: -1.2px;
  }
  .properties {
    font-size: 13px;
    line-height: 20px;
    letter-spacing: -0.97px;
    .title {
      color: #707070;
    }
    .content {
      color: #1a1a1a;
    }
  }
}
</style>
