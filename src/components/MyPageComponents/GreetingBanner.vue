<template>
  <q-card-section class="greeting-banner notosanskr-regular">
    <div class="row justify-between">
      <div class="column" style="flex: 1">
        <div>고객님</div>
        <div>안녕하세요 !</div>
      </div>
      <div>
        <q-btn
          @click="redirectToAdmin"
          color="primary"
          style="margin-top: -50px"
        >
          관리자 페이지
        </q-btn>
      </div>
    </div>
  </q-card-section>
</template>

<script>
export default {
  methods: {
    redirectToAdmin() {
      window.open("https://admin.tumi.sunwook.com/admin/", "_blank");
    }
  }
};
</script>

<style scoped>
.greeting-banner {
  padding-top: 28px;
  width: 100%;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -1.8px;
  color: #1a1a1a;
}
</style>
