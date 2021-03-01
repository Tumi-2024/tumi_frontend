<template>
  <q-layout view="lHh lpr lFf" container style="min-height: 100vh">
    <q-header reveal class="bg-white">
      <top-navigation></top-navigation>
    </q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ToolbarNav } from "src/components/MyPageLayoutComponents";
export default {
  components: {
    "top-navigation": ToolbarNav
  }
};
</script>

<style lang="scss" scoped></style>
