<template>
  <q-card-section class="q-pa-none full-width">
    <q-tabs
      dense
      align="justify"
      v-model="pageTab"
      class="bg-white text-primary notosanskr-medium"
    >
      <q-route-tab
        v-for="(tab, i) in routeTabs"
        :key="i"
        :to="{ name: tab.pathName }"
        :label="tab.label"
      />
    </q-tabs>
  </q-card-section>
</template>

<script>
export default {
  data() {
    return {
      pageTab: "",
      routeTabs: []
    };
  },
  computed: {
    defaultTabs() {
      return [
        { label: "관심지역", pathName: "area" },
        { label: "관심매물", pathName: "property_interest" },
        { label: "연락한 매물", pathName: "property_contacted" }
      ];
    },
    realEstateTabs() {
      return [
        { label: "부동산 팁", pathName: "real_estate_tips" },
        { label: "정책분석", pathName: "real_estate_policy_analysis" },
        { label: "시장전망", pathName: "real_estate_market_outlook" }
      ];
    }
  },
  mounted() {
    const path = this.$route.path.split("/")[1]; // my-page or real-estate
    if (path === "real-estate") {
      /**
       *  if path is real-estate; we give real-estate route-tabs
       */
      this.routeTabs = this.realEstateTabs;
    } else {
      this.routeTabs = this.defaultTabs;
    }
  }
};
</script>

<style scoped></style>
