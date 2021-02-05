<template>
  <q-card-section class="q-pa-md bg-white">
    <section class="progress-section bg-white">
      <div class="title-heading notosanskr-medium">
        재개발 정보
      </div>

      <div class="info notosanskr-regular">
        <item-redevelopment-info
          label="추진위원회 승인"
          :date="approvalPromotionCommittee"
        />
        <item-redevelopment-info
          label="정비구역지정"
          :date="designationMaintenanceArea"
        />
        <item-redevelopment-info
          label="조합설립인가"
          :date="associationEstablishment"
        />
        <item-redevelopment-info label="시공사" :date="constructorDate" />
        <item-redevelopment-info
          label="사업시행인가"
          :date="projectImplementationAuthorization"
        />
        <item-redevelopment-info
          label="관리처분인가"
          :date="managementDispositionAuthorization"
        />
        <item-redevelopment-info label="착공" :date="startConstruction" />
        <item-redevelopment-info label="일반분양" :date="generalSales" />
        <item-redevelopment-info
          label="준공인가"
          :date="completion"
          highlight
        />
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
    approvalPromotionCommittee: {
      type: String,
      default: ""
    },
    designationMaintenanceArea: {
      type: String,
      default: ""
    },
    associationEstablishment: {
      type: String,
      default: ""
    },
    constructorDate: {
      type: String,
      default: ""
    },
    projectImplementationAuthorization: {
      type: String,
      default: ""
    },
    managementDispositionAuthorization: {
      type: String,
      default: ""
    },
    startConstruction: {
      type: String,
      default: ""
    },
    generalSales: {
      type: String,
      default: ""
    },
    completion: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss" scoped>
.info {
  padding-top: 15px;
}
</style>
