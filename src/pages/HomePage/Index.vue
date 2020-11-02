<template>
  <div class="column">
    <div class="col-12 q-pa-lg bg-white">
      <home-search-bar key="2"/>
    </div>
    <div class="col-12 q-pl-lg q-pr-lg bg-white">
      <home-dash-button />
    </div>
    <div class="col-12 q-pl-lg q-pr-lg bg-white" style="margin-top: 12px">
      <home-investment-buttons />
    </div>
  </div>
</template>

<script>
import { HomeSearchBar, HomeDashButton, HomeInvestmentButtons } from 'components/HomeComponents';

export default {
  components: {
    HomeSearchBar,
    HomeDashButton,
    HomeInvestmentButtons
  }
}
</script>