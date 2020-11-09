<template>
  <div class="q-mt-sm">
    <contacted-menu-items></contacted-menu-items>
    <contacted-btns></contacted-btns>
    <contacted-list-items></contacted-list-items>
  </div>
</template>

<script>
import {
  ContactedMenuItems,
  ContactedBtns,
  ContactedListItems,
} from "src/components/PropertyContactedComponents";
export default {
  name: "Property-Contacted",
  components: {
    "contacted-menu-items": ContactedMenuItems,
    "contacted-btns": ContactedBtns,
    "contacted-list-items":ContactedListItems,
  },
  data() {
    return {};
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
