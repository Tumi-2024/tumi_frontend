<template>
  <div>
    <toolbar-nav class="bg-white" style="margin-bottom: 12px"></toolbar-nav>
    <property-menu-sort hide-edit></property-menu-sort>
    <property-filter
      :apartment="getCountApartment()"
      :office="getCountOfficetels()"
      class="bg-white"
    ></property-filter>
    <property-list-items
      class="bg-white"
      :items="propertyItems"
    ></property-list-items>
  </div>
</template>

<script>
import { ToolbarNav } from "src/components/RecentlySeenComponents";
import {
  PropertyMenuSort,
  PropertyFilter,
  PropertyListItems,
  PropertyMixin
} from "src/components/PropertyPageComponents";
export default {
  name: "Recently-Seen",
  components: {
    "toolbar-nav": ToolbarNav,
    PropertyMenuSort,
    PropertyFilter,
    PropertyListItems
  },
  mixins: [PropertyMixin],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
div {
  background: #e8e8e8;
}
</style>
