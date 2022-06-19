<template>
  <q-dialog :value="true" seamless position="bottom" @hide="dialogReset">
    <q-card flat class="overflow-hidden">
      <q-card-section
        class="q-pa-none"
        v-if="!getMapSelectedArea && getMapMode !== 'redevelop-area'"
      >
        <q-btn
          flat
          class="btn-view-properties full-width notosanskr-medium"
          :to="{ name: 'listHouses' }"
        >
          {{ $store.state.map.toolbarTitle.split(" ")[1] }} 매물보기
          <span style="color: #ff5a00; margin-left: 10px">
            {{ `${$store.state.estate.count_estate} 개` }}
          </span>
        </q-btn>
      </q-card-section>

      <!-- Redevelopment Area Information | 재개발 구역정보 -->
      <redevelopment-area-info v-if="getMapSelectedArea" @hide="dialogReset" />
    </q-card>
  </q-dialog>
</template>

<script>
import RedevelopmentAreaInfo from "./RedevelopmentAreaInfo/Index";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    "redevelopment-area-info": RedevelopmentAreaInfo
  },
  data() {
    return {
      dialog: true
    };
  },
  computed: {
    ...mapGetters("map", ["getMapMode"]),
    ...mapGetters("area", ["getMapAreas", "getMapSelectedArea"])
  },
  methods: {
    ...mapActions("area", ["changeMapSelectedArea"]),
    dialogReset() {
      this.dialog = false;
      this.changeMapSelectedArea(null);
    }
  }
};
</script>

<style lang="scss" scoped>
.q-card {
  width: 100%;
  max-width: 1000px;
  height: auto;
  border: 1px solid #d5d5d5;
  border-bottom: 0;
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
