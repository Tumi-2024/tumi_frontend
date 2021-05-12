<template>
  <div class="row">
    <custom-badge :label="formatType(tag.type)" v-if="tag.type" />

    <custom-badge
      label="추천 급매"
      text_color="primary"
      bg_color="white"
      :outline="true"
      outline_color="primary"
      v-if="tag.recommended"
    />

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

    <custom-badge
      :label="tag.date"
      text_color="grey"
      bg_color="white"
      :outline="true"
      v-if="tag.date"
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
          recommended: "",
          redevelopment: false,
          stageProgress: "",
          transactionStatus: "",
          date: ""
        };
      }
    }
  },
  methods: {
    formatType(type) {
      switch (type) {
        case "officetels":
          return "오피스텔";
        case "apartment":
          return "아파트";
        default:
          return type;
      }
    }
  }
};
</script>
