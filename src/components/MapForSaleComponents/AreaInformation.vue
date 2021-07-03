<template>
  <q-card>
    <q-card-section class="heading-title">
      매물정보
    </q-card-section>

    <q-card-section class="q-pa-none">
      <div class="row">
        <ItemAttribute
          v-for="(item, i) in informations"
          :key="i"
          :label="item.label"
          :value="item.value"
          :borderBottom="i < 4 && informations.length > 4"
        >
          <template v-slot:icon>
            <!-- <img src="assets/iconsNew/아파트.jpeg" -->
            <template v-for="(text, i) of item.text">
            <span :key="i" v-if="text">{{text}}</span>
            </template>
            <div v-show="!item.text">
              <img :key="i" :src="getImage(icon, item.new)" style="width: 30px; height: auto;" v-for="(icon, i) of item.icon" />
            </div>
            <!-- <img style="width: 40px; height: auto;" :src="getImage(icon, item.new)" /> -->
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
  props: {
    informations: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getImage(name, full) {
      if (!full) {
        return require(`assets/icons/ActualTransaction/ForSale/${name}`);
      } else {
        return require(`assets/iconsNew/${name}`);
      }
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
