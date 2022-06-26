<template>
  <q-card-section>
    <text-under-highlight :text="label" />
    <!-- selection of choices | 선택의 선택 -->
    <div class="selection row q-mt-lg items-center">
      <q-input
        dense
        :value="selectValue.min"
        @change="onChangeMin"
        filled
        label="최소"
        maxlength="7"
        style="width: 40%"
      />
      <span style="font-size: calc((30 / 1000) * 100vh)" class="q-mx-lg">
        ~
      </span>
      <q-input
        dense
        :value="selectValue.max"
        @change="onChangeMax"
        filled
        label="최대"
        maxlength="7"
        style="width: 40%"
      />
    </div>
    <div style="width: 100%" class="q-mt-lg selection">
      <q-btn
        v-for="(preset, index) of presets"
        :key="index"
        dense
        :style="[{ width: `calc(100% / ${presets.length})` }]"
        @click="onClickPreset(preset)"
        :class="{
          'selected bg-primary text-white':
            preset.value === selectValue.max ||
            preset.value === selectValue.min,
          'bg-orange-2 text-black':
            preset.value < selectValue.max && preset.value > selectValue.min
        }"
      >
        <div
          class="column items-center"
          style="font-size: calc((12 / 1000) * 100vh)"
        >
          {{ preset.label }}
        </div>
      </q-btn>
    </div>
  </q-card-section>
</template>

<script>
import TextUnderHighlight from "components/Utilities/TextUnderHighlight";
import { toMoneyString } from "src/utils";
import { VMoney } from "v-money";

import { mapGetters, mapActions } from "vuex";
export default {
  directives: { money: VMoney },
  components: {
    "text-under-highlight": TextUnderHighlight
  },
  props: {
    label: {
      type: String,
      require: true
    },
    keyName: {
      type: String,
      require: true
    }
  },
  computed: {
    ...mapGetters("searchQuery", ["getQueryString", "getOption"]),
    ...mapGetters("queryBuilder", ["price", "initPrice", "isMultiSelect"])
  },
  data() {
    return {
      isSelectMin: false,
      selectValue: {},
      presets: [
        { label: "5천 이하", value: 5000 },
        { label: "1억", value: 10000 },
        { label: "3억", value: 30000 },
        { label: "5억", value: 50000 },
        { label: "10억", value: 100000 }
      ]
    };
  },
  methods: {
    ...mapActions("queryBuilder", ["setPrice", "setInitPrice"]),

    toMoneyString: toMoneyString,
    select(val) {
      this.$emit("selectDetail", val);
    },
    onClickPreset({ value }) {
      // 처음에 누르면 이하 모두 선택
      console.log(value, this.selectValue);
      if (!this.selectValue.min && !this.selectValue.max) {
        this.selectValue.max = value;
        this.selectValue.min = 0;
      } else if (this.selectValue.min === 0 && this.selectValue.max === value) {
        this.selectValue.min = undefined;
        this.selectValue.max = undefined;
      } else if (this.selectValue.max === value) {
        this.selectValue.max = value;
        this.selectValue.min = 0;
      } else if (this.selectValue.min === 0) {
        this.selectValue.min = value;
      } else if (this.selectValue.min && this.selectValue.max) {
        this.selectValue.min = 0;
        this.selectValue.max = value;
      } else {
        if (this.selectValue.max < value) {
          this.selectValue.min = 0;
        }
        this.selectValue.max = value;
      }
      if (this.selectValue.max < this.selectValue.min) {
        const _temp = this.selectValue.max;
        this.selectValue.max = this.selectValue.min;
        this.selectValue.min = _temp;
      }
    },

    onChangeMin(e) {
      this.selectValue = {
        ...this.selectValue,
        min: Number(e.target.value)
      };
    },
    onChangeMax(e) {
      this.selectValue = {
        ...this.selectValue,
        max: Number(e.target.value)
      };
    },
    save() {
      console.log(this.selectValue);
      if (this.keyName === "prices") {
        this.setPrice(this.selectValue);
      } else {
        this.setInitPrice(this.selectValue);
      }
    },

    initialize() {
      if (this.keyName === "prices") {
        this.setPrice({
          value: undefined,
          min: undefined,
          max: undefined
        });
      } else {
        this.setInitPrice({
          value: undefined,
          min: undefined,
          max: undefined
        });
      }

      this.selectValue = {
        value: undefined,
        min: undefined,
        max: undefined
      };
    }
  },
  beforeMount() {
    console.log(this.keyName);
    if (this.keyName === "prices") {
      this.selectValue = { ...this.price };
    } else {
      this.selectValue = { ...this.initPrice };
    }
  }
};
</script>

<style lang="scss" scoped>
.selection {
  font-size: 15px;
  line-height: 24px;
  .q-btn {
    border: 2px solid rgba(128, 128, 128, 0.171);
    height: 44px;
    border-radius: 0;
    &.selected {
      border: 2px solid #fc5b2e;
      text-align: center;
      color: #ff5100;
    }
  }
}
</style>
