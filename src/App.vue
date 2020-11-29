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
export default {
  name: 'App',
  components: {
    "login-modal": LoginModal
  },
  created() {
  }
}
</script>
