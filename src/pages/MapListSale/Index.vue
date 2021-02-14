<template>
  <div>
    <toolbar-filter />
    <area-list-items />
    <floating-button />
  </div>
</template>

<script>
import {
  AreaListItems,
  FloatingButton
} from "components/MapListSaleComponents";
import ToolbarFilter from "components/Utilities/ToolbarFilter";
export default {
  components: {
    "toolbar-filter": ToolbarFilter,
    "area-list-items": AreaListItems,
    "floating-button": FloatingButton
  }
};
</script>

<style lang="scss" scoped></style>
