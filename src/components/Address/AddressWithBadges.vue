<template>
  <div>
    <badge-list :tags="tags" />
    <address-text
      class="q-mt-sm"
      :isRedevelop="item.isRedevelop"
      :address="item.address"
      :building="item.building"
      :houseId="houseId"
      :redirect="redirect"
    />
  </div>
</template>
<script>
import AddressText from "./AddressText";
import BadgeList from "src/components/Utilities/Badges/BadgeList.vue";
export default {
  components: {
    AddressText,
    BadgeList
  },
  props: {
    item: Object,
    houseId: Number,
    tags: Array,
    isRedevelop: Boolean,
    redirect: Boolean
  }
};
</script>
