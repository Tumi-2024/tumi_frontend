<template>
  <q-card-section class="toolbar q-pa-none bg-white">
    <div class="row q-ml-sm">
      <!-- <q-btn flat padding="0px" :to="{ name: returnBtn.pathName }"> -->
      <q-btn flat padding="0px" @click="$router.go(-1)">
        <q-icon name="keyboard_backspace" size="24px" class="q-mr-sm"></q-icon>
      </q-btn>
      <q-separator vertical inset />
      <div class="q-ml-sm heading-nav-bar">동대문구 전농동</div>
    </div>

    <!-- Right side starts here -->
    <div class="flex-row">
      <q-btn flat class="bg-white add-area">
        <q-icon size="24px">
            <img src="~assets/icons/like.svg" alt="" />
        </q-icon>
      </q-btn>

      <q-btn
        flat
        class="bg-white add-area"
      >
        <q-icon size="24px">
            <img src="~assets/icons/share.svg" alt="" />
        </q-icon>
      </q-btn>
    </div>
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
    if (path === "real-estate") {
      this.returnBtn.label = "부동산 인사이드";
      this.returnBtn.pathName = "my_page";
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
.heading-nav-bar{
  font-family: 'notosanskr-medium';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 44px;
  letter-spacing: -1.275px;
  color: #1A1A1A;
}
</style>
