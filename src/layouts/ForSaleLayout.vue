<template>
  <!-- <div style="min-height: 100vh" class="row column bg-positive">

    <toolbar-nav />
    <q-card flat square class="q-pa-none bg-positive">
      <router-view></router-view>
    </q-card>
  </div> -->

  <q-layout view="lHh lpr lFf" container style="min-height: 100vh">
    <q-header reveal class="bg-white">
      <toolbar-nav />
    </q-header>

    <q-page-container style="background-color: #E5E5E5">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ToolbarNav } from "components/ForSaleLayoutComponents";
export default {
  components: {
    "toolbar-nav": ToolbarNav
  }
};
</script>

<style lang="scss" scoped></style>
