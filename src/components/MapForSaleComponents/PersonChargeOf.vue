<template>
    <q-card class="bg-white notosanskr-medium">
    <q-card-section class="column q-pb-none justify-between">
      <div class="title-heading col-6">
        담당자
      </div>

    </q-card-section>
    <q-card-section class="row justify-between">
      <div class="text col-6 flex">
        <span>담당자:&nbsp;&nbsp;&nbsp;</span>
        <span>홍길동</span>
      </div>
       <div class="text col-6 flex">
        <span>연락처:&nbsp;&nbsp;&nbsp;</span>
        <a href='tel:01000000000'>010-0000-0000</a>
      </div>
    </q-card-section>
    </q-card>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.title-heading {
  font-size: 17px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
  line-height: 26px;
}

.text {
  letter-spacing: -1.575px;
  color: #3a3a3a;
  font-size: 21px;
  line-height: 32px;
  margin-top: 4px;
}
</style>
