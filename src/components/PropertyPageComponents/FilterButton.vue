<template>
  <q-btn
    unelevated
    class="q-mr-sm"
    padding="0px 8px"
    :color="current_filter === type ? 'dark' : undefined"
    v-if="count > 0"
    @click="filter(type)"
  >
    #{{ type }}({{ count }})
  </q-btn>
</template>
<script>
export default {
  props: {
    count: Number,
    type: String,
    current_filter: String
  },
  methods: {
    filter(type) {
      this.$emit("filter", type);
    }
  }
};
</script>
