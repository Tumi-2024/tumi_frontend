<template>
  <div style="min-height: 100vh" class="bg-positive">
    <q-card flat square class="row items-center">
      <toolbar></toolbar>
      <greeting-banner></greeting-banner>
    </q-card>
  </div>
</template>

<script>
import { Toolbar, GreetingBanner } from "src/components/MyPageComponents";
export default {
  name: "MyPage",
  components: {
    toolbar: Toolbar,
    "greeting-banner": GreetingBanner
  }
};
</script>

<style lang="scss" scoped>
.header {
  border-radius: 0;
}
</style>
