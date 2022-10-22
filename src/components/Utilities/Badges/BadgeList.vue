<template>
  <div class="row" style="gap: 2px">
    <template v-for="(badge, index) of tags">
      <badge
        :key="index"
        v-if="badge.value"
        v-bind="{ icon: badge.icon, value: badge.value, [badge.type]: true }"
        :color="badge.color"
      />
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
