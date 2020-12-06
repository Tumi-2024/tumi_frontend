<template>
  <div>
    <top-toolbar></top-toolbar>
  </div>
</template>

<script>
import { TopToolbar } from "components/MapViewSearchComponents";
export default {
  components: {
    "top-toolbar": TopToolbar
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
