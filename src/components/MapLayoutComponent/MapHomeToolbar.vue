<template>
  <q-card
    flat
    square
    class="row justify-between items-center q-pr-md"
    style="height: 60px"
  >
    <q-btn class="row" @click="toggleHeaderTitle()" flat padding="4px 16px">
      <div class="helper text-left col-12 notosanskr-regular">
        {{ getToolbarLabel }}
      </div>
      <div class="q-mt-xs col-12 text-left notosanskr-medium">
        <div class="location-text " flat text-color="black">
          {{ getToolbarTitle }}
          <q-icon name="keyboard_arrow_down" size="24px" />
        </div>
      </div>
    </q-btn>
    <div>
      <q-btn flat padding="4px" :to="{ name: 'my_page' }">
        <q-icon name="menu" size="24px"></q-icon>
      </q-btn>
      <q-btn flat padding="4px" :to="{ name: 'home' }">
        <q-icon size="24px">
          <img src="~assets/icons/regular-house.svg" alt="" />
        </q-icon>
      </q-btn>
    </div>
    <!-- Dialog Section for Property Information | 찾아볼 매물 정보 -->
    <q-dialog v-model="dialogPropertyInfo" position="bottom">
      <q-card class="notosanskr-regular">
        <q-card-section class="header-title bg-white notosanskr-medium">
          찾아볼 매물 정보
        </q-card-section>

        <q-card-section class="q-pa-none bg-white notosanskr-medium">
          conte
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogPropertyInfo: null
    };
  },
  computed: {
    ...mapGetters("map", ["getMapMode", "getToolbarLabel", "getToolbarTitle"])
  },
  methods: {
    toggleHeaderTitle() {
      this.getMapMode === "default"
        ? this.$router.push({ name: "map_view_search" })
        : (this.dialogPropertyInfo = true);
    }
  }
};
</script>

<style lang="scss" scoped>
.helper {
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.9px;
  color: #707070;
}
.location-text {
  font-weight: 500;
  font-size: 21px;
  line-height: 30px;
  letter-spacing: -1.575px;
  color: #1a1a1a;
}

.q-dialog {
  .q-card {
    width: 100%;
    max-width: 1000px;
    height: auto;
    border-radius: 16px 16px 0 0;
    background: #f0f0f0;
    .empty-bottom-space {
      height: 200px;
    }

    .header-title {
      font-weight: 500;
      font-size: 17px;
      line-height: 26px;
      letter-spacing: -1.2px;
      color: #1a1a1a;
    }
  }
}
</style>
