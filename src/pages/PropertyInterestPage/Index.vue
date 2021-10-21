<template>
  <div class="q-mt-sm" style="max-width: 1000px;">
    <property-menu-sort
      @edit="e => (isEdit = e)"
      :isEdit="isEdit"
    ></property-menu-sort>
    <property-filter
      :apartment="getCountType('아파트')"
      :office="getCountType('오피스텔')"
      :land="getCountType('토지')"
      :alliance="getCountType('연립ￜ다세대')"
      :commercial="getCountType('상업ￜ업무용')"
      :single="getCountType('단독ￜ다가구')"
      :unauthorized="getCountType('무허가 건축물')"
      :right="getCountType('입주권')"
    ></property-filter>
    <div class="bg-white">
      <div  style="border-bottom: 1px solid #e8e8e8; margin: 0 16px"></div>
    </div>
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
import { AreaItem } from "src/components/MapListSaleComponents";
import {
  PropertyMenuSort,
  PropertyFilter,
  PropertyListItems
} from "src/components/PropertyPageComponents";
import {
  InterestMixin
} from "src/components/InterestsComponents"

export default {
  name: "Property-Interest",
  components: {
    "area-item": AreaItem,
    "property-menu-sort": PropertyMenuSort,
    "property-filter": PropertyFilter,
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
