<template>
  <div style="min-height: 100vh" class="row column bg-positive">
    <component :is="toolbarComponent" />
    <!-- navigation toolbar -->
    <q-card flat square class="q-pa-none bg-positive">
      <router-view></router-view>
    </q-card>
  </div>
</template>

<script>
import { ToolbarNav, ShareToolBarNav } from "components/MapLayoutComponent";
export default {
  components: {
    "toolbar-nav": ToolbarNav,
    "share-tool-bar": ShareToolBarNav
  },
  data() {
    return {
      toolbarComponent: "toolbar-nav"
    };
  },
  mounted() {
    const [path] = this.$route.path.split("/").slice(-1);
    /**
     *  if path is '/map/city'
     *  use ToolBarNav
     */
    this.toolbarComponent = path === "city" ? "toolbar-nav" : "share-tool-bar";
  }
};
</script>

<style lang="scss" scoped></style>
