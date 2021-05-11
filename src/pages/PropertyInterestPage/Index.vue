<template>
  <div class="q-mt-sm" style="max-width: 1000px;">
    <property-menu-sort
      @edit="e => (isEdit = e)"
      :isEdit="isEdit"
    ></property-menu-sort>
    <property-filter
      :apartment="getCountApartment()"
      :office="getCountOfficetels()"
    ></property-filter>
    <property-list-items
      :items="properties"
      @deleteItems="deleteListItems"
      :isEdit="isEdit"
    ></property-list-items>
  </div>
</template>

<script>
import {
  PropertyMenuSort,
  PropertyFilter,
  PropertyListItems,
  PropertyMixin
} from "src/components/PropertyPageComponents";
export default {
  name: "Property-Interest",
  components: {
    "property-menu-sort": PropertyMenuSort,
    "property-filter": PropertyFilter,
    "property-list-items": PropertyListItems
  },
  mixins: [PropertyMixin],
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
  },
  mounted() {
    this.$store.dispatch('getInterestHouses');
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
