<template>
  <q-card-section class="toolbar notosanskr-medium q-pa-none">
    <div>
      <q-btn
        flat
        padding="0px 16px"
        :to="{ name: 'recently_seen' }"
        class="row items-center"
        style="height: 44px"
      >
        <q-icon name="keyboard_backspace" size="24px" class="q-mr-sm"></q-icon>
        <q-separator vertical inset class="q-mr-sm"></q-separator>
        <div>최근 본 매물</div>
      </q-btn>
    </div>
  </q-card-section>
</template>

<script>
export default {};
</script>

<style scoped>
.toolbar {
  height: 44px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
