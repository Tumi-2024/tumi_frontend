<template>
  <q-card flat>
    <q-card-section class="heading-title">
      토지 매물정보
    </q-card-section>

    <q-card-section class="q-pa-none">
      <div class="row">
        <!-- landArea -->
        <ItemAttribute borderBottom label="대지면적" :value="landArea">
          <template v-slot:icon>
            <img src="~assets/icons/LandSaleInformation/land_area.svg" />
          </template>
        </ItemAttribute>

        <!-- buildingArea -->
        <ItemAttribute borderBottom label="건물면적" :value="buildingArea">
          <template v-slot:icon>
            <img src="~assets/icons/LandSaleInformation/building_area.svg" />
          </template>
        </ItemAttribute>

        <!-- numberFloors -->
        <ItemAttribute borderBottom label="임대현황" :value="rentalStatus">
          <template v-slot:icon>
            <img src="~assets/icons/LandSaleInformation/rent.svg" />
          </template>
        </ItemAttribute>

        <!-- stationArea -->
        <ItemAttribute borderBottom label="진행단계" :value="progress">
          <template v-slot:icon>
            <img src="~assets/icons/LandSaleInformation/progress.svg" />
          </template>
        </ItemAttribute>

        <!-- connoisseur -->
        <ItemAttribute label="감정가" :value="connoisseur">
          <template v-slot:icon>
            <img src="~assets/icons/LandSaleInformation/connoisseur.svg" />
          </template>
        </ItemAttribute>

        <!-- right -->
        <ItemAttribute label="권리가" :value="right">
          <template v-slot:icon>
            <img src="~assets/icons/LandSaleInformation/right.svg" />
          </template>
        </ItemAttribute>

        <!-- premiumPrice -->
        <ItemAttribute label="프리미엄가" :value="premiumPrice">
          <template v-slot:icon>
            <img src="~assets/icons/LandSaleInformation/progress.svg" />
          </template>
        </ItemAttribute>
      </div>
    </q-card-section>
    <q-separator />
  </q-card>
</template>

<script>
import ItemAttribute from "../Common/ItemAttribute";
export default {
  name: "InformationLandForSale",
  components: {
    ItemAttribute
  },
  props: {
    landArea: {
      type: String,
      default: ""
    },
    buildingArea: {
      type: String,
      default: ""
    },
    rentalStatus: {
      type: String,
      default: ""
    },
    progress: {
      type: String,
      default: ""
    },
    connoisseur: {
      type: String,
      default: ""
    },
    right: {
      type: String,
      default: ""
    },
    premiumPrice: {
      type: String,
      default: ""
    }
  },

  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.heading-title {
  font-family: "notosanskr-medium";
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
}
.information-btn {
  .title {
    font-family: "notosanskr-medium";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    letter-spacing: -1.2px;
    color: #1a1a1a;
  }
  .sub-title {
    font-family: "notosanskr-medium";
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
    text-align: center;
    letter-spacing: -0.975px;
    color: #707070;
  }

  &.border-bottom-dashed {
    border-bottom: 2px dashed rgba(187, 186, 186, 0.466);
  }
}
</style>
