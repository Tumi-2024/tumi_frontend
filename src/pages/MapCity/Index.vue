<template>
  <div>
    <toolbar-filter />
    <google-map class="page-container full-height full-width" />
    <bottom-drawer />
  </div>
</template>

<script>
import { BottomDrawer, GoogleMap } from "components/MapCityComponents";
import ToolbarFilter from "components/Utilities/ToolbarFilter";
export default {
  components: {
    "bottom-drawer": BottomDrawer,
    "toolbar-filter": ToolbarFilter,
    "google-map": GoogleMap
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  background: rgb(54, 54, 54);
  min-height: calc(100vh - 118px);
}
</style>
