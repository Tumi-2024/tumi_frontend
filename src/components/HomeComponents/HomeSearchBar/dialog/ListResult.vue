<template>
  <q-list separator class="rounded-borders q-py-md">
    <q-item-label class="no-margin no-padding" header>
      <slot name="title">
        <p style="font-size: 14px" class="text-black nanum-square">
          <span class="text-primary">투미!</span>
          추천 검색
        </p>
      </slot>
    </q-item-label>

    <q-item
      clickable
      v-ripple
      v-for="(item, index) in list"
      :key="index"
      class="items-center"
      @click.prevent="() => select(item)"
    >
      <q-icon
        size="20px"
        class="item-result-icon"
        name="img:icons/home-page-icon/search-result-icon/location-mark.svg"
      ></q-icon>
      <q-item-section class="item-result row">
        <template v-if="item.latitude">
          {{ item.latitude }}
        </template>
        <q-item-label lines="1" class="text-black notosanskr-regular">
          {{ item.label }}
        </q-item-label>
      </q-item-section>
      <q-item-section
        v-if="hasDelete"
        avatar
        class="justify-center"
        @click.stop="() => onDelete(item)"
      >
        <q-icon color="primary" name="close" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: "list-result",
  props: {
    list: {
      type: Array,
      required: false,
      default: () => []
    },
    type: {
      type: String,
      required: false,
      default: "location"
    },
    hasDelete: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    select(item) {
      this.$emit("select", item, this.type);
    },
    onDelete(item) {
      this.$emit("delete", item);
    }
  }
};
</script>

<style>
.item-result-icon {
  margin-right: 20px;
}
</style>
