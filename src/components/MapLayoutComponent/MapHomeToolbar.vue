<template>
  <q-card
    flat
    square
    class="row justify-between items-center q-px-md"
    style="height: 60px"
  >
    <div>
      <div class="helper notosanskr-regular">
        {{ getToolbarLabel }}
      </div>
      <div class="q-mt-xs notosanskr-medium">
        <q-btn
          color="white"
          class="location-text "
          flat
          text-color="black"
          padding="0px"
          :to="{ name: 'map_view_search' }"
        >
          {{ getToolbarTitle }}
          <q-icon name="keyboard_arrow_down" size="24px" />
        </q-btn>
      </div>
    </div>
    <div>
      <q-btn flat padding="4px" :to="{ name: 'my_page' }">
        <q-icon name="menu" size="24px"></q-icon>
      </q-btn>
      <q-btn flat padding="4px" :to="{ name: 'home' }">
        <q-icon size="24px">
          <img src="~assets/icons/regular-house.svg" alt="" />
        </q-icon>
      </q-btn>
    </div>
  </q-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("map", ["getToolbarLabel", "getToolbarTitle"])
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.helper {
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.9px;
  color: #707070;
}
.location-text {
  font-weight: 500;
  font-size: 21px;
  line-height: 30px;
  letter-spacing: -1.575px;
  color: #1a1a1a;
}
</style>
