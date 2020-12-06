<template>
  <div>
    <q-card flat style="height: 44px">
      <q-card-section class="toolbar notosanskr-medium q-pa-none q-px-md">
        <div class="row items-center">
          <q-btn flat padding="0px">
            <q-icon
              name="keyboard_backspace"
              size="24px"
              class="q-mr-sm"
            ></q-icon>
          </q-btn>
          <q-separator vertical inset></q-separator>
          <q-btn flat>지역선택</q-btn>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.toolbar {
  font-weight: 500;
  font-size: 17px;
  line-height: 44px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
}
</style>
