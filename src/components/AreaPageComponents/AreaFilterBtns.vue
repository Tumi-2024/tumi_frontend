<template>
  <q-card flat>
    <q-card-section class="row justify-between no-wrap">
      <q-btn
        unelevated
        outline
        color="primary"
        padding="8px"
        style="border-radius: 8px;"
        class="q-mr-sm"
      >
        <q-icon>
          <img src="~assets/icons/Filter.svg" />
        </q-icon>
      </q-btn>

      <div class="scrolling-wrapper-flexbox notosanskr-medium row">
        <q-btn unelevated class="q-mr-xs">매매,전세,월세</q-btn>
        <q-btn unelevated class="q-mr-xs">아파트,오피스텔,재개발...</q-btn>
        <q-btn unelevated class="q-mr-xs">아파트,오피스텔,재개발...</q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.q-btn {
  background: #ffffff;
  /* Line/Gray_20 */

  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 8px;

  font-weight: 500;
  font-size: 14px;
  line-height: 36px;
  text-align: center;
  letter-spacing: -1.05px;
  color: #1a1a1a;
}
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;

  .q-btn {
    flex: 0 0 auto;
  }
}
</style>
