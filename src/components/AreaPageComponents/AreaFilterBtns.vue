<template>
  <q-card flat>
    <q-card-section class="row justify-between no-wrap">
      <q-btn
        unelevated
        outline
        color="primary"
        padding="8px"
        style="border-radius: 8px; height: 36px"
        class="q-mr-sm"
      >
        <q-icon size="20px">
          <img src="~assets/icons/Filter.svg" />
        </q-icon>
      </q-btn>

      <div class="scrolling-wrapper-flexbox nanum-square row sc">
        <q-btn unelevated padding="0px" class="q-mr-xs q-px-md">
          매매,전세,월세
        </q-btn>
        <q-btn unelevated padding="0px" class="q-mr-xs q-px-md">
          아파트,오피스텔,재개발...
        </q-btn>
        <q-btn unelevated padding="0px" class="q-mr-xs q-px-md">
          아파트,오피스텔,재개발...
        </q-btn>
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
  padding-bottom: 10px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  .q-btn {
    line-height: 36px;
    flex: 0 0 auto;
  }
}
.scrolling-wrapper-flexbox::-webkit-scrollbar {
  display: none;
}
</style>
