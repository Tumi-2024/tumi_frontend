<template>
  <q-card flat square class="row justify-between items-center q-px-md">
    <q-card-section class="toolbar">
      <q-btn
        flat
        padding="0px 8px 0 16px"
        color="dark"
        class="row"
        @click="$router.go(-1)"
      >
        <div>
          <q-icon
            name="keyboard_backspace"
            size="24px"
            class="q-mr-sm"
          ></q-icon>
        </div>
        <q-separator vertical inset />
        <div class="heading-nav-bar q-ml-sm">{{ getPrevPageLabel }}</div>
      </q-btn>

      <!-- Right side starts here -->

      <div class="flex-row">
        <q-btn flat padding="0 8px" class="bg-white" @click="like()">
          <q-icon size="32px">
            <img v-if="currentHouse" src="~assets/icons/hearted.svg" alt="" />
            <img v-else src="~assets/icons/heart.svg" alt="" />
          </q-icon>
        </q-btn>
        <q-btn flat padding="0 8px" class="bg-white">
          <q-icon size="32px">
            <img src="~assets/icons/share.svg" alt="" />
          </q-icon>
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ToolbarNav",
  methods: {
    like() {
      this.$store.dispatch("toggleInterestHouse");
    }
  },
  computed: {
    ...mapGetters("map", ["getMapMode", "getPrevPageLabel"]),
    ...mapGetters(["currentHouse"]),
    // current_house
    is_interest() {
      return (
        this.$store.getters.current_house &&
        this.$store.getters.current_house.interest &&
        this.$store.getters.current_house.interest.house
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.toolbar {
  height: 44px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  background: white;
}
.heading-nav-bar {
  font-family: "notosanskr-medium";
  font-weight: 500;
  font-size: 17px;
  line-height: 44px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
}
</style>
