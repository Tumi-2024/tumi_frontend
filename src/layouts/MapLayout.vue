<template>
  <div style="min-height: 100vh" class="row column bg-positive">
    <q-card flat square class="row full-width items-center">
      <div>Toolbar here</div>
    </q-card>

    <q-card flat square class="q-pa-none bg-positive">
      <router-view></router-view>
    </q-card>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
