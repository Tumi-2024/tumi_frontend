<template>
  <div>
    <AreaListHouses
      :params="$route.query"
      :isRedevelop="false"
      @search="onSearch"
    />
    <floating-button />
  </div>
</template>

<script>
import {
  AreaListHouses,
  FloatingButton
} from "components/MapListSaleComponents";

import { mapActions } from "vuex";

export default {
  components: {
    AreaListHouses,
    "floating-button": FloatingButton
  },
  data() {
    return {
      list: []
    };
  },
  methods: {
    ...mapActions("map", ["changeToolbarTitle"]),
    onSearch(type, text) {
      console.log(type, text, "search");
    }
  },
  async beforeMount() {
    this.changeToolbarTitle("매물");
    // if (this.$route.query?.sellid) {
    //   const { data } = await Vue.prototype.$axios.get(
    //     `/houses/${this.$route.query.sellid}`
    //   );
    //   this.list = data.results;
    // } else {
    //   const { data } = await Vue.prototype.$axios.get(`/houses`);
    //   this.list = data.results;
    // }
  }
};
</script>

<style lang="scss" scoped></style>
