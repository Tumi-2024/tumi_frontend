<template>
  <div>
    <top-toolbar></top-toolbar>
    <search-field></search-field>
  </div>
</template>

<script>
import { TopToolbar, SearchField } from "components/MapViewSearchComponents";
export default {
  components: {
    "top-toolbar": TopToolbar,
    "search-field": SearchField
  }
};
</script>

<style scoped>
.toolbar {
  font-weight: 500;
  font-size: 17px;
  line-height: 44px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
}
</style>
