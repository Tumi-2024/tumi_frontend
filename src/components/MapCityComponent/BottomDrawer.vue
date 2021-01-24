<template>
  <q-dialog v-model="dialog" seamless position="bottom">
    <q-card>
      <q-card-section class="q-pa-none" v-if="getMapMode !== 'redevelop-area'">
        <q-btn
          flat
          class="btn-view-properties full-width notosanskr-medium"
          :to="{ name: 'map_list_sale' }"
        >
          종로구 매물보기 <span style="color: #FF5A00">1,380</span>
        </q-btn>
      </q-card-section>

      <q-card-section class="redevelop-area-section q-pa-none" v-else>
        <q-btn
          unelevated
          class="btn-public notosanskr-medium"
          label="공공주택지구"
          padding="0 4px"
        />
        <div class="info q-mt-sm notosanskr-medium">
          <div class="head">
            <q-badge outline class="q-mr-xs" color="grey-6">
              <q-icon size="14px">
                <img src="~assets/icons/info-i.svg" />
              </q-icon>
            </q-badge>
            서울영등포 공공주택지구
          </div>
          <div class="properties q-pt-xs notosanskr-regular">
            <div class="row q-mt-xs">
              <div class="title q-pr-xs">·위치 :</div>
              <div class="content">
                서울특별시 영등포구 영등포동 일원
              </div>
            </div>
            <div class="row q-mt-xs">
              <div class="title q-pr-xs">·면적 :</div>
              <div class="content">
                1,366㎡
              </div>
            </div>
            <div class="row q-mt-xs">
              <div class="title q-pr-xs">·사업단계 :</div>
              <div class="content">
                사업시행인가
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialog: ""
    };
  },
  computed: {
    ...mapGetters("map", ["getMapMode"])
  }
};
</script>

<style lang="scss" scoped>
.q-card {
  width: 100%;
  max-width: 1000px;
  height: auto;
  // border-radius: 16px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}
.btn-view-properties {
  font-weight: 500;
  font-size: 16px;
  line-height: 48px;
  text-align: center;
  letter-spacing: -1.2px;
  color: #1a1a1a;
}

.redevelop-area-section {
  padding: 20px 16px;
  .q-btn {
    font-weight: bold;
    font-size: 12px;
    line-height: 24px;
    letter-spacing: -0.9px;
    color: #ff5100;
    border: #ff5100 1px solid;
  }
  .info {
    .head {
      font-weight: 500;
      font-size: 16px;
      letter-spacing: -1.2px;
    }
    .properties {
      font-size: 13px;
      line-height: 20px;
      letter-spacing: -0.97px;
      .title {
        color: #707070;
      }
      .content {
        color: #1a1a1a;
      }
    }
  }
}
</style>
