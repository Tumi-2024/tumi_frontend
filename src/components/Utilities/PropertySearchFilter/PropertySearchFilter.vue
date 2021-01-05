<template>
  <div>
    <q-btn
      unelevated
      outline
      color="primary"
      padding="8px"
      style="border-radius: 8px; height: 36px;"
      class="q-mx-xs"
      @click="modal = true"
    >
      <q-icon size="20px">
        <img src="~assets/icons/Filter.svg" />
      </q-icon>
    </q-btn>
    <!-- Dialog Section -->
    <q-dialog v-model="modal" position="bottom">
      <q-card class="notosanskr-regular">
        <q-card-section
          class="head-section bg-white notosanskr-medium row justify-between items-center"
        >
          <div>검색 필터</div>
          <q-icon name="close" size="24px" @click="modal = false" />
        </q-card-section>
        <!-- Transactio type | 거래유형 -->
        <transaction-type></transaction-type>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import TransactionType from "./TransactionType";
export default {
  components: {
    "transaction-type": TransactionType
  },
  data() {
    return {
      modal: false
    };
  }
};
</script>

<style lang="scss" scoped>
.q-card {
  width: 100%;
  max-width: 1000px;
  height: 100vh;
  border-radius: 16px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background: #f0f0f0;
}
.head-section {
  font-weight: 500;
  font-size: 17px;
  line-height: 44px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
  height: 44px;
}
</style>
