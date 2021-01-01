<template>
  <q-card flat class="q-mt-sm" style="margin-top: 0px;">
    <q-card-section class="list-items q-pa-none">
      <q-list class="q-pt-md">
        <real-estate-item
          v-for="(item, i) of items"
          :key="i"
          :title="item.title"
          :date="item.completed_at"
          :description="item.description"
        ></real-estate-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import RealEstateItem from "./RealEstateItem";
export default {
  components: {
    "real-estate-item": RealEstateItem
  },
  props: {
    items: Array
  },
  data() {
    return {
    }
  }
};
</script>

<style lang="scss" scoped>
.sort-section {
  .q-btn {
    font-size: 14px;
    line-height: 44px;
    text-align: center;
    letter-spacing: -1.05px;
    color: #707070;
  }
  .q-separator {
    margin-top: 20px;
    height: 14px;
  }
}
</style>
