<template>
  <q-layout view="lHh lpr lFf" container style="min-height: 100vh">
    <q-header reveal>
      <toolbar-nav />
    </q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ToolbarNav } from "components/MapLayoutComponents";
export default {
  components: {
    "toolbar-nav": ToolbarNav
  }
};
</script>

<style lang="scss" scoped></style>
