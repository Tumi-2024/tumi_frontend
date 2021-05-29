<template>
  <q-card flat square class="row full-width items-center">
    <top-navigation></top-navigation>
    <top-tab-nav v-if="$route.name !== 'insight_content'"></top-tab-nav>
  </q-card>
</template>

<script>
import TopNavigation from "./TopNavigation";
import TopTabNav from "./TopTabNav";
export default {
  data() {
    return {}
  },
  components: {
    TopNavigation,
    TopTabNav
  },
};
</script>

<style></style>
