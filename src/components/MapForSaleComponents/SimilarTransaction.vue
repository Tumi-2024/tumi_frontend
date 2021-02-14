<template>
  <q-card flat class="my-card" v-if="lists">
    <q-card-section class="heading-title notosanskr-medium">
      인근지역 유사거래 사례
    </q-card-section>
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

      <div v-for="(list, i) of lists" :key="i" class="row table-row-data">
        <div class="col table-row-value">
          {{ list.date }}
        </div>
        <div class="col table-row-value">
          {{ list.address }}
        </div>
        <div class="col table-row-value">
          <b>{{ list.unitPrice }}</b>
        </div>
        <div class="col table-row-value">
          {{ list.landPriceRatio }}
        </div>
      </div>
      <!-- extra empty  -->
      <div class="row table-row-data">
        <div class="col table-row-value q-py-md"></div>
      </div>
    </div>
  </q-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    lists: Array,
    default: () => [
      {
        date: "",
        address: "",
        unitPrice: "",
        landPriceRatio: ""
      }
    ]
  }
};
</script>

<style scoped>
.heading-title {
  font-size: 17px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
  line-height: 26px;
}
.table-row-label {
  font-family: "notosanskr-medium";
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 36px;
  text-align: center;
  letter-spacing: -0.98px;
  color: #1a1a1a;
}

.table-row-value {
  font-family: "notosanskr-regular";
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 36px;
  /* identical to box height, or 277% */

  text-align: center;
  letter-spacing: -0.98px;

  /* Font/40 */

  color: #3a3a3a;
}

.table-row-heading {
  background-color: #f7f7f7;
  border-top: 1px solid #000;
}

.table-row-data {
  background-color: #fff;
  border-bottom: 1px solid #f7f7f7;
}
</style>
