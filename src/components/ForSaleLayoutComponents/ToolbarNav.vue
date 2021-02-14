<template>
  <q-card
    flat
    square
    class="row justify-between items-center q-px-md"
    style="height: 60px"
  >
    <q-card-section class="toolbar">
      <q-btn flat padding="0px 8px 0 16px" class="row" @click="$router.go(-1)">
        <div>
          <q-icon
            name="keyboard_backspace"
            size="24px"
            class="q-mr-sm"
          ></q-icon>
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
  </q-card>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
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
