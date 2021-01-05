<template>
  <q-card flat>
    <q-card-section>
        <div class="heading-title">토지 매물정보</div>
    </q-card-section>

    <q-card-section>
      <div class="row">
        <q-btn flat class="col column items-center information-btn ">
          <q-icon name="delete" size="32px" />
          <div class="title">2,275㎡</div>
          <div class="sub-title">대지면적</div>
        </q-btn>

        <q-btn flat class="col column items-center information-btn ">
          <q-icon name="delete" size="32px" />
          <div class="title">2,275㎡</div>
          <div class="sub-title">대지면적</div>
        </q-btn>

        <q-btn flat class="col column items-center information-btn ">
          <q-icon name="delete" size="32px" />
          <div class="title">2,275㎡</div>
          <div class="sub-title">대지면적</div>
        </q-btn>

        <q-btn flat class="col column items-center information-btn ">
          <q-icon name="delete" size="32px" />
          <div class="title">2,275㎡</div>
          <div class="sub-title">대지면적</div>
        </q-btn>
      </div>

      <div class="row justify-center q-mt-sm">
        <div class="col-12">
          <q-btn color="primary" class="full-width bottom-btn" label="전화로 문의하기" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'land-for-sale-information'
}
</script>

<style lang="scss" scoped>
.heading-title {
  font-family:'notosanskr-medium';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  letter-spacing: -1.275px;
  color: #1A1A1A;
}

.information-btn {
  .title {
    font-family: 'notosanskr-medium';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    letter-spacing: -1.2px;
    color: #1A1A1A;
  }
  .sub-title {
    font-family: 'notosanskr-medium';
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
    /* identical to box height, or 154% */

    text-align: center;
    letter-spacing: -0.975px;

    /* Font/30 */

    color: #707070;
  }
}

.bottom-btn {
  height: 52px;
  border-radius: 12px;
  font-family: 'notosanskr-medium';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  text-align: center;
  letter-spacing: -1.25px;
  color: #FFFFFF;
}
</style>
