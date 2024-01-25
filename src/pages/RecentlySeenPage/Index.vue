<template>
  <q-card flat class="q-mt-sm">
    <q-card-section class="bg-white list-items q-pa-none notosanskr-regular">
      <q-list
        class="bg-white q-pt-md"
        v-if="properties && properties.length > 0"
      >
        <div style="display: flex; gap: 2px" class="q-pa-sm bg-white">
          <Badge value="개발유형" recommend />
          <Badge value="주택유형" houseType />
          <Badge value="전용면적" pyeong />
          <Badge value="희망매매가" price />
          <Badge value="매물수정일자" date />
        </div>
        <q-separator />
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
import Badge from "../../components/Utilities/Badges/Badge.vue";
import {
  // PropertyFilter,
  PropertyMixin
} from "src/components/PropertyPageComponents";
export default {
  name: "Recently-Seen",
  components: {
    // PropertyFilter,
    Badge,
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
