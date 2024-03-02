<template>
  <div>
    <google-map class="page-container full-height full-width" />
    <bottom-drawer />
  </div>
</template>

<script>
import { BottomDrawer, GoogleMap } from "components/MapCityComponents";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    "bottom-drawer": BottomDrawer,
    "google-map": GoogleMap
  },
  methods: {
    ...mapActions("map", [
      "changeToolbarTitle"
    ])
  },
  computed: {
    ...mapGetters("area", ["getMapAreas", "getMapSelectedArea"])
  },
  beforeMount() {
    this.changeToolbarTitle("매물")
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  background: rgb(54, 54, 54);
  min-height: calc(100vh - 118px);
}
</style>
