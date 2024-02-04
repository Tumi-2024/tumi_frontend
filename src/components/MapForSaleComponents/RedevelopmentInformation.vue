<template>
  <q-card>
    <q-card-section class="q-pa-md bg-white">
      <span class="heading-title"> 재개발 정보 </span>
      <section class="progress-section bg-white">
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
  </q-card>
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

.heading-title {
  font-family: "nanum-square";
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 19px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
}
</style>
