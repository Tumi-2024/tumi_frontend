<template>
  <div
    class="row"
    style="width: 192px; overflow-y: hidden"
    @click="$emit('viewArea')"
  >
    <q-img
      src="~assets/icons/house_orange.svg"
      spinner-color="white"
      style="height: 20px; max-width: 20px"
      class="q-mr-xs q-mt-xs"
    />

    <div class="col">
      <div class="info-heading notosanskr-medium">
        {{ price }}
      </div>
      <div class="row bottom-toolbar notosanskr-regular">
        <div class="info-text" v-if="badges.type">{{ badges.type }}</div>
        <q-badge class="re-develop bg-white q-mr-sm" v-if="badges.redevelop">
          <q-icon>
            <img src="~assets/icons/redevelop.svg" alt="" srcset="" />
          </q-icon>
        </q-badge>
        <q-badge
          color="white"
          text-color="primary"
          label="매매"
          v-if="badges.charter"
        />
        <q-badge
          color="white"
          text-color="secondary"
          label="전세"
          v-if="badges.trading"
        />
        <q-separator vertical class="q-ma-xs" />
        <div class="info-text" v-if="badges.area">{{ badges.area }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: String,
      default: ""
    },
    badges: {
      type: Object,
      default: () => ({
        type: "단독다가구",
        redevelop: true,
        charter: false,
        trading: false,
        area: "0평"
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.info-heading {
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  letter-spacing: -1.125px;
  color: #1a1a1a;
  padding-bottom: 4px;
}
.bottom-toolbar {
  display: flex;
  align-items: center;
  .info-text {
    font-weight: 500;
    font-size: 13px;
    line-height: 20px;
    letter-spacing: -0.97px;
    color: #707070;
  }
}
.q-badge {
  font-size: 12px;
  height: 20px;
  text-align: center;
  letter-spacing: -0.9px;
  margin: auto 2px;
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 4px;
  font-weight: 500;
  color: #909090;
  background: white;
}
</style>
