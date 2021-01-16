<template>
  <div class="row bg-white notosanskr-regular" style="padding: 24px 16px 26px; margin-bottom: 8px">
    <div class="col-12 notosanskr-medium">
      <span style="font-size: 17px; letter-spacing: -1.275px; color: #1A1A1A; line-height: 26px;">
        재개발 정보
      </span>
    </div>
    <div class="col-12 table" style="padding-top: 20px;">
      <div class="row" v-for="(detail, index) in details" :key="detail.label" :index="index">
        <div class="col-4"><span class="label" :class="index == details.length-1 ? 'text-primary' : 'text-30'">{{ detail.label }}</span></div> 
        <div class="col-8"><span class="label text-50"><q-icon name="check" :color="detail.info === '-----' ? 'white': 'teal-12'"  />{{ detail.info }}</span></div> 
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

  .q-icon {
    margin-right: 7px;
  }
}

.text-30 {
  color: #707070;
}

.text-50 {
  color: #1A1A1A;
}
</style>