<template>
  <div style="min-height: 100vh" class="row column bg-positive">
    <!-- navigation toolbar -->
    <toolbar-nav />
    <!-- filter toolbar -->
    <toolbar-filter />
    <q-card flat square class="q-pa-none bg-positive">
      <router-view></router-view>
    </q-card>
  </div>
</template>

<script>
import { ToolbarNav, ToolbarFilter } from "components/MapLayoutComponent";
export default {
  components: {
    "toolbar-nav": ToolbarNav,
    "toolbar-filter": ToolbarFilter
  }
};
</script>

<style lang="scss" scoped></style>
