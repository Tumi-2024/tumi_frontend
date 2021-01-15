<template>
  <div>
    <toolbar-filter></toolbar-filter>
    <div class="page-container full-height column justify-center items-center">
      <p class="text-white">Redevelopment Area</p>
      <h5 class="text-white">No Map :(</h5>
    </div>
    <bottom-drawer></bottom-drawer>
  </div>
</template>

<script>
import ToolbarFilter from 'components/Utilities/ToolbarFilter';
import { BottomDrawer } from "components/MapRedevelopComponents";
export default {
  components: {
    "toolbar-filter": ToolbarFilter,
    "bottom-drawer": BottomDrawer,
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  background: rgb(54, 54, 54);
  min-height: calc(100vh - 118px);
}
</style>
