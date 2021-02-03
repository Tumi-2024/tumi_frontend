<template>
  <q-card-section class="q-pa-none">
    <div class="row q-mb-md">
      <q-btn
        v-for="(item, i) of items"
        :key="i"
        flat
        class="col-3 information-btn q-py-md"
        :class="{ 'border-bottom-dashed': i < 4 }"
      >
        <div class="column justify-center content-center items-center">
          <q-icon size="32px">
            <img
              v-if="item.icon"
              :src="require(`assets/icons/LandSaleInformation/${item.icon}`)"
            />
          </q-icon>
          <div class="title q-mt-sm" v-if="!item.value">
            <q-icon size="20px">
              <img src="~/assets/icons/empty.svg" />
            </q-icon>
          </div>
          <div class="title q-mt-sm" v-else>{{ item.value }}</div>
          <div class="sub-title q-mt-xs">{{ item.label }}</div>
        </div>
      </q-btn>
    </div>
  </q-card-section>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          value: "2,275㎡",
          label: "대지면적",
          icon: "land_area.svg"
        },
        {
          value: "2,275㎡",
          label: "대지면적",
          icon: "building_area.svg"
        },
        {
          value: "",
          label: "대지면적",
          icon: "rent.svg"
        },
        {
          value: "준공인가",
          label: "진행단계",
          icon: "completion.svg"
        },
        {
          value: "2,275㎡",
          label: "대지면적",
          icon: "building_area.svg"
        },
        {
          value: "",
          label: "감정가",
          icon: "connoisseur.svg"
        },
        {
          value: "2,275㎡",
          label: "대지면적",
          icon: "completion.svg"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
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
