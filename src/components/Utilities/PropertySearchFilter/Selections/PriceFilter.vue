<template>
  <q-card-section>
    <text-under-highlight text="주택 가격" />
    <!-- selection of choices | 선택의 선택 -->
    <div class="selection row q-mt-lg items-center">
      <q-input
        :value="toMoneyString(selected[0].value)"
        @focus="selected[0].value = 0"
        @change="onChangeMin"
        filled
        label="최소"
        maxlength="7"
        style="max-width: 200px"
      />
      <span style="font-size: 30px;" class="q-mx-lg">~</span>
      <q-input
        :value="toMoneyString(selected[1].value)"
        @focus="selected[1].value = 0"
        @change="onChangeMax"
        filled
        label="최대"
        maxlength="7"
        style="max-width: 200px"
      />
    </div>
  </q-card-section>
</template>

<script>
import TextUnderHighlight from "components/Utilities/TextUnderHighlight";
import { toMoneyString } from "src/utils";
import { VMoney } from "v-money";
import { mapGetters } from "vuex";
export default {
  directives: { money: VMoney },
  components: {
    "text-under-highlight": TextUnderHighlight
  },
  computed: {
    ...mapGetters("searchQuery", ["getQueryString", "getOption"])
  },
  data() {
    return {
      selected: []
    };
  },
  created() {
    this.selected = JSON.parse(JSON.stringify(this.getOption("prices")));
    console.log(this.selected)
  },
  methods: {
    toMoneyString: toMoneyString,
    select(val) {
      this.$emit("selectDetail", val);
    },
    onChangeMin(e) {
      console.log(e.target.value);
      this.selected = [
        {
          label: "최저가",
          key: "min",
          value: e.target.value
        },
        this.selected[1]
      ];
      this.$emit("select", this.selected, "prices");
    },
    onChangeMax(e) {
      this.selected = [
        this.selected[0],
        {
          label: "최고가",
          key: "max",
          value: e.target.value
        }
      ];
      this.$emit("select", this.selected, "prices");
    }
  }
};
</script>

<style lang="scss" scoped>
.selection {
  font-size: 15px;
  line-height: 24px; /* identical
to box height, or 160% */
  text-align: center;
  letter-spacing: -1.125px; /*
Font/50 */
  color: #1a1a1a;
  .q-btn {
    border: 1px solid rgba(128, 128, 128, 0.274);
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
