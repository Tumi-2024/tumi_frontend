<template>
  <div>
    <badge-list :tags="tags" />
    <address-text
      class="q-mt-sm"
      :isRedevelop="item.isRedevelop"
      :address="item.address"
      :building="item.building"
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
    tags: Array,
    isRedevelop: Boolean
  }
};
</script>
