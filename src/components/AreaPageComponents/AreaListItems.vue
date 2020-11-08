<template>
  <q-card flat class="q-mt-sm">
    <q-card-section class=" notosanskr-medium">
      관심지역 매물 <span class="text-primary">320</span>개
    </q-card-section>
    <q-card-section
      class="sort-section row bg-positive q-pa-none notosanskr-regular"
    >
      <q-btn flat class="text-primary">최신순</q-btn>
      <q-separator vertical />
      <q-btn flat>추천순</q-btn>
      <q-separator vertical />
      <q-btn flat>면적순</q-btn>
      <q-separator vertical />
      <q-btn flat>가격순</q-btn>
    </q-card-section>
    <q-card-section class="list-items">
      <q-item>
        items
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.sort-section {
  .q-btn {
    font-size: 14px;
    line-height: 44px;
    text-align: center;
    letter-spacing: -1.05px;
    color: #707070;
  }
  .q-separator {
    margin-top: 20px;
    height: 14px;
  }
}
</style>
