<template>
  <div class="info-table">
    <div class="row table-row-heading">
      <div class="col table-row-label">
        계약일
      </div>
      <div class="col table-row-label">
        주소
      </div>
      <div class="col table-row-label">
        단가
      </div>
      <div class="col table-row-label">
        공시지가 비율
      </div>
    </div>

    <div v-for="list in 10" :key="list" class="row table-row-data">
      <div class="col table-row-value">
        2020.03.24
      </div>
      <div class="col table-row-value">
        전농동60-17
      </div>
      <div class="col table-row-value">
        <b>970만 / 평</b>
      </div>
      <div class="col table-row-value">
        140.2%
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.table-row-label {
  font-family: 'notosanskr-medium';
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 36px;
  text-align: center;
  letter-spacing: -0.98px;
  color: #1A1A1A;
}

.table-row-value {
  font-family: 'notosanskr-regular';
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 36px;
  /* identical to box height, or 277% */

  text-align: center;
  letter-spacing: -0.98px;

  /* Font/40 */

  color: #3A3A3A;
}

.table-row-heading {
  background-color: #F7F7F7;
  border-top: 1px solid #000;
}

.table-row-data {
  background-color: #fff;
  border-bottom: 1px solid #F7F7F7;
}
</style>
