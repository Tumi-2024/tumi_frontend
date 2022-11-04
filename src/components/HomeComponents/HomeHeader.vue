<template>
  <q-toolbar class="bg-white text-dark">
    <q-toolbar-title class="q-mt-md flex items-center">
      <img
        :src="require('assets/tumi-logo.png')"
        class="q-mr-sm"
        style="height: 100%"
      />
      <span class="notosanskr-bold text-h4 q-ml-md" style="color: #222222">
        {{ title }}
      </span>
    </q-toolbar-title>

    <q-btn
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
