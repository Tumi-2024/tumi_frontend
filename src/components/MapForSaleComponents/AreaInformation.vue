<template>
  <q-card flat>
    <q-card-section class="heading-title">
      토지 매물정보
      {{ iconSrc }}
    </q-card-section>

    <q-card-section class="q-pa-none">
      <div class="row">
        <ItemAttribute
          v-for="(item, i) in informations"
          :key="i"
          :label="item.label"
          :value="item.value"
          :borderBottom="i < 4"
        >
          <template v-slot:icon>
            <img :src="getImage(item.icon)" />
          </template>
        </ItemAttribute>
      </div>
    </q-card-section>
    <q-separator />
  </q-card>
</template>

<script>
import ItemAttribute from "./Common/ItemAttribute";
export default {
  name: "InformationLandForSale",
  components: {
    ItemAttribute
  },
  computed: {
    iconSrc: () => "land-area.svg"
  },
  props: {
    informations: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getImage(name) {
      return require(`assets/icons/ActualTransaction/ForSale/${name}`);
    }
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
