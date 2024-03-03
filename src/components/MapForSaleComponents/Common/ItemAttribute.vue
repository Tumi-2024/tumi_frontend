<template>
  <div
    flat
    class="col-3 information-btn q-py-lg"
    :class="{ 'border-bottom-dashed': borderBottom }"
  >
    <div class="column justify-center content-center items-center">
      <q-icon size="32px">
        <slot name="icon"></slot>
      </q-icon>
      <div class="title q-mt-sm" v-if="!value">
        <q-icon size="20px">
          <img src="~/assets/icons/empty.svg" />
        </q-icon>
      </div>
      <div
        class="title q-mt-sm"
        v-else
        :class="{ 'text-grey text-bold': getDisabledLabel(value) }"
      >
        {{ value }}
      </div>
      <div class="sub-title q-mt-xs">{{ label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    borderBottom: {
      type: Boolean,
      default: false
    },
    iconSrc: {
      type: String,
      default: ""
    },
    value: {
      type: [Number, String]
    },
    label: {
      type: String,
      default: ""
    }
  },
  computed: {
    getDisabledLabel() {
      return (value) => {
        return value === "비공개";
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.information-btn {
  .title {
    font-family: "nanum-square";
    font-style: normal;
    font-weight: 500;
    text-align: center;
    letter-spacing: -1.2px;
    color: #1a1a1a;
    @media  (max-width: 599px) {
      font-size: 12px;
      line-height: 18px;
    }
    @media (min-width: 600px) {
      font-size: 16px;
      line-height: 24px;
    }
  }
  .sub-title {
    font-family: "nanum-square";
    font-style: normal;
    font-weight: 500;

    text-align: center;
    letter-spacing: -0.975px;
    color: #707070;
    @media  (max-width: 599px) {
      font-size: 11px;
      line-height: 16px;
    }
    @media (min-width: 600px) {
      font-size: 13px;
      line-height: 20px;
    }
  }

  &.border-bottom-dashed {
    border-bottom: 2px dashed rgba(187, 186, 186, 0.466);
  }
}
</style>
