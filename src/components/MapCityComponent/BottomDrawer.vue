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

      <!-- Redevelopment Area Information | 재개발 구역정보 -->
      <redevelopment-area-info v-else></redevelopment-area-info>
    </q-card>
  </q-dialog>
</template>

<script>
import RedevelopmentAreaInfo from "./RedevelopmentAreaInfo/Index";
import { mapGetters } from "vuex";
export default {
  components: {
    "redevelopment-area-info": RedevelopmentAreaInfo
  },
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
</style>
