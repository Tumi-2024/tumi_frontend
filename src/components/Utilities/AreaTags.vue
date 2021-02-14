<template>
  <div class="row">
    <custom-badge :label="tag.type" v-if="tag.type" />

    <custom-badge
      label="재개발"
      text_color="grey"
      bg_color="white"
      :outline="true"
      icon="redevelop"
      v-if="tag.redevelopment"
    />

    <custom-badge
      :label="tag.stageProgress"
      text_color="primary"
      bg_color="white"
      :outline="true"
      v-if="tag.stageProgress"
    />

    <custom-badge
      :label="tag.transactionStatus"
      text_color="grey"
      bg_color="white"
      :outline="true"
      v-if="tag.transactionStatus"
    />
  </div>
</template>
<script>
import CustomBadge from "./CustomBadge.vue";

export default {
  components: {
    "custom-badge": CustomBadge
  },
  props: {
    tag: {
      type: Object,
      default() {
        return {
          type: "",
          redevelopment: false,
          stageProgress: "",
          transactionStatus: ""
        };
      }
    }
  }
};
</script>
