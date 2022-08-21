<template>
  <q-layout view="lHh lpr lFf" container style="min-height: 100vh">
    <q-header reveal class="bg-white">
      <div ref="navHeader">
        <toolbar-nav />
        <toolbar-filter
          v-if="$route.path.indexOf('list') === -1"
          class="q-pt-xs q-px-sm"
        />
        <!-- :disable="getMapMode === 'redevelop-area'" -->
      </div>
    </q-header>

    <q-page-container>
      <router-view :headerHeight="headerH.clientHeight"></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ToolbarNav } from "components/MapLayoutComponents";
import ToolbarFilter from "components/Utilities/MapLayoutToolbarFilter";
import { mapGetters } from "vuex";
export default {
  components: {
    "toolbar-nav": ToolbarNav,
    "toolbar-filter": ToolbarFilter
  },
  data() {
    return {
      headerH: 0
    };
  },
  computed: {
    ...mapGetters("map", ["getMapMode"])
  },
  mounted() {
    this.headerH = this.$refs.navHeader;
  }
};
</script>

<style lang="scss" scoped></style>
