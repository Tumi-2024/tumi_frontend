<template>
  <div>
    <toolbar-filter />
    <div class="page-container full-height row justify-center items-center">
      <h5 class="text-white">No Map :(</h5>
      <bottom-drawer />
    </div>
  </div>
</template>

<script>
import { BottomDrawer, ToolbarFilter } from "components/MapCityComponent";
export default {
  components: {
    "bottom-drawer": BottomDrawer,
    "toolbar-filter": ToolbarFilter
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  background: rgb(54, 54, 54);
  min-height: calc(100vh - 118px);
}
</style>
