<template>
  <q-card-section>
    <text-under-highlight text="거래유형"></text-under-highlight>
    <!-- selection of choices | 선택의 선택 -->
    <div class="selection row q-mt-lg">
      <q-btn
        v-for="(transaction, i) of transactions"
        :key="i"
        flat
        class="col-3 nanum-square"
        :class="{ selected: selected === transaction.label }"
        :label="transaction.label"
        @click="changeValue(transaction.value)"
      />
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
      transactions: [
        { value: "", label: "전체" },
        { value: "SALE", label: "매매" },
        { value: "RENT", label: "전세" }
        // { value: "", label: "월세" }
      ]
    };
  },
  methods: {
    changeValue(val) {
      this.selected = val;
      this.$emit("select", val);
      // this.$store.dispatch('setTypeSale', val);
    }
  },
  mounted() {
    this.selected = this.$store.state.search.typeSale;
  }
};
</script>

<style lang="scss" scoped>
.selection {
  font-size: 15px;
  line-height: 24px; /* identical to box height, or 160% */
  text-align: center;
  letter-spacing: -1.125px; /* Font/50 */
  color: #1a1a1a;
  border: 1px solid rgba(128, 128, 128, 0.384);
  border-radius: 8px;
  .q-btn {
    border-right: 1px solid rgba(128, 128, 128, 0.274);
    border-left: 1px solid rgba(128, 128, 128, 0.137);
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
</style>
