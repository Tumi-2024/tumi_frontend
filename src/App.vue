<template>
  <div id="q-app" class="bg-positive">
    <div
      style="max-width: 1000px; min-height: 100vh"
      class="q-mx-auto bg-white"
    >
      <router-view />
      <login-modal />
    </div>
  </div>
</template>
<script>
import LoginModal from "src/components/Utilities/LoginModal/LoginKaKaoModal.vue";
import Vue from "vue";
import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    "login-modal": LoginModal
  },
  methods: {
    ...mapActions("map", ["fetchLocationInterest"])
  },
  beforeMount() {
    try {
      const token = this.$store.state.user.data.token;
      if (token) {
        Vue.prototype.$axios.defaults.headers.common.Authorization = `Token ${token}`;
        // this.$store.dispatch("getDetailHouses", "page_size=5");
        // this.fetchLocationInterest();
      }
    } catch (e) {}
  }
};
</script>
<style lang="scss" scoped>
::v-deep .q-select__dropdown-icon {
  font-size: 35px;
}
</style>
