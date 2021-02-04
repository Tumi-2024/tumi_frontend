<template>
  <q-card-section class="q-pa-none">
    <redevelopment-progress title="재개발 정보" :items="items" />
  </q-card-section>
</template>
<script>
import RedevelopmentProgress from "components/Utilities/RedevelopmentProgress";

export default {
  components: {
    "redevelopment-progress": RedevelopmentProgress
  },
  props: {
    items: {
      type: Array,
      default: () => [{ title: "", date: "" }]
    }
  }
};
</script>
