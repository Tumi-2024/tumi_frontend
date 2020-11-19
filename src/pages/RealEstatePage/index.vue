<template>
  <div class="q-mt-sm" style="max-width: 1000px;">
    <recently-seen-menu-items></recently-seen-menu-items>
    <!--
    <recently-seen-btns></recently-seen-btns>
    <recently-seen-list-items></recently-seen-list-items>
    -->
  </div>
</template>

<script>
import {
  RecentlySeenMenuItems,
  RecentlySeenBtns,
  RecentlySeenListItems,
} from "src/components/RecentlySeenComponents";
export default {
  name: "Recently-Seen",
  components: {
    "recently-seen-menu-items": RecentlySeenMenuItems,
    "recently-seen-btns": RecentlySeenBtns,
    "recently-seen-list-items":RecentlySeenListItems,
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
