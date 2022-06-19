<template>
  <q-card-section>
    <div
      class="title q-pa-none row justify-between items-center notosanskr-medium"
    >
      <div class="title row">
        <text-under-highlight text="전용면적" />
      </div>
      <q-btn
        flat
        class="float-right q-ma-none q-pa-none"
        color="white"
        padding="0px 10px"
        text-color="secondary"
      />
    </div>

    <div class="selection row q-mt-lg" style="color: #1a1a1a">
      <q-btn
        v-for="(property, i) of getProperties"
        :key="i"
        flat
        class="notosanskr-medium"
        style="flex: 1"
        :style="{ 'background-color': property.disabled ? '#e9e9e9' : '' }"
        :disable="property.disabled"
        :class="{ selected: selectValue.value === property.value }"
        :label="property.label"
        @click="changeValue(property)"
      />
    </div>
    <div class="selection col q-mt-lg items-center">
      <div class="flex justify-start">
        <q-radio v-model="isM2" label="평 수" :val="false" />
        <q-radio v-model="isM2" label="㎡" :val="true" />
      </div>
      <div class="row q-mt-md">
        <q-input
          :value="getUnit(selectValue.min)"
          @change="onChangeMin"
          filled
          dense
          :label="`최소 ${isM2 ? '㎡' : '평 수'}`"
          maxlength="7"
          style="width: 40%"
        />
        <span style="font-size: calc((30 / 1000) * 100vh)" class="q-mx-lg">
          ~
        </span>
        <q-input
          :value="getUnit(selectValue.max)"
          @change="onChangeMax"
          filled
          dense
          :label="`최대 ${isM2 ? '㎡' : '평 수'}`"
          maxlength="7"
          style="width: 40%"
        />
      </div>
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
          {{ isM2 ? preset.labelM2 : preset.label }}
        </div>
      </q-btn>
    </div>
  </q-card-section>
</template>
<script>
import TextUnderHighlight from "components/Utilities/TextUnderHighlight";
import { mapActions, mapGetters } from "vuex";
import { toMoneyString } from "src/utils";

export default {
  components: {
    "text-under-highlight": TextUnderHighlight
  },
  data() {
    return {
      selectValue: {},
      isM2: false,
      properties: [
        {
          label: "전용면적",
          value: "size_dedicated_area_m2",
          type: ["APARTMENT", "ALLIANCE", "OFFICETEL", "COMMERCIAL", "noname02"]
        },
        {
          label: "연면적",
          value: "size_gross_floor_area",
          type: ["SINGLE", "noname01", "COMMERCIAL"]
        },
        {
          label: "대지면적",
          value: "size_land_area",
          type: ["SINGLE", "noname01", "LAND"]
        },
        {
          label: "대지권면적",
          value: "size_land_area2",
          type: ["ALLIANCE"]
        }
      ],
      presets: [
        { label: "10평 이하", labelM2: "33㎡ 이하", value: 10 * 3.3 },
        { label: "10평대", labelM2: "66㎡ 이하", value: 20 * 3.3 },
        { label: "20평대", labelM2: "99㎡ 이하", value: 30 * 3.3 },
        { label: "30평대", labelM2: "132㎡ 이하", value: 40 * 3.3 },
        { label: "50평 이상", labelM2: "330㎡ 이상", value: 100 * 3.3 }
      ]
    };
  },

  computed: {
    ...mapGetters("searchOption", ["area", "categories", "isMultiSelect"]),
    ...mapGetters("searchQuery", ["getQueryString", "getOption"]),
    getUnit() {
      return (value) => {
        if (value === undefined) {
          return undefined;
        }
        if (!this.isM2) {
          return value / 3.3;
        } else {
          return value;
        }
      };
    },
    getProperties() {
      const hasValue = (parentArray, childArray) => {
        return parentArray.some((parent) => {
          return childArray.some((child) => {
            return parent === child;
          });
        });
      };

      return this.properties.map((obj) => {
        return {
          ...obj,
          disabled: !this.isMultiSelect
            ? !hasValue(obj.type, this.categories)
            : false
        };
      });
    }
  },
  methods: {
    toMoneyString,
    ...mapActions("searchQuery", ["setQuery", "initializeQuery"]),
    ...mapActions("searchOption", ["setArea"]),

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
    changeValue({ value }) {
      if (this.selectValue.value === value) {
        this.selectValue = {};
      } else {
        this.selectValue = {
          ...this.selectValue,
          value
        };
      }
    },
    onChangeMin(e) {
      let _value = Number(e.target.value);
      if (!this.isM2) {
        _value = _value / 3.3;
      }
      this.selectValue = {
        ...this.selectValue,
        min: _value
      };
    },
    onChangeMax(e) {
      let _value = Number(e.target.value);
      if (!this.isM2) {
        _value = _value / 3.3;
      }
      this.selectValue = {
        ...this.selectValue,
        max: _value
      };
    },
    save() {
      console.log(this.selectValue);
      this.setArea(this.selectValue);
    },
    initialize() {
      this.setArea({
        value: undefined,
        min: undefined,
        max: undefined
      });
      this.selectValue = {
        value: undefined,
        min: undefined,
        max: undefined
      };
    }
  },
  beforeMount() {
    this.selectValue = { ...this.area };
  }
};
</script>

<style lang="scss" scoped>
.title {
  span {
    color: #a0a0a0;
  }
}
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
