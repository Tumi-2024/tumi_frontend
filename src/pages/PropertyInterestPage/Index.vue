<template>
  <div style="max-width: 1000px">
    <property-menu-sort
      @edit="(e) => (isEdit = e)"
      :isEdit="isEdit"
    ></property-menu-sort>
    <q-card-section class="bg-white list-items q-pa-none notosanskr-regular">
      <property-list-items
        :items="properties"
        @deleteItems="deleteItems"
        :isEdit="isEdit"
      ></property-list-items>
    </q-card-section>
  </div>
</template>

<script>
// import { AreaItem } from "src/components/MapListSaleComponents";
import {
  PropertyMenuSort,
  // PropertyFilter,
  PropertyListItems
} from "src/components/PropertyPageComponents";
import { InterestMixin } from "src/components/InterestsComponents";

export default {
  name: "Property-Interest",
  components: {
    // "area-item": AreaItem,
    "property-menu-sort": PropertyMenuSort,
    // "property-filter": PropertyFilter,
    "property-list-items": PropertyListItems
  },
  mixins: [InterestMixin],
  data() {
    return {
      isEdit: false
    };
  },
  methods: {
    deleteListItems(items) {
      this.deleteItems(items);
      this.isEdit = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.sort-section {
  .q-btn {
    font-size: 14px;
    line-height: 44px;
    text-align: center;
    letter-spacing: -1.05px;
    color: #707070;
  }
  .q-separator {
    // margin-top: 20px;
    height: 14px;
  }
}
</style>
