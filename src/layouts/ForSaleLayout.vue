<template>
  <q-layout view="lHh lpr lFf" container style="min-height: 100vh">
    <q-header reveal class="bg-white" style="padding: 2px 0;" >
      <toolbar-nav />
    </q-header>
    <q-page-container
      style="background-color: #f6f6f6; font-family: 'notosanskr-regular'"
    >
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
