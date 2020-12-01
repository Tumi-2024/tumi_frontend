<template>
  <div class="page-container full-height row justify-center items-center">
    <h5 class="text-white">No Map :(</h5>
    <bottom-drawer />
  </div>
</template>

<script>
import { BottomDrawer } from "components/MapCityComponent";
export default {
  components: {
    "bottom-drawer": BottomDrawer
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  background: rgb(54, 54, 54);
  min-height: calc(100vh - 118px);
}
</style>
