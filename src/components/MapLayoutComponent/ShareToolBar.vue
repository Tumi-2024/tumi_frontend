<template>
  <q-card-section class="toolbar">
    <q-btn flat padding="0px 8px 0 16px" class="row" :to="{ name: 'map_city' }">
      <div>
        <q-icon name="keyboard_backspace" size="24px" class="q-mr-sm"></q-icon>
      </div>
      <q-separator vertical inset />
      <div class="heading-nav-bar q-ml-sm">동대문구 전농동</div>
    </q-btn>

    <!-- Right side starts here -->
    <div class="flex-row">
      <q-btn flat padding="0 8px" class="bg-white">
        <q-icon size="44px">
          <img src="~assets/icons/like.svg" alt="" />
        </q-icon>
      </q-btn>

      <q-btn flat padding="0 8px" class="bg-white">
        <q-icon size="44px">
          <img src="~assets/icons/share.svg" alt="" />
        </q-icon>
      </q-btn>
    </div>
  </q-card-section>
</template>
is_public_friend":true,"is_reply":true,"snackzones":,"user":4
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
  padding: 0;
  background: white;
}
.heading-nav-bar {
  font-family: "notosanskr-medium";
  font-weight: 500;
  font-size: 17px;
  line-height: 44px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
}
</style>
