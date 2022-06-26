<template>
  <div class="row">
    <template v-for="(badge, index) of tags">
      <badge
        :key="index"
        v-if="badge.value"
        v-bind="{ icon: badge.icon, value: badge.value, [badge.type]: true }"
        :class="{ 'q-mr-sm': index !== tags.length - 1 }"
        :color="badge.color"
      />
    </template>
  </div>
</template>
<script>
// const tagsOrder = [
//   "houseType",
//   "pyeong",
//   "recommend",
//   "redevelopment",
//   "charter",
//   "sale",
//   "date"
// ];

import Badge from "./Badge";

export default {
  components: { badge: Badge },
  props: {
    tags: {
      type: Array
    }
  },
  computed: {
    /**
     * @desc ordering
     */
  }
};
</script>
