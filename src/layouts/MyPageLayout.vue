<template>
  <div style="min-height: 100vh" class="row column bg-positive">
    <q-card flat square class="row full-width items-center">
      <top-navigation></top-navigation>
      <top-tab-nav></top-tab-nav>
    </q-card>

    <q-card flat square class="q-pa-none bg-positive">
      <router-view></router-view>
    </q-card>
  </div>
</template>

<script>
import { ToolbarNav, TopTabNav } from "src/components/MyPageComponents";
import {} from "src/components/MyPageComponents";
export default {
  components: {
    "top-navigation": ToolbarNav,
    "top-tab-nav": TopTabNav
  }
};
</script>

<style lang="scss" scoped></style>
