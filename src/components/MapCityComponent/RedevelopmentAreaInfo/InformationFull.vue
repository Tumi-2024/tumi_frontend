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
        <q-tab-panel
          name="more_information"
          class="more-information bg-transparent q-pa-none q-ma-none"
        >
          <div class="area-info bg-white">
            <q-badge
              outline
              color="primary"
              class="badge-type notosanskr-medium"
              label="재개발 구역"
            />
            <div class="title notosanskr-medium">서울영등포 공공주택지구</div>
            <div class="sub-title notosanskr-regular">
              서울 특별시 동대문구 전농동 106-1
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="image_material" class="image-material">
          <div class="text-h6">이미지 자료</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
export default {
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
.image-material,
.more-information {
  overflow-y: auto;
  height: 90vh;
}
.more-information {
  .area-info {
    padding: 24px 16px;
    .q-badge {
      font-weight: bold;
      font-size: 12px;
      line-height: 24px;
      letter-spacing: -0.9px;
      color: #ff5100;
      border: #ff5100 1px solid;
      padding: 0 4px;
    }
    .title {
      font-weight: 500;
      font-size: 21px;
      line-height: 32px;
      letter-spacing: -1.575px;
      color: #1a1a1a;
    }
    .sub-title {
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -1.2px;
      color: #707070;
    }
  }
}
</style>
