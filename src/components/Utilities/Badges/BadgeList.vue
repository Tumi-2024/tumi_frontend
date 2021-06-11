<template>
  <div class="row">
    <template v-for="(badge, index) of tags" >
      <Badge
        :key="index"
        v-if="badge.isShow"
        v-bind="{icon:  badge.icon, value: badge.value, [badge.type]: true}"
        :class="{'q-mr-sm': index !== tags.length -1}"
      />
    </template>
  </div>
</template>
<script>
import Badge from './Badge'
export default {
  components: { Badge },
  props: {
    tags: {
      type: Array
    }
  }
}
</script>
