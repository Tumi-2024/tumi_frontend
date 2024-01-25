<template>
  <div class="row" style="gap: 2px">
    <template v-for="(badge, index) of tags">
      <badge
        v-if="badge.value"
        :key="index"
        v-bind="{ icon: badge.icon, value: badge.value, [badge.type]: true }"
        :color="badge.color"
      >
      </badge>
    </template>
  </div>
</template>
<script>
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
