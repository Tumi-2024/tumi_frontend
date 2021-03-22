<template>
  <div id="q-app" class="bg-positive">
    <div style="max-width: 1000px; min-height: 100vh" class="q-mx-auto bg-white">
      <router-view />
      <login-modal />
    </div>
  </div>
</template>
<script>
import LoginModal from "src/components/Utilities/LoginModal/LoginModal.vue";
import Vue from 'vue'
import { mapGetters, mapActions } from "vuex"

export default {
  name: 'App',
  components: {
    "login-modal": LoginModal
  },
  methods: {
    ...mapActions("map", [
      "changeMapMode",
      "changeMapZoom",
      "changeMapCenter",
      "getLocationInterest"
    ])
  },
  mounted() {
    this.$store.dispatch('requestLocation');
    try {
      let token = this.$store.state.user.data.token;
      if (token) {
        Vue.prototype.$axios.defaults.headers.common['Authorization'] = `Token ${token}`;
        this.getLocationInterest();
      }
    } catch(e) {
      console.log(e);
    }
    console.log(this.$store);
  }
}
</script>
