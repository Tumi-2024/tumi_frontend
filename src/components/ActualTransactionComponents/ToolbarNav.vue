<template>
  <q-card
    flat
    square
    class="row justify-between items-center q-px-md"
    style="height: 60px"
  >
    <div class="row flex items-center justify-center">
      <div class="back-btn-border q-pr-sm q-mr-sm flex justify-center items-center content-center">
        <q-btn class="back-btn flex justify-center items-center content-center" flat>
          <q-icon name="img:icons/home-page-icon/search-result-icon/back-btn.svg" />
        </q-btn>
      </div>
      <div class="location-text q-mt-xs notosanskr-medium">
        동대문구 전농동
      </div>
    </div>
    <div>
      <q-btn flat padding="4px" :to="{ name: 'my_page' }">
        <q-icon size="24px">
          <img src="~assets/icons/ActualTransactionIcons/like.svg" alt="" />
        </q-icon>
      </q-btn>
      <q-btn flat padding="4px" :to="{name: 'home' }">
        <q-icon size="24px">
          <img src="~assets/icons/ActualTransactionIcons/share.svg" alt="" />
        </q-icon>
      </q-btn>
    </div>
  </q-card>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.helper {
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.9px;
  color: #707070;
}
.location-text {
  font-weight: 500;
  font-size: 21px;
  line-height: 30px;
  letter-spacing: -1.575px;
  color: #1a1a1a;
}

.back-btn-border ::after{
  content: '';
  position: absolute;
  width: 1px;
  height: 12px;
  right: -8px;
  margin: 1px auto;
  background: #DBDBDB;
}
</style>
