<template>
  <div>
    <toolbar-nav class="bg-white" style="margin-bottom: 12px"></toolbar-nav>
    <property-menu-sort hide-edit @sort="getProperties"></property-menu-sort>
    <property-filter @filter="filter"
      :apartment="getCountApartment()"
      :office="getCountOfficetels()"
      class="bg-white"
    ></property-filter>
    <div class="bg-white">
      <div  style="border-bottom: 1px solid #e8e8e8; margin: 0 16px"></div>
    </div>
    <q-card-section class="bg-white list-items q-pa-none notosanskr-regular">
      <q-list class="bg-white q-pt-md" v-if="this.properties && this.properties.length > 0" >
        <area-item
          v-for="(item, i) of this.properties"
          :key="i"
          :item="item"
        ></area-item>
      </q-list>
    </q-card-section>
  </div>
</template>

<script>
import { ToolbarNav } from "src/components/RecentlySeenComponents";
import { AreaItem } from "src/components/MapListSaleComponents";
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
    PropertyListItems,
    "area-item": AreaItem
  },
  mixins: [PropertyMixin],
};
</script>

<style lang="scss" scoped>
div {
  background: #e8e8e8;
}
</style>
