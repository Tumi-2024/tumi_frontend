<template>
  <q-card-section class="toolbar notosanskr-medium q-pa-none">
    <div class="row items-center">
      <q-btn flat class="row" color="dark" :to="{ name: returnBtn.pathName }">
        <!-- <q-btn flat class="row" :to="{ name: returnBtn.pathName }"> -->
        <q-icon name="keyboard_backspace" size="24px"></q-icon>
        <q-separator vertical class="q-mx-sm"></q-separator>
        {{ returnBtn.label }}
      </q-btn>
    </div>

    <q-btn
      flat
      class="bg-white add-area"
      v-if="$route.name == 'property_interest'"
    >
      <q-icon size="24px">
        <img src="~assets/icons/regular-house.svg" alt="" />
      </q-icon>
    </q-btn>
  </q-card-section>
</template>

<script>
export default {
  data() {
    return {
      returnBtn: {
        label: "",
        pathName: ""
      }
    };
  },
  mounted() {
    const path = this.$route.path.split("/")[1];
    if (path === "my-page") {
      this.returnBtn.label = "내 관심 매물";
      this.returnBtn.pathName = "my_page";
    }
    if (path === "insights") {
      this.returnBtn.label = "부동산 인사이드";
      this.returnBtn.pathName = "home";
    }
  }
};
</script>

<style scoped>
.toolbar {
  height: 44px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add-area {
  font-weight: 500;
  font-size: 15px;
  line-height: 44px;
  text-align: right;
  letter-spacing: -1.2px;
  color: #1a1a1a;
}
</style>
