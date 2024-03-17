<template>
  <div>
    <badge-list :tags="tags" />
    <address-text
      class="q-mt-sm"
      :address="item.address"
      :building="item.building"
      :houseId="houseId"
      :redirect="redirect"
      :created="created"
      :area="item.area"
      :redevName="redevName"
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
    redirect: Boolean,
    created: {
      type: String,
      required: false
    },
    redevName: {
      type: String,
      required: false
    }
  },
  computed: {
    getBadgeClass() {
      return (text) => {
        switch (text) {
          case '재건축':
            return 'bg-blue text-white'
          case '재개발':
            return 'bg-primary text-white'
          case '기타':
            return 'bg-green text-white'
          default:
            return 'bg-white text-primary'
        }
      }
    }
  }
};
</script>
