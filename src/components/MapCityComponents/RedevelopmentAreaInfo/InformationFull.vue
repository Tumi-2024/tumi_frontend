<template>
  <q-dialog
    ref="dialog"
    v-model="dialog"
    position="bottom"
    transition-show="slide-up"
    transition-hide="slide-down"
    @hide="toggleDialog(false)"
  >
    <q-card flat class="dialog overflow-hidden">
      <div style="background-color: #E8E8E8;">
        <div class="header-section notosanskr-medium">
          재개발 구역정보
          <q-btn flat padding="8px" @click="$refs.dialog.hide()">
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
              name="summary"
              class="tabs-text notosanskr-medium"
              label="주요정보"
            />
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

          <q-tab-panels v-model="tab" animated class="bg-transparent">
            <!-- More Information | 상세정보 -->
            <q-tab-panel
              name="summary"
              class="bg-transparent q-pa-none q-ma-none"
            >
              <Summary></Summary>
            </q-tab-panel>
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
    </q-card>
  </q-dialog>
</template>

<script>
import MoreInformation from "./MoreInformation";
import Summary from "./Summary";
import ImageMaterial from "./ImageMaterial";
export default {
  components: {
    "more-information": MoreInformation,
    "image-material": ImageMaterial,
    Summary
  },
  data() {
    return {
      tab: "summary",
      dialog: false
    };
  },
  methods: {
    toggleDialog(value = true) {
      this.dialog = value;
      !this.dialog && this.$emit("hide");
    }
  }
};
</script>

<style lang="scss">
.q-card.dialog {
  width: 100%;
  max-width: 1000px;
  height: auto;
  // border-radius: 16px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}
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
  .q-tab__content {
    width: 100%;
  }
}
</style>
