<template>
  <div>
    <toolbar-filter />
    <area-list-items />
  </div>
</template>

<script>
import { AreaListItems } from "components/MapListSaleComponents";
import ToolbarFilter from "components/Utilities/ToolbarFilter";
export default {
  components: {
    "toolbar-filter": ToolbarFilter,
    "area-list-items": AreaListItems
  }
};
</script>

<style lang="scss" scoped></style>
