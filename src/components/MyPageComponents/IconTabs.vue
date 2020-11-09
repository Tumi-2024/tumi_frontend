<template>
  <q-card-section class="full-width row q-pa-none q-px-md">
    <!-- icon tabs -->
    <div class="items col-3 row items-center">
      <q-btn flat ripple padding="0px" class="q-py-xs">
        <q-icon size="44px" class="col-12">
          <img src="~assets/icons/home-recently-viewed.svg" />
        </q-icon>
        <div class="item-label col-12 text-center notosanskr-medium">
          최근 본 매물
        </div>
      </q-btn>
    </div>

    <div class="items col-3 row items-center">
      <q-btn flat ripple padding="0px" class="q-py-xs">
        <q-icon size="44px" class="col-12">
          <img src="~assets/icons/area-interest.svg" />
        </q-icon>
        <div class="item-label col-12 text-center notosanskr-medium">
          관심지역
        </div></q-btn
      >
    </div>

    <div class="items col-3 row items-center">
      <q-btn flat ripple padding="0px" class="q-py-xs">
        <q-icon size="44px" class="col-12">
          <img src="~assets/icons/home-interest.svg" />
        </q-icon>
        <div class="item-label col-12 text-center notosanskr-medium">
          관심매물
        </div></q-btn
      >
    </div>

    <div class="items col-3 row items-center">
      <q-btn flat ripple padding="0px" class="q-py-xs">
        <q-icon size="44px" class="col-12">
          <img src="~assets/icons/contacted-property.svg" />
        </q-icon>
        <div class="item-label col-12 text-center notosanskr-medium">
          연락한 매물
        </div></q-btn
      >
    </div>
  </q-card-section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.items {
  padding-bottom: 28px;
  .item-label {
    padding-top: 14px;
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
    text-align: center;
    letter-spacing: -0.975px;
    color: #1a1a1a;
  }
}
</style>
