<template>
  <div class="row">
    <custom-badge :label="tags.type"></custom-badge>
    <custom-badge label="재개발" text_color="grey" bg_color="white" :outline="true" icon="redevelop"></custom-badge>
    <custom-badge :label="tags.recomend" text_color="primary" bg_color="white" :outline="true"></custom-badge>
    <custom-badge :label="tags.transaction_status" text_color="grey" bg_color="white" :outline="true"></custom-badge>
  </div>
</template>
<script>
import CustomBadge from './CustomBadge.vue'

export default {
   props: {
    tags: Object
  },
  components: {
    'custom-badge': CustomBadge
  }
}
</script>