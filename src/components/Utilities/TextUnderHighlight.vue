<template>
  <div class="row">
    <div class="row" style="height: 24px">
      <div class="text col-12 notosanskr-medium">{{ text }}</div>
      <span class="highlighter full-width q-py-xs"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ""
    }
  }
};
</script>

<style scoped>
.text {
  z-index: 1;
}
.highlighter {
  background: #ffd8cc;
  margin-top: -10px;
  z-index: 0;
}
</style>
