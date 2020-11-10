<template>
  <q-card-section class="toolbar notosanskr-medium q-pa-none q-px-md">
    <div class="row items-center">
      <q-btn flat padding="0px" :to="{ name: 'my_page' }">
        <q-icon name="keyboard_backspace" size="24px" class="q-mr-sm"></q-icon>
      </q-btn>
      <q-separator vertical inset></q-separator>
      <q-btn flat>내 관심 매물</q-btn>
    </div>
    <q-btn flat class="bg-white add-area" v-if="$route.name == 'area'">
      <q-icon size="24px">
        <img src="~assets/icons/add-area.svg" alt="" />
      </q-icon>
      로그인
    </q-btn>

    <q-btn
      flat
      class="bg-white add-area"
      v-if="$route.name == 'property_interest'"
    >
      <q-icon size="24px">
        <img src="~assets/icons/Regular.svg" alt="" />
      </q-icon>
    </q-btn>
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
