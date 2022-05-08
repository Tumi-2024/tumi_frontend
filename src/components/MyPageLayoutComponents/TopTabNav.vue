<template>
  <q-card-section class="q-pa-none full-width bg-red">
    <q-tabs
      dense
      align="justify"
      class="bg-white text-primary notosanskr-medium"
    >
      <q-route-tab
        v-for="(tab, i) in routeTabs"
        :key="i"
        :label="tab.label"
        :to="tab.path"
        exact
        replace
      />
    </q-tabs>
  </q-card-section>
</template>

<script>
export default {
  data() {
    return {
      routeTabs: []
    };
  },
  computed: {
    defaultTabs() {
      return [
        { label: "관심지역", path: "/my-page/area" },
        { label: "관심매물", path: "/my-page/property-interest" },
        { label: "연락한 매물", path: "/my-page/property-contacted" }
      ];
    },
    insightsTabs() {
      return [
        { label: "부동산 팁", path: "/insights/?tab=estate" },
        { label: "정책분석", path: "/insights/?tab=policy" },
        { label: "시장전망", path: "/insights/?tab=market" }
      ];
    }
  },
  mounted() {
    const path = this.$route.path.split("/")[1]; // my-page or real-estate
    if (path === "insights") {
      /**
       *  if path is real-estate; we give real-estate route-tabs
       */
      this.routeTabs = this.insightsTabs;
    } else {
      this.routeTabs = this.defaultTabs;
    }
  }
};
</script>
