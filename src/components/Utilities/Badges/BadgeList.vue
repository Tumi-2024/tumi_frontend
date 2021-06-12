<template>
  <div class="row">
    <template v-for="(badge, index) of getTagsOptions" >
      <badge
        :key="index"
        v-if="badge.isShow !== undefined ? badge.isShow: true"
        v-bind="{icon: badge.icon, value: badge.value, [badge.type]: true}"
        :class="{'q-mr-sm': index !== tags.length -1}"
      />
    </template>
  </div>
</template>
<script>
const tagsOrder = ['houseType', 'pyeong', 'recommend', 'redevelopment', 'price', 'date']

import Badge from './Badge'

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
    getTagsOptions() {
      return tagsOrder.reduce((acc, curr) => {
        const tag = this.tags.find(t => t.type === curr)
        return tag ? [...acc, tag] : acc
      }, [])
    }
  }
}
</script>
