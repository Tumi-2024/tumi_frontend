<template>
  <div>
    <toolbar-nav class="bg-white" style="margin-bottom: 12px" />
    <property-menu-sort hide-edit @sort="getProperties" />
    <property-filter
      @filter="filter"
      :apartment="getCountType('아파트')"
      :office="getCountType('오피스텔')"
      :land="getCountType('토지')"
      :alliance="getCountType('연립ￜ다세대')"
      :commercial="getCountType('상업ￜ업무용')"
      :single="getCountType('단독ￜ다가구')"
      :unauthorized="getCountType('무허가 건축물')"
      :right="getCountType('입주권')"
      class="bg-white"
    ></property-filter>
    <div class="bg-white">
      <div style="border-bottom: 1px solid #e8e8e8; margin: 0 16px" />
    </div>
    <q-card-section class="bg-white list-items q-pa-none notosanskr-regular">
      <q-list
        class="bg-white q-pt-md"
        v-if="properties && properties.length > 0"
      >
        <area-item
          v-for="(item, i) of properties"
          :key="i"
          :item="item"
          :query="{ sellid: item.id }"
          v-bind="{
            ctgr: item.category,
            type: item.type
          }"
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
  PropertyMixin
} from "src/components/PropertyPageComponents";
export default {
  name: "Recently-Seen",
  components: {
    "toolbar-nav": ToolbarNav,
    PropertyMenuSort,
    PropertyFilter,
    "area-item": AreaItem
  },
  mixins: [PropertyMixin]
};
</script>

<style lang="scss" scoped>
div {
  background: #e8e8e8;
}
</style>
