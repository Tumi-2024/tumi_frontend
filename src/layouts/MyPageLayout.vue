<template>
  <div style="min-height: 100vh" class="row column bg-positive">
    <!-- Head Section -->
    <q-card flat square class="row items-center">
      <toolbar></toolbar>
      <icon-tabs v-if="$route.name === 'recently_seen' && $store.state.user.data.token"></icon-tabs>
    </q-card>
    <router-view></router-view>
  </div>
</template>

<script>
import {
  Toolbar,
  IconTabs
  // InformationTabs
} from "src/components/MyPageComponents";
export default {
  components: {
    toolbar: Toolbar,
    "icon-tabs": IconTabs
    // "information-tabs": InformationTabs
  }
};
</script>

<style lang="scss" scoped>
.notice {
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.98px;
  color: #707070;
}
</style>
