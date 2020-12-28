<template>
  <div class="bg-red" ref="gmapContainer">
    <GmapMap
      ref="mapRef"
      :center="{ lat: 1.38, lng: 103.8 }"
      :zoom="12"
      :style="`height: ${mapSize.height}; width: ${mapSize.width};`"
      v-if="mapReady"
    >
    </GmapMap>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mapReady: false,
      mapSize: { height: "", width: "" }
    };
  },
  mounted() {
    this.getgmapContainerSize();
  },
  methods: {
    getgmapContainerSize() {
      const h = this.$refs.gmapContainer.clientHeight;
      const w = this.$refs.gmapContainer.clientWidth;
      this.mapSize.height = h + "px";
      this.mapSize.width = w + "px";
      this.mapReady = true;
    }
  }
};
</script>

<style lang="scss" scoped></style>
