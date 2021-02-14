<template>
  <div class="row">
    <div class="row" style="height: 24px">
      <div class="text col-12" :class="`notosanskr-${weight}`">
        {{ text }}
      </div>
      <span
        class="full-width q-py-xs"
        :class="{ primary: !secondary, secondary: secondary }"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ""
    },
    secondary: {
      type: Boolean,
      default: false
    },
    weight: {
      type: String,
      default: "medium"
    }
  }
};
</script>

<style scoped>
.text {
  z-index: 1;
  color: #000;
}
.primary,
.secondary {
  margin-top: -10px;
  z-index: 0;
}
.primary {
  background: #ffd8cc;
}
.secondary {
  background: #0bcdc749;
}
</style>
