<template>
  <q-card-section>
    <div class="q-pa-none row justify-between items-center nanum-square">
      <text-under-highlight text="월세"></text-under-highlight>
      <q-btn
        flat
        class="float-right q-ma-none q-pa-none"
        color="white"
        padding="0px 10px"
        text-color="secondary"
        label="전체"
        @click="selected = '전체'"
      />
    </div>

    <div class="selection row q-my-lg">
      <q-btn
        v-for="(price, i) of prices"
        :key="i"
        flat
        class="col-2 nanum-square"
        :class="{ selected: selected === price && selected != '' }"
        :label="price"
        @click="changePriceText(price)"
      />
    </div>

    <q-separator />

    <div class="specified-amount q-mt-lg q-mb-sm">
      <div class="title nanum-square">
        총액
        <span class="notosanskr-regular">(만원)</span>
      </div>

      <div class="input-section row items-center">
        <div class="col-5 row items-center">
          <input
            type="text"
            name="minimum-amount"
            class="full-width"
            placeholder="최소금액"
            v-model="max"
            @change="changeValue"
          />
        </div>
        <div
          class="col-2 text-weight-bolder text-center"
          style="font-size: 24px"
        >
          ~
        </div>
        <div class="col-5 row items-center">
          <input
            type="text"
            name="minimum-amount"
            class="full-width"
            placeholder="최대금액"
            v-model="min"
            @change="changeValue"
          />
        </div>
      </div>
    </div>
  </q-card-section>
</template>

<script>
import TextUnderHighlight from "components/Utilities/TextUnderHighlight";

export default {
  components: {
    "text-under-highlight": TextUnderHighlight
  },
  data() {
    return {
      selected: "전체",
      min: null,
      max: null,
      prices: [
        "전체",
        "~20",
        "20",
        "30",
        "40",
        "50",
        "60",
        "70",
        "80",
        "90",
        "1백",
        "2백",
        "3백",
        "4백",
        "5백",
        "6백",
        "7백",
        "8백~"
      ]
    };
  },
  methods: {
    changePriceText(text) {
      this.selected = text;
      this.$emit("select", {
        text: this.selected,
        min: this.min,
        max: this.max
      });
    },
    changeValue(val) {
      this.$emit("select", {
        selected: this.selected,
        min: this.min,
        max: this.max
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.selection {
  font-size: 15px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -1.125px;
  color: #1a1a1a;
  border: 1px solid rgba(128, 128, 128, 0.247);
  border-radius: 8px;
  .q-btn {
    border: 1px solid rgba(128, 128, 128, 0.171);
    border-top: none;
    height: 44px;
    &.selected {
      border: 2px solid #fc5b2e;
      border-radius: 8px;
      font-weight: 500;
      font-size: 15px;
      line-height: 24px;
      text-align: center;
      letter-spacing: -1.125px;
      color: #ff5100;
    }
  }
}
.specified-amount {
  .title {
    span {
      font-size: 14px;
      line-height: 22px; /* identical to box height, or 157% */
      letter-spacing: -1.05px; /* Font/40 */
      color: #3a3a3a;
    }
  }
  .input-section {
    margin-top: 20px;
    input {
      border: 1px solid #d5d5d5;
      border-radius: 8px;
      font-size: 15px;
      line-height: 24px; /* identical to box height, or 160% */
      text-align: right;
      letter-spacing: -1.125px; /* Font/10 */
      color: #a0a0a0;
      padding: 10px 16px;
      &::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        font-weight: 900;
      }
      &::-moz-placeholder {
        /* Firefox 19+ */
        font-weight: 900;
      }
    }
  }
}
</style>
