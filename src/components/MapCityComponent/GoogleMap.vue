<template>
  <div class="bg-red" ref="gmapContainer">
    <GmapMap
      ref="mapRef"
      :center="{ lat: position.latitude, lng: position.longitude }"
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
      mapSize: { height: "", width: "" },
      position: { latitude: 0, longitude: 0 }
    };
  },
  mounted() {
    this.getgmapContainerSize();
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log(pos.coords.latitude, pos.coords.longitude);
      this.position.latitude = pos.coords.latitude;
      this.position.longitude = pos.coords.longitude;
      this.mapReady = true;
    });
  },
  methods: {
    getgmapContainerSize() {
      const h = this.$refs.gmapContainer.clientHeight;
      const w = this.$refs.gmapContainer.clientWidth;
      this.mapSize.height = h + "px";
      this.mapSize.width = w + "px";
    }
  }
};
</script>

<style lang="scss" scoped></style>
