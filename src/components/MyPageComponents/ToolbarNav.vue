<template>
  <q-card-section class="toolbar notosanskr-medium q-pa-none q-px-md">
    <div>
      <q-icon name="keyboard_backspace" size="24px"></q-icon>
      <q-btn flat>내 관심 매물</q-btn>
    </div>
    <q-btn flat class="bg-white add-area" v-if="$route.name == 'area'">
      <q-icon size="24px">
        <img src="~assets/icons/add-area.svg" alt="" />
      </q-icon>
      로그인</q-btn
    >
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
.add-area {
  font-weight: 500;
  font-size: 15px;
  line-height: 44px;
  text-align: right;
  letter-spacing: -1.2px;
  color: #1a1a1a;
}
</style>
