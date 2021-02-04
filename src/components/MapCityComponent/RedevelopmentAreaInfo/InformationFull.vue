<template>
  <div style="background-color: #E8E8E8;">
    <div class="header-section notosanskr-medium">
      재개발 구역정보
      <q-btn flat padding="8px" @click="$emit('hide')">
        <q-icon name="close" size="24px" />
      </q-btn>
    </div>

    <q-card class="bg-transparent overflow-hidden" flat>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey q-mb-sm bg-white"
        active-color="black"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab
          name="more_information"
          class="tabs-text notosanskr-medium"
          label="상세정보"
        />
        <q-tab
          name="image_material"
          class="tabs-text notosanskr-medium"
          label="이미지 자료"
        />
      </q-tabs>

      <q-tab-panels v-model="tab" animated class="bg-transparent ">
        <!-- More Information | 상세정보 -->
        <q-tab-panel
          name="more_information"
          class="bg-transparent q-pa-none q-ma-none"
        >
          <more-information></more-information>
        </q-tab-panel>
        <!-- Image material | 이미지 자료 -->
        <q-tab-panel name="image_material" class="q-pa-none q-ma-none">
          <image-material></image-material>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import MoreInformation from "./MoreInformation";
import ImageMaterial from "./ImageMaterial";
export default {
  components: {
    "more-information": MoreInformation,
    "image-material": ImageMaterial
  },
  data() {
    return {
      tab: "more_information"
    };
  }
};
</script>

<style lang="scss" scoped>
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 16px;
  background: white;
  font-weight: 500;
  font-size: 17px;
  line-height: 44px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
}
.tabs-text {
  font-weight: 500;
  font-size: 16px;
  line-height: 44px;
  text-align: center;
  letter-spacing: -1.2px;
  color: #707070;
}
</style>
