<template>
  <q-layout view="hHh lpr lfr">
    <q-header>
      <home-header />
    </q-header>

    <q-page-container class="bg-positive">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { HomeHeader } from 'components/HomeComponents'

export default {
  name: 'MainLayout',
  components: { HomeHeader },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>
