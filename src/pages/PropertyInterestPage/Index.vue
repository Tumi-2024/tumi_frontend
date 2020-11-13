<template>
  <div class="q-mt-sm" style="max-width: 1000px;">
    <interest-menu-items></interest-menu-items>
    <interest-btns></interest-btns>
    <interest-list-items></interest-list-items>
  </div>
</template>

<script>
import {
  InterestMenuItems,
  InterestBtns,
  InterestListItems,
} from "src/components/PropertyInterestComponents";
export default {
  name: "Property-Interest",
  components: {
    "interest-menu-items": InterestMenuItems,
    "interest-btns": InterestBtns,
    "interest-list-items": InterestListItems,
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
