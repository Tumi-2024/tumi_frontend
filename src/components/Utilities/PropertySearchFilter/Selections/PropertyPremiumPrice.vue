<template>
  <q-card-section>
    <div class="q-pa-none row justify-between items-center notosanskr-medium">
      <text-under-highlight text="프리미엄가"></text-under-highlight>
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
        :class="{ selected: selected === price && selected != '' }"
        :label="price"
        @click="selected = price"
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
  data() {
    return {
      selected: "전체",
      prices: [
        "전체",
        "~1천",
        "1천",
        "2천",
        "3천",
        "4천",
        "5천",
        "6천",
        "7천",
        "8천",
        "9천",
        "1억",
        "2억",
        "3억",
        "4억",
        "5억",
        "6억",
        "7억",
        "8억",
        "9억",
        "10억",
        "11억",
        "12억",
        "13억",
        "14억",
        "15억",
        "16억~",
        "",
        "",
        ""
      ]
    };
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
