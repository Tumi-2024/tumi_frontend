<template>
  <q-layout view="lHh lpr lFf" container style="min-height: 100vh">
    <q-header reveal class="bg-white">
      <toolbar-nav />
      <toolbar-filter :disable="getMapMode === 'redevelop-area'" />
    </q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ToolbarNav } from "components/MapLayoutComponents";
import ToolbarFilter from "components/Utilities/ToolbarFilter";
import { mapGetters } from "vuex";
export default {
  components: {
    "toolbar-nav": ToolbarNav,
    "toolbar-filter": ToolbarFilter
  },
  computed: {
    ...mapGetters("map", ["getMapMode"])
  }
};
</script>

<style lang="scss" scoped></style>
