<template>
  <q-item-section>
    <div
      class="title"
      @mouseover="
        () => {
          isHover = true;
        }
      "
      @mouseout="
        () => {
          isHover = false;
        }
      "
    >
      <div
        class="area-name"
        :class="[this.textClass, { hover: isHover }]"
        @click="goToAdmin"
      >
        <q-badge outline color="primary" v-show="isRedevelop">재개발</q-badge>
        {{ address.replace(/대한민국/gi, "") }}
      </div>
      <div
        class="area-name sub"
        :class="[{ hover: isHover }]"
        @click="goToAdmin"
      >
        {{ building }}
        <span style="margin-left: 20px" v-show="isHover">
          >> 매물관리 화면
        </span>
      </div>
    </div>
  </q-item-section>
</template>
<script>
export default {
  props: {
    textClass: String,
    address: {
      type: String,
      required: true
    },
    building: {
      type: String,
      default() {
        return "아파트단지/주택/건물 명";
      }
    },
    houseId: {
      type: Number,
      required: false,
      default: 0
    },
    redirect: {
      type: Boolean,
      required: false,
      default: false
    },
    isRedevelop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isHover: false
    };
  },
  methods: {
    goToAdmin() {
      if (!this.redirect) {
        return;
      }
      window.location = `${process.env.ADMIN}realestates/house/${this.houseId}/change/`;
    }
  }
};
</script>
<style lang="scss">
.title {
  .area-name {
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -1.05px;
    color: #707070;
    margin-left: 0px;
    cursor: pointer;

    &.hover {
      font-weight: bold;
    }
    &.sub {
      font-size: 13px;
      &.hover {
        font-weight: bold;
      }
    }
  }
}
</style>
@
