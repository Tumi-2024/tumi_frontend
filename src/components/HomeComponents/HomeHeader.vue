<template>
  <q-toolbar class="bg-white text-dark">
    <q-toolbar-title class="q-mt-md">
      <p class="notosanskr-bold text-heading-title">재미 </p>
    </q-toolbar-title>

    <q-btn
      flat
      dense
      round
      icon="menu"
      aria-label="Menu"
      css="btn-burger"
      :to="{ name: 'my_page' }"
    />
  </q-toolbar>
</template>

<script>
export default {
  //
}
</script>

<style lang="scss">
  .text-heading-title {
    font-size: 24px;
  }

  .btn-burger{
    width: 24px;
    height: 24px;
  }
</style>
