import Vue from "vue";

export const loginModalStore = Vue.observable({
  showModal: true
});

export const loginModalMutation = {
  setModal(boolean) {
    if (!boolean) {
      loginModalStore.showModal = !loginModalStore.showModal;
    } else {
      loginModalStore.showModal = boolean;
    }
  }
};
