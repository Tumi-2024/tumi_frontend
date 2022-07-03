<template>
  <q-card-section class="toolbar notosanskr-medium q-pa-none q-px-md q-mt-md">
    <q-btn flat padding="4px" ripple :to="{ path: '/' }">
      <q-icon name="keyboard_backspace" size="28px"></q-icon>
    </q-btn>
    <div>
      <q-btn @click="redirectToAdmin" color="primary" class="q-mr-sm">
        관리자 페이지
      </q-btn>
      <q-btn @click="logOut">로그아웃</q-btn>
      <q-btn
        flat
        class="bg-primary text-white q-ml-sm"
        @click="setModal"
        v-if="!$store.getters.user.id"
      >
        로그인
      </q-btn>
    </div>
  </q-card-section>
</template>

<script>
import { loginModalMutation } from "src/components/Utilities/LoginModal/LoginModalState";

import { Cookies } from "quasar";

export default {
  methods: {
    setModal() {
      loginModalMutation.setModal();
    },
    logOut() {
      Cookies.remove("tumi");
      Cookies.remove("tumi_i");
      this.$router.push({ name: "signIn" });
    },
    redirectToAdmin() {
      window.open("https://admin.tumimap.com/admin/", "_blank");
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
</style>
