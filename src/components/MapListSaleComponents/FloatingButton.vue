<template>
  <div style="position: fixed; bottom: 30px; right: 10px">
    <div style="right: 0">
      <q-btn fab color="primary" @click="goToMap()">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.25 23.25L18 21L10 23.25L2.75 21V4.75L10 7L18 4.75L25.25 7V23.25Z"
            stroke="white"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linejoin="round"
          />
          <path
            d="M10 7V18"
            stroke="white"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linejoin="round"
          />
          <path
            d="M18 10V21"
            stroke="white"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linejoin="round"
          />
        </svg>
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToMap() {
      // set quries for map
      this.$router.push({ name: "map_city" });
      // this.$router.push({
      //   name: "map_city",
      //   query: {
      //     onFocus: true,
      //     zoom,
      //     lat,
      //     lng
      //   }
      // });
    }
  }
};
</script>

<style scoped></style>
