<template>
  <div>
    <toolbar-nav class="bg-white" style="margin-bottom: 12px"></toolbar-nav>
    <recently-seen-menu-items></recently-seen-menu-items>
    <recently-seen-btns class="bg-white"></recently-seen-btns>
    <recently-seen-list-items class="bg-white"></recently-seen-list-items>
  </div>
</template>

<script>
import {
  RecentlySeenMenuItems,
  RecentlySeenBtns,
  RecentlySeenListItems,
  ToolbarNav
} from "src/components/RecentlySeenComponents";
export default {
  name: "Recently-Seen",
  components: {
    "recently-seen-menu-items": RecentlySeenMenuItems,
    "recently-seen-btns": RecentlySeenBtns,
    "recently-seen-list-items": RecentlySeenListItems,
    "toolbar-nav": ToolbarNav
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
div {
  background: #e8e8e8;
}
</style>
