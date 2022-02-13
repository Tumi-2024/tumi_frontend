<template>
  <q-card-section>
    <div class="q-pa-none row items-center justify-between notosanskr-medium">
      <text-under-highlight text="매매가"></text-under-highlight>
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
        class="col-2 notosanskr-medium"
        :class="{ selected: selected }"
        :label="price.label"
        @click="changePriceText(price)"
      />
    </div>

    <q-separator />

    <div class="specified-amount q-mt-lg q-mb-sm">
      <div class="title notosanskr-medium">
        총액
        <span class="notosanskr-regular">(만원)</span>
      </div>

      <div class="input-section row items-center">
        <div class="col-5 row items-center">
          <input
            type="text"
            v-model="min"
            @change="changeValue"
            name="minimum-amount"
            class="full-width"
            placeholder="최소금액"
          />
        </div>
        <div
          class="col-2 text-weight-bolder text-center"
          style="font-size: 24px;"
        >
          ~
        </div>
        <div class="col-5 row items-center">
          <input
            type="text"
            v-model="max"
            @input="changeValue"
            name="minimum-amount"
            class="full-width"
            placeholder="최대금액"
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
  mounted() {
    this.selected = this.$store.state.search.salePrice.text;
    this.min = this.$store.state.search.salePrice.min;
    this.max = this.$store.state.search.salePrice.max;
  },
  computed: {
  },
  data() {
    return {
      selected: "전체",
      min: null,
      max: null,
      prices: [
        { label: "전체", min: 0, max: 1000 * 1000 * 1000 * 1000 },
        { label: "~1억", min: 0, max: 10 * 1000 },
        { label: "1억", min: 10 * 1000 - 1, max: 20 * 1000 - 1 },
        { label: "2억", min: 20 * 1000 - 1, max: 30 * 1000 - 1 },
        { label: "3억", min: 30 * 1000 - 1, max: 40 * 1000 - 1 },
        { label: "4억", min: 40 * 1000 - 1, max: 50 * 1000 - 1 },
        { label: "5억", min: 50 * 1000 - 1, max: 60 * 1000 - 1 },
        { label: "6억", min: 60 * 1000 - 1, max: 70 * 1000 - 1 },
        { label: "7억", min: 70 * 1000 - 1, max: 80 * 1000 - 1 },
        { label: "8억", min: 80 * 1000 - 1, max: 90 * 1000 - 1 },
        { label: "9억", min: 90 * 1000 - 1, max: 100 * 1000 - 1 },
        { label: "10억", min: 100 * 1000 - 1, max: 110 * 1000 - 1 },
        { label: "11억", min: 110 * 1000 - 1, max: 120 * 1000 - 1 },
        { label: "12억", min: 120 * 1000 - 1, max: 130 * 1000 - 1 },
        { label: "13억", min: 130 * 1000 - 1, max: 140 * 1000 - 1 },
        { label: "14억", min: 140 * 1000 - 1, max: 150 * 1000 - 1 },
        { label: "15억", min: 150 * 1000 - 1, max: 160 * 1000 - 1 },
        { label: "16억~", min: 160 * 1000 - 1, max: 100 * 1000 * 1000 }
      ]
    };
  },
  methods: {
    changePriceText(text) {
      this.selected = text;
      this.$emit('select', {
        text: this.selected,
        min: this.min,
        max: this.max
      })
    },
    changeValue(val) {
      this.$emit('select', {
        selected: this.selected,
        min: this.min,
        max: this.max
      })
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
