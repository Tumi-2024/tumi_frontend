<template>
  <div class="column">
    <div class="col-12 q-pa-lg bg-white">
      <home-search-bar key="2" />
    </div>
    <div class="col-12 q-pl-lg q-pr-lg bg-white">
      <home-dashboard-buttons />
    </div>
    <div class="col-12 q-px-sm bg-white" style="margin-top: 12px">
      <home-investment-buttons />
    </div>
  </div>
</template>

<script>
import {
  HomeSearchBar,
  HomeInvestmentButtons,
  HomeDashboardButtons
} from "components/HomeComponents";
import { Plugins } from "@capacitor/core";
import { mapActions } from "vuex";
const { Geolocation } = Plugins;
export default {
  components: {
    HomeSearchBar,
    HomeInvestmentButtons,
    HomeDashboardButtons
  },
  methods: {
    ...mapActions("map", ["changeMapCenter"])
  },
  beforeMount() {
    Geolocation.getCurrentPosition({ enableHighAccuracy: true })
      .then((position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        // this.changeMapCenter({ lat, lng });
      })
      .catch((e) => {
        console.log(e, "error");
      });
  }
};
</script>
