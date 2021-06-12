<template>
  <div>
    <badge-list :tags="tags" />
    <address-text class="q-mt-sm" :address="item.address"  />
  </div>
</template>
<script>
import AddressText from './AddressText'
import BadgeList from 'src/components/Utilities/Badges/BadgeList.vue'
export default {
  components: {
    AddressText, BadgeList
  },
  props: {
    item: Object,
    tags: Array
  }
}
</script>
