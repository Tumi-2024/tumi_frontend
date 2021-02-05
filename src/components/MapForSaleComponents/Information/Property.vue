<template>
  <q-card flat>
    <q-card-section class="heading-title">
      토지 매물정보
    </q-card-section>

    <q-card-section class="q-pa-none">
      <div class="row">
        <!-- exclusiveArea -->
        <ItemAttribute borderBottom label="전용면적" :value="exclusiveArea">
          <template v-slot:icon>
            <img src="~assets/icons/Apartment/area.svg" />
          </template>
        </ItemAttribute>

        <!-- direction -->
        <ItemAttribute borderBottom label="방향" :value="direction">
          <template v-slot:icon>
            <img src="~assets/icons/Apartment/direction.svg" />
          </template>
        </ItemAttribute>

        <!-- numberFloors -->
        <ItemAttribute borderBottom label="층수" :value="numberFloors">
          <template v-slot:icon>
            <img src="~assets/icons/Apartment/floors.svg" />
          </template>
        </ItemAttribute>

        <!-- stationArea -->
        <ItemAttribute borderBottom label="서초역" :value="stationArea">
          <template v-slot:icon>
            <img src="~assets/icons/Apartment/station.svg" />
          </template>
        </ItemAttribute>

        <!-- connoisseur -->
        <ItemAttribute label="감정가" :value="connoisseur">
          <template v-slot:icon>
            <img src="~assets/icons/Apartment/station.svg" />
          </template>
        </ItemAttribute>

        <!-- right -->
        <ItemAttribute label="권리가" :value="right">
          <template v-slot:icon>
            <img src="~assets/icons/Apartment/premium_price.svg" />
          </template>
        </ItemAttribute>

        <!-- premiumPrice -->
        <ItemAttribute label="프리미엄가" :value="premiumPrice">
          <template v-slot:icon>
            <img src="~assets/icons/Apartment/station.svg" />
          </template>
        </ItemAttribute>

        <!-- progress_stage -->
        <ItemAttribute label="진행단계" :value="progress">
          <template v-slot:icon>
            <img src="~assets/icons/Apartment/progress_stage.svg" />
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
  name: "land-for-sale-information",
  components: {
    ItemAttribute
  },
  props: {
    exclusiveArea: {
      type: String,
      default: ""
    },
    direction: {
      type: String,
      default: ""
    },
    numberFloors: {
      type: String,
      default: ""
    },
    stationArea: {
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
    },
    progress: {
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
