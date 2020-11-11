<template>
  <q-dialog v-model="modals" full-width position="bottom">
    <q-card style="width: 350px">
      <q-linear-progress :value="0.6" color="pink" />

      <q-card-section class="row items-center no-wrap">
        <div>
          <div class="text-weight-bold">The Walker</div>
          <div class="text-grey">Fitz & The Tantrums</div>
        </div>

        <q-space />

        <q-btn flat round icon="fast_rewind" />
        <q-btn flat round icon="pause" />
        <q-btn flat round icon="fast_forward" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { loginModalStore, loginModalMutation } from "./LoginModalState";
export default {
  name: "LoginModal",
  computed: {
    modals: {
      get() {
        return loginModalStore.showModal;
      },
      set(val) {
        loginModalMutation.setModal(val);
      }
    }
  },
  methods: {},
  watch: {
    modals() {}
  }
};
</script>

<style scoped></style>
