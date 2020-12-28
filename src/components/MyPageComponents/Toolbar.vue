<template>
  <q-card-section class="toolbar notosanskr-medium q-pa-none q-px-md">
    <q-btn flat padding="4px" ripple :to="{ path: '/' }">
      <q-icon name="keyboard_backspace" size="28px"></q-icon>
    </q-btn>
    <q-btn flat class="bg-primary text-white" @click="setModal" v-if="!$store.getters.user.id">로그인</q-btn>
  </q-card-section>
</template>

<script>
import {
  loginModalMutation,
  loginModalStore
} from "src/components/Utilities/LoginModal/LoginModalState";
export default {
  methods: {
    setModal() {
      loginModalMutation.setModal();
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
