<template>
  <q-dialog v-model="modal" seamless position="bottom" class=" bg-transparent">
    <q-card flat class=" notosanskr-regular bg-transparent">
      <q-card-section class="row justify-center q-pa-none">
        <q-btn class="bg-primary">
          종로구 지도로 보기
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    modal: Boolean
  }
};
</script>

<style scoped>
.q-card {
  width: 100%;
  max-width: 1000px;
  border-radius: 16px;
  margin-bottom: 36px;
}
.q-btn {
  width: 196px;
  font-weight: 500;
  font-size: 17px;
  line-height: 52px;
  text-align: center;
  letter-spacing: -1.27px;
  color: #ffffff;
  border-radius: 8px;
}
</style>
