<template>
  <q-badge
    class="q-mr-sm notosanskr-regular"
    :class="[
      `bg-${bg_color}`,
      `text-${text_color}`,
      `outline-${outline_color}`,
      { outline: outline }
    ]"
    :outline="outline"
  >
    <q-icon v-if="icon != undefined">
      <img :src="`/icons/${icon}.svg`" alt="" srcset="" />
    </q-icon>
    {{ label }}
  </q-badge>
</template>
<script>
export default {
  props: {
    outline: Boolean,
    color: String,
    icon: String,
    label: String,
    bg_color: String,
    text_color: String,
    outline_color: String
  }
};
</script>
<style lang="scss" scoped>
.q-badge {
  font-weight: bold;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.9px;

  &.outline {
    border: 1px solid #dbdbdb;
    color: #909090;
    background: white;
  }

  &.outline-primary {
    border: 1px solid $primary;
  }
}
</style>
