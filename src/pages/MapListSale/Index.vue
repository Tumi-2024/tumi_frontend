<template>
  <div>
    <toolbar-filter />
    <area-list-items />
  </div>
</template>

<script>
import { ToolbarFilter, AreaListItems } from "components/MapListSaleComponents";
export default {
  components: {
    "toolbar-filter": ToolbarFilter,
    "area-list-items": AreaListItems
  }
};
</script>

<style lang="scss" scoped></style>
