<template>
  <div class="fixed-bottom row justify-center q-mb-xl">
    <div
      style="width: 100%; max-width: 1000px;"
      class="row justify-end q-pr-lg"
    >
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
      const zoom = 17;
      const lat = 37.536357575140926;
      const lng = 127.09206289552306;
      this.$router.push({
        name: "map_city",
        query: {
          onFocus: true,
          zoom,
          lat,
          lng
        }
      });
    }
  }
};
</script>

<style scoped></style>
