<template>
  <div style="min-height: 100vh;" class="row column bg-positive">
    <!-- Head Section -->
    <q-card flat square class="row items-center">
      <toolbar></toolbar>
      <greeting-banner></greeting-banner>
      <icon-tabs></icon-tabs>
    </q-card>
    <!-- Information lists -->
    <q-card flat square class="row items-center q-mt-sm">
      <information-tabs></information-tabs>
    </q-card>
    <!-- Notice Section -->
    <q-card flat square class="q-mt-sm full-heigh col-grow">
      <q-card-section class="notice notosanskr-regular"
        >공지사항</q-card-section
      >
    </q-card>
  </div>
</template>

<script>
import {
  Toolbar,
  GreetingBanner,
  IconTabs,
  InformationTabs
} from "src/components/MyPageComponents";
export default {
  name: "MyPage",
  components: {
    toolbar: Toolbar,
    "greeting-banner": GreetingBanner,
    "icon-tabs": IconTabs,
    "information-tabs": InformationTabs
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
