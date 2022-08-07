<template>
  <q-card-section class="q-pa-md bg-white">
    <section class="progress-section bg-white">
      <div class="title-heading notosanskr-medium">재개발 정보</div>

      <div class="info notosanskr-regular">
        <item-redevelopment-info
          v-for="(item, index) in list"
          :key="index"
          :label="item.title"
          :date="item.date"
        />
        <!-- <item-redevelopment-info
          label="준공인가"
          :date="completion"
          highlight
        /> -->
      </div>
    </section>
  </q-card-section>
</template>
<script>
import ItemRedevelopmentInfo from "./Common/ItemRedevelopmentInfo";

export default {
  components: {
    "item-redevelopment-info": ItemRedevelopmentInfo
  },
  props: {
    list: {
      type: Array,
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
</style>
