<template>
  <div class="q-px-md">
    <q-input
      v-model="text"
      class="notosanskr-regular"
      label="지역명, 단지명, 지하철역, 주소 검색"
      color="black"
      style="border-bottom: 2px solid #000"
    >
      <template v-slot:append>
        <!-- <q-icon name="close" @click="text = ''" class="cursor-pointer" /> -->
        <q-btn
          flat
          class="cancel-text q-pr-sm notosanskr-medium"
          @click="text = ''"
          >취소</q-btn
        >
      </template>
    </q-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ""
    };
  }
};
</script>

<style scoped>
.cancel-text {
  font-weight: 500;
  font-size: 15px;
  line-height: 26px;
  text-align: right;
  letter-spacing: -1.125px;
  color: #a0a0a0;
}
</style>
