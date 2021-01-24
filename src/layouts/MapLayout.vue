<template>
  <div style="min-height: 100vh" class="row column bg-positive">
    <!-- navigation toolbar -->
    <share-tool-bar-nav v-if="$route.name === 'map_for_sale'" />
    <toolbar-nav v-else />
    <q-card flat square class="q-pa-none bg-positive">
      <router-view></router-view>
    </q-card>
  </div>
</template>

<script>
import { ShareToolBarNav, ToolbarNav } from "components/MapLayoutComponent";
export default {
  components: {
    "toolbar-nav": ToolbarNav,
    "share-tool-bar-nav": ShareToolBarNav
  }
};
</script>

<style lang="scss" scoped></style>
