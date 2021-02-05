<template>
  <div class="item row">
    <div class="title col-5" :class="{ 'text-primary': highlight }">
      {{ label }}
    </div>

    <div class="date col" v-if="date">
      <q-icon class="q-pr-sm" name="done" color="secondary" size="18px" />
      {{ date }}
    </div>
    <div class="row justify-start items-center" v-else>
      <div class="bg-dark q-ml-lg" style="height: 2px; width: 4px"></div>
      <q-icon name="horizontal_rule" size="20px" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ""
    },
    date: {
      type: String,
      default: ""
    },
    highlight: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  padding: 5px 0;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -1.05px;
  .title {
    color: #707070;
  }
  .date {
    display: flex;
    align-items: center;
    color: #1a1a1a;
  }
}
</style>
