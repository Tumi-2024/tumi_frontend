<template>
  <q-list separator class="rounded-borders">
    <q-item-label class="no-margin no-padding" header>
      <slot name="title">
        <p style="font-size: 14px" class="text-black notosanskr-medium">
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
      @click="() => goToHouse(item.value)"
    >
      <q-item-section class="item-result">
        <q-icon
          size="20px"
          class="item-result-icon"
          name="img:icons/home-page-icon/search-result-icon/location-mark.svg"
        ></q-icon>
        <q-item-label lines="1" class="text-black notosanskr-regular">
          {{ item.label }}
        </q-item-label>
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
    }
  },
  methods: {
    goToHouse(sellid) {
      // for-sale/apartment?sellid=16888
      this.$router.push({
        name: "for_sale_apartment",
        query: {
          sellid
        }
      });
    }
  }
};
</script>

<style>
.item-result {
  position: absolute;
  display: flexbox;
  flex-direction: row;
  left: 0;
  margin-top: 10px;
  max-height: 48px;
}

.item-result-icon {
  margin-right: 20px;
}
</style>
