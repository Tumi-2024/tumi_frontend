<template>
  <q-dialog v-model="dialog" seamless position="bottom">
    <q-card>
      <q-card-section class="q-pa-none">
        <q-btn flat class="full-width notosanskr-medium">
          종로구 매물보기 <span style="color: #FF5A00">1,380</span>
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: ""
    };
  }
};
</script>

<style lang="scss" scoped>
.q-card {
  width: 100%;
  max-width: 1000px;
  height: auto;
  // border-radius: 16px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}
.q-btn {
  font-weight: 500;
  font-size: 16px;
  line-height: 48px;
  text-align: center;
  letter-spacing: -1.2px;
  color: #1a1a1a;
}
</style>
