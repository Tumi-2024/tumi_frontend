<template>
<div class="row bg-white notosanskr-medium" style="padding: 24px 16px 36px; margin-bottom: 8px">
  <div class="col-12" style="margin-bottom: 16px;">
    <span style="font-size: 17px; letter-spacing: -1.275px; color: #1A1A1A; line-height: 26px;">
      관리비
    </span>
  </div>
  <div class="col-12">
    <div class="admin-cost-card"> 
      <div class="row">
        <div class="col-4" v-for="item in cost" :key="item.label">
          <div class="full-width text-center info">{{ item.info }}</div>
          <div class="full-width text-center flex center">
            <div style="margin: 0 auto">
              <q-icon :name="`img:icons/weather/${item.icon}.svg`" size="24px"/>
              <span class="label">{{ item.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: {
    cost: Object
  }
}
</script>
<style lang="scss" scoped>
.admin-cost-card {
  border: 1px solid #E8E8E8;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 0px 1px rgba(0, 0, 0, 0.04);
  border-radius: 12px;
  padding: 20px 0;

  .info {
    font-size: 17px;
    line-height: 26px;
    letter-spacing: -1.275px;
    margin-bottom: 8px;
    color: #1A1A1A;
  }

  .label {
    font-size: 13px;
    line-height: 24px;
    letter-spacing: -0.98px;
    color: #707070;
  }
}
</style>