<template>
  <div class="row bg-muted">
    <div class="col-12">
      <div class="row bg-white" style="border-bottom: 1px solid #E8E8E8; padding: 24px 16px 20px;">
        <div class="col-12" style="margin-bottom: 24px;">
          <span style="font-size: 17px; letter-spacing: -1.275px; color: #1A1A1A; line-height: 26px;">
            매물정보
          </span>
        </div>
        <div class="col-3">
          <q-icon :name="`img:icons/actual-transaction/area.svg`" size="32px" class="full-width"/>
          <div class="text-center info">
            <span>130㎡</span>
          </div>
          <div class="text-center info-label">
            <span>전용면적</span>
          </div>
        </div>
        <div class="col-3">
          <q-icon :name="`img:icons/actual-transaction/direction.svg`" size="32px" class="full-width"/>
          <div class="text-center info">
            <span>남서향</span>
          </div>
          <div class="text-center info-label">
            <span>방향</span>
          </div>
        </div>
        <div class="col-3">
          <q-icon :name="`img:icons/actual-transaction/floors.svg`" size="32px" class="full-width"/>
          <div class="text-center info">
            <span>고층</span>
          </div>
          <div class="text-center info-label">
            <span>층수</span>
          </div>
        </div>
        <div class="col-3">
          <q-icon :name="`img:icons/actual-transaction/station.svg`" size="32px" class="full-width"/>
          <div class="text-center info">
            <span>서초역</span>
          </div>
          <div class="text-center info-label">
            <span>역세권</span>
          </div>
        </div>
        <div class="col-12" style="border-top: 1px dashed #E8E8E8; margin: 16px 0"></div>
        <div class="col-3">
          <q-icon :name="`img:icons/actual-transaction/appraiser.svg`" size="32px" class="full-width"/>
          <div class="text-center info">
            <span>-----</span>
          </div>
          <div class="text-center info-label">
            <span>감정가</span>
          </div>
        </div>
        <div class="col-3">
          <q-icon :name="`img:icons/actual-transaction/privilege.svg`" size="32px" class="full-width"/>
          <div class="text-center info">
            <span>-----</span>
          </div>
          <div class="text-center info-label">
            <span>권리가</span>
          </div>
        </div>
        <div class="col-3">
          <q-icon :name="`img:icons/actual-transaction/premium_price.svg`" size="32px" class="full-width"/>
          <div class="text-center info">
            <span>1억</span>
          </div>
          <div class="text-center info-label">
            <span>프리미엄가</span>
          </div>
        </div>
        <div class="col-3">
          <q-icon :name="`img:icons/actual-transaction/progress_stage.svg`" size="32px" class="full-width"/>
          <div class="text-center info">
            <span>준공인가</span>
          </div>
          <div class="text-center info-label">
            <span>진행단계</span>
          </div>
        </div>
      </div>
      <div class="row bg-white notosanskr-regular" style="padding: 20px 16px 26px; margin-bottom: 8px;">
        <div class="col-12 table">
          <div class="row" v-for="detail in details" :key="detail.label">
            <div class="col-4"><span class="label info-label">{{ detail.label }}</span></div> 
            <div class="col-8"><span class="label info">{{ detail.info }}</span></div> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    details: Array
  }
}
</script>
<style lang="scss" scoped>
.table {
  font-size: 14px;
  line-height: 22px;

  .label {
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -1.05px;
  }

  .row {
    margin-bottom: 10px;
  }
}

.info-label {
  font-size: 13px;
  line-height: 20px;
  letter-spacing: -0.975px;
  color: #707070;
}

.info {
  color: #1A1A1A;
  margin-bottom: 4px;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -1.2px;
}

.q-icon {
  margin-bottom: 8px;
}
</style>