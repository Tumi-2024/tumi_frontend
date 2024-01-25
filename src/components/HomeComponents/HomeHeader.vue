<template>
  <q-toolbar class="bg-white text-dark">
    <q-toolbar-title class="q-mt-md flex items-center">
      <img
        :src="require('assets/tumi-icon-high.jpeg')"
        class="q-mr-sm"
        style="height: 72px; width: 72px; object-fit: cover"
      />
      <span
        class="notosanskr-bold text-h4 q-ml-md"
        style="
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          color: #222222;
        "
      >
        {{ title }}
      </span>
    </q-toolbar-title>
    <q-btn
      v-if="!$store.getters.user.id"
      flat
      class="bg-primary text-white q-ml-sm"
      @click="onClickLoginButton"
    >
      로그인
    </q-btn>
    <q-btn
      v-else
      flat
      dense
      round
      icon="menu"
      aria-label="Menu"
      css="btn-burger"
      :to="{ name: 'recently_seen' }"
    />
  </q-toolbar>
</template>

<script>
export default {
  //
  props: {
    title: {
      type: String,
      required: true
    }
  },
  methods: {
    onClickLoginButton() {
      this.$router.push({ name: "signIn" });
    }
  }
};
</script>

<style lang="scss">
.text-heading-title {
  font-size: 24px;
}

.btn-burger {
  width: 24px;
  height: 24px;
}
</style>
