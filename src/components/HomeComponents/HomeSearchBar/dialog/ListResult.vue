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
      @click="() => goToHouse(item)"
    >
      <q-item-section class="item-result">
        {{ item.latitude }}
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
import Vue from "vue";
import { mapActions } from "vuex";

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
    }
  },
  methods: {
    ...mapActions("map", ["setMapZoom", "changeMapCenter"]),

    async goToHouse({ value, id }) {
      console.log("recent Post1", value, id);
      const data = await Vue.prototype.$axios.post(`/houses/${id}/recent/`, {});
      console.log("recent Post", data);
      const _value = {
        lat: Number(value.latitude),
        lng: Number(value.longitude)
      };

      console.log(value, this.type);

      if (this.type === "location") {
        this.$router.push({
          name: "map_city"
        });
        this.setMapZoom(18);
        this.changeMapCenter(_value);
      } else if (this.type === "redevelopment") {
        this.$router.push({
          name: "map_city"
        });
        this.changeMapCenter(_value);
        this.setMapZoom(16);
      } else {
        // for-sale/apartment?sellid=16888
        // lat: 37.5229905
        // lng: 126.9959299
        this.$router.push({
          name: "for_sale_apartment",
          query: {
            value
          }
        });
      }
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
