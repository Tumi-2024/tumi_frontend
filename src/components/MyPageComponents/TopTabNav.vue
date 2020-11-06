<template>
  <q-card-section class="q-pa-none full-width">
    <q-tabs
      dense
      align="justify"
      v-model="pageTab"
      class="bg-white text-primary notosanskr-medium"
    >
      <q-route-tab :to="{ name: 'area' }" label="관심지역" />
      <q-route-tab :to="{ name: 'property_interest' }" label="관심매물" />
      <q-route-tab :to="{ name: 'property_contacted' }" label="연락한 매물" />
    </q-tabs>
  </q-card-section>
</template>

<script>
export default {
  data() {
    return {
      pageTab: ""
    };
  }
};
</script>

<style scoped></style>
