<template>
  <div style="min-height: 100vh" class="row column bg-positive">
    <!-- navigation toolbar -->
    <toolbar-nav />
    <q-card flat square class="q-pa-none bg-positive">
      <router-view></router-view>
    </q-card>
  </div>
</template>

<script>
import { ShareToolBarNav as ToolbarNav } from "components/MapLayoutComponent";
export default {
  components: {
    "toolbar-nav": ToolbarNav
  }
};
</script>

<style lang="scss" scoped></style>
