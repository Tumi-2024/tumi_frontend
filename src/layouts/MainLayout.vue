<template>
  <q-layout view="hHh lpr lfr">
    <q-header style="max-width: 1000px" class="q-mx-auto">
      <home-header :title="getTitle" />
    </q-header>

    <q-page-container class="bg-positive">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { HomeHeader } from "components/HomeComponents";

export default {
  name: "MainLayout",
  components: { HomeHeader },
  data() {
    return {
      leftDrawerOpen: false
    };
  },
  computed: {
    getTitle() {
      if (this.$route.name === "signUp") {
        return "회원가입";
      }
      return "투미 재개발 지도";
    }
  }
};
</script>
