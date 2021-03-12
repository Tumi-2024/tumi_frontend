<template>
  <div class="image-material">
    <div class="related-images">
      <div class="title-heading notosanskr-medium">
        관련 이미지
      </div>
      <div class="image q-mt-md" v-if="getMapSelectedArea.image_location">
        <q-img :src="getMapSelectedArea.image_location" :ratio="4 / 3" />
      </div>
      <div class="image q-mt-lg" v-if="getMapSelectedArea.image_view">
        <q-img :src="getMapSelectedArea.image_view" :ratio="4 / 3" />
      </div>
      <div class="image q-mt-lg" v-if="getMapSelectedArea.image_layout">
        <q-img :src="getMapSelectedArea.image_layout" :ratio="4 / 3" />
      </div>

      <div class="no-registered-data" v-if="noImages()">
        <div class="text-no-data notosanskr-medium">
          등록된 자료가 없습니다
        </div>
      </div>

      <div class="q-my-xl"></div>
    </div>
    <section class="button-fixed-bottom q-mr-lg">
      <q-btn
        color="primary"
        text-color="white"
        class=" notosanskr-medium "
        label="이지역 투자매물 보러가기"
      />
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("area", ["getMapSelectedArea"])
  },
  methods: {
    noImages() {
      const area = this.getMapSelectedArea;
      return !area.image_location && !area.image_view && !area.image_layout;
    }
  }
};
</script>

<style lang="scss" scoped>
.image-material {
  overflow-y: auto;
  height: 90vh;

  .related-images {
    background: white;
    padding: 24px 16px;

    .title-heading {
      font-weight: 500;
      font-size: 17px;
      line-height: 26px;
      letter-spacing: -1.275px;
      color: #1a1a1a;
    }

    .no-registered-data {
      height: 188px;
      background: #f7f7f7;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
      .text-no-data {
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        letter-spacing: -1.2px;
        color: #909090;
      }
    }
  }
  .button-fixed-bottom {
    width: 100%;
    max-width: 1000px;
    position: fixed;
    bottom: 0;
    z-index: 1;

    text-align: center;
    padding: 0 16px;
    margin-bottom: 8px;
    .q-btn {
      background: #ff5100;
      width: 100%;
      font-weight: 500;
      font-size: 17px;
      line-height: 52px;
      /* identical to box height, or 306% */

      text-align: center;
      letter-spacing: -1.25px;
      border-radius: 12px;
    }
  }
}
</style>
