<template>
  <q-card-section class="toolbar notosanskr-medium q-pa-none q-px-md">
    <q-btn flat padding="4px" ripple :to="{ path: '/' }">
      <q-icon name="keyboard_backspace" size="28px"></q-icon>
    </q-btn>
    <div>
      <q-btn @click="goToSignUp">회원가입</q-btn>
      <q-btn flat class="bg-primary text-white q-ml-sm" @click="setModal" v-if="!$store.getters.user.id">로그인</q-btn>
    </div>
  </q-card-section>
</template>

<script>
import {
  loginModalMutation
} from "src/components/Utilities/LoginModal/LoginModalState";
export default {
  methods: {
    setModal() {
      loginModalMutation.setModal();
    },
    goToSignUp() {
      this.$router.push({ name: 'signUp' })
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
