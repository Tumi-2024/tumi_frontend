import Vue from "vue";

export const loginModalStore = Vue.observable({
  showKaKaoModal: true,
  showModal: true
});

export const loginModalMutation = {
  setKaKaoModal(boolean) {
    if (!boolean) {
      loginModalStore.showKaKaoModal = !loginModalStore.showKaKaoModal;
    } else {
      loginModalStore.showKaKaoModal = boolean;
    }
  },
  closeKaKaoModal() {
    loginModalStore.showKaKaoModal = false;
  },
  setModal(boolean) {
    if (!boolean) {
      loginModalStore.showModal = !loginModalStore.showModal;
    } else {
      loginModalStore.showModal = boolean;
    }
  },
  closeModal() {
    loginModalStore.showModal = false;
  }
};
