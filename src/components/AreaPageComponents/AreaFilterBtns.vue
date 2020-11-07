<template>
  <q-card flat>
    <q-card-section class="row justify-between">
      <q-btn
        unelevated
        outline
        color="primary"
        padding="8px"
        style="border-radius: 8px;"
      >
        <q-icon>
          <img src="~assets/icons/Filter.svg" />
        </q-icon>
      </q-btn>

      <div class=" notosanskr-medium">
        <q-btn unelevated class="q-mr-sm">매매,전세,월세</q-btn>
        <q-btn unelevated>아파트,오피스텔,재개발...</q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {};
</script>

<style scoped>
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
</style>
