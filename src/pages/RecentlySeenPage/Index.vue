<template>
  <q-card flat class="q-mt-sm">
    <q-card-section class="bg-white list-items q-pa-none notosanskr-regular">
      <q-list
        class="bg-white q-pt-md"
        v-if="properties && properties.length > 0"
      >
        <area-item-house
          v-for="(item, i) of properties"
          :key="i"
          :item="item"
          :query="{ sellid: item.id }"
          v-bind="{
            ctgr: item.category,
            type: item.type
          }"
        ></area-item-house>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import { AreaItemHouse } from "src/components/MapListSaleComponents";
import {
  // PropertyFilter,
  PropertyMixin
} from "src/components/PropertyPageComponents";
export default {
  name: "Recently-Seen",
  components: {
    // PropertyFilter,
    "area-item-house": AreaItemHouse
  },
  mixins: [PropertyMixin]
};
</script>

<style lang="scss" scoped>
div {
  background: #e8e8e8;
}
</style>
