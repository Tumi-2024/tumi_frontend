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
      <div style="background-color: #e8e8e8">
        <div class="header-section nanum-square">
          정비사업 정보
          <div>
            <span class="q-pr-sm text-caption">
              최근 업데이트 일자: {{ getUpdatedDate }}
            </span>
            <q-btn flat padding="0 8px" class="bg-white" @click="like">
              <q-icon size="24px">
                <img
                  v-if="getMapSelectedArea.interest"
                  src="~assets/icons/hearted.svg"
                  alt=""
                />
                <img v-else src="~assets/icons/heart.svg" alt="" />
              </q-icon>
            </q-btn>
            <q-btn flat padding="8px" @click="$refs.dialog.hide()">
              <q-icon name="close" size="24px" />
            </q-btn>
          </div>
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
              class="tabs-text nanum-square"
              label="주요정보"
            />
            <q-tab
              name="more_information"
              class="tabs-text nanum-square"
              label="상세정보"
            />
            <q-tab
              name="image_material"
              class="tabs-text nanum-square"
              label="이미지 자료"
            />
          </q-tabs>

          <q-tab-panels v-model="tab" animated class="bg-transparent">
            <!-- More Information | 상세정보 -->
            <q-tab-panel
              name="summary"
              class="bg-transparent q-pa-none q-ma-none"
            >
              <Summary />
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
import { mapActions, mapGetters } from "vuex";

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
  computed: {
    ...mapGetters("area", ["getMapSelectedArea"]),
    getUpdatedDate() {
      const date = new Date(this.getMapSelectedArea.modified);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}.${month}.${day}`;
    }
  },
  methods: {
    ...mapActions("area", ["interestSelectedArea", "uninterestSelectedArea"]),
    toggleDialog(value = true) {
      this.dialog = value;
      !this.dialog && this.$emit("hide");
    },
    async like() {
      if (!this.getMapSelectedArea.interest) {
        this.interestSelectedArea();
      } else {
        this.uninterestSelectedArea();
      }
    },
    async unLike() {
      // getMapSelectedArea
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
