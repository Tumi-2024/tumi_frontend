<template>
  <q-card>
    <q-card-section class="q-pa-md bg-white">
      <span class="heading-title"> 투자포인트 </span>
      <section class="progress-section bg-white">
        <section
          class="info notosanskr-regular"
          v-html="item.description_investment"
        ></section>
      </section>
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  components: {},
  props: {
    item: {
      type: Array | Object,
      require: false,
      default: () => {
        return [];
      }
      // approvalPromotionCommittee: {
      //   type: String,
      //   default: ""
      // },
      // designationMaintenanceArea: {
      //   type: String,
      //   default: ""
      // },
      // associationEstablishment: {
      //   type: String,
      //   default: ""
      // },
      // constructorDate: {
      //   type: String,
      //   default: ""
      // },
      // projectImplementationAuthorization: {
      //   type: String,
      //   default: ""
      // },
      // managementDispositionAuthorization: {
      //   type: String,
      //   default: ""
      // },
      // startConstruction: {
      //   type: String,
      //   default: ""
      // },
      // generalSales: {
      //   type: String,
      //   default: ""
      // },
      // completion: {
      //   type: String,
      //   default: ""
      // }
    }
  }
};
</script>
<style lang="scss" scoped>
.info {
  padding-top: 15px;
}

.heading-title {
  font-family: "nanum-square";
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 19px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
}
</style>
