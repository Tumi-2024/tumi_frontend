<template>
  <div>
    <toolbar-filter />
    <google-map class="page-container full-height " />
    <bottom-drawer />
  </div>
</template>

<script>
import {
  BottomDrawer,
  ToolbarFilter,
  GoogleMap
} from "components/MapCityComponent";
export default {
  components: {
    "bottom-drawer": BottomDrawer,
    "toolbar-filter": ToolbarFilter,
    "google-map": GoogleMap
  }
};
</script>
GoogleMap

<style lang="scss" scoped>
.page-container {
  background: rgb(54, 54, 54);
  min-height: calc(100vh - 118px);
}
</style>
