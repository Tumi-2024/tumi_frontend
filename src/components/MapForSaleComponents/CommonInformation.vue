<template>
  <q-card>
    <q-card-section class="heading-title">
      {{ title }}
    </q-card-section>
    <q-card-section class="bg-white q-pt-none">
      <div class="row table">
        <div
          class="col-md-4 col-sm-6 col-12 row"
          :class="item.class"
          v-for="(item, i) of getOptions"
          :key="i"
        >
          <div class="q-pa-sm label flex">
            <span
              class="information text-bold self-center"
              style="word-break: keep-all"
            >
              {{ item.label }}
            </span>
          </div>
          <a
            class="information sub flex items-center q-px-sm"
            :href="`tel:${item.value}`"
            v-if="item.phone"
          >
            {{ item.value }}
          </a>
          <span
            class="information sub flex items-center q-px-sm"
            :class="{
              'text-grey text-bold': getDisabledLabel(item.value)
            }"
            v-else
          >
            {{ item.value }}
          </span>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    getOptions: {
      type: Array
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
.table {
  border-top: 2px solid #555555;
  border-bottom: 1px solid #e9e9e9;
  .borderb {
    border-bottom: 1px solid #e9e9e9;
  }
  > .row {
    flex-wrap: nowrap;

    @media (max-width: 599px) {
      &:not(:nth-last-child(-n + 1)) {
        border-bottom: 1px solid #e9e9e9;
      }
    }
    &:not(:nth-last-child(-n + 2)) {
      border-bottom: 1px solid #e9e9e9;
    }
    > .label {
      /* display:flex; */
      flex-shrink: 0;
      background-color: #f6f6f6;
      width: 130px;
    }
  }
}
.information {
  font-family: "nanum-square";
  font-size: 14px;
  line-height: 16px;
  color: #707070;
  margin-left: 0px;
  word-break: break-all;
  &.sub {
    word-break: keep-all;
  }
}
.heading-title {
  font-family: "nanum-square";
  font-style: normal;
  font-weight: bold;
  font-size: 17px;
  line-height: 19px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
}
</style>
