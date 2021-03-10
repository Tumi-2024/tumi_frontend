<template>
  <q-card flat square class="row full-width items-center">
    <top-navigation></top-navigation>
    <top-tab-nav></top-tab-nav>
  </q-card>
</template>

<script>
import TopNavigation from "./TopNavigation";
import TopTabNav from "./TopTabNav";
export default {
  components: {
    TopNavigation,
    TopTabNav
  }
};
</script>

<style></style>
