<template>
  <q-card-section>
    <div class="title q-pa-none row justify-between items-center nanum-square">
      <div class="title row">
        <text-under-highlight text="면적" />
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
        v-for="(property, i) of this.properties"
        flat
        :key="i"
        class="nanum-square"
        style="flex: 1"
        :style="{ 'background-color': getDisabled(property) ? '#e9e9e9' : '' }"
        :disable="getDisabled(property)"
        :class="{ selected: (selectValue.value === property.value) || selectValue.value === property.valueHouse}"
        :label="property.label"
        @click="changeValue(property)"
      />
    </div>
    <div class="selection col q-mt-lg items-center">
      <div class="flex justify-start">
        <q-radio v-model="isM2" label="m²" :val="true" />
        <q-radio v-model="isM2" label="평 수" :val="false" />
      </div>
      <div class="row q-mt-md">
        <q-input
          :value="getUnit(selectValue.min)"
          @change="onChangeMin"
          filled
          dense
          :label="`최소 ${isM2 ? 'm²' : '평 수'}`"
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
          :label="`최대 ${isM2 ? 'm²' : '평 수'}`"
          maxlength="7"
          style="width: 40%"
        />
      </div>
    </div>

    <div style="width: 100%" class="q-mt-lg selection">
      <q-btn
      v-for="(preset, index) of presets"
      :key="index"
      flat
      dense
      :style="[{ width: `calc(100% / ${presets.length / 2})` }]"
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
  props: {
    categories: {
      type: Array,
      require: false,
      default: () => []
    },
    activeAreaType: {
      type: Array,
      require: false,
      default: () => []
    }
  },
  data() {
    return {
      selectValue: {},
      isM2: true,
      properties: [],
      presets: [
        { label: "~10평", labelM2: "~" + 10 * 3.3 + "m²", value: 10 * 3.3 },
        { label: "20평", labelM2: 20 * 3.3 + "m²", value: 20 * 3.3 },
        { label: "30평", labelM2: 30 * 3.3 + "m²", value: 30 * 3.3 },
        { label: "40평", labelM2: 40 * 3.3 + "m²", value: 40 * 3.3 },
        { label: "50평", labelM2: 50 * 3.3 + "m²", value: 50 * 3.3 },
        { label: "60평", labelM2: 60 * 3.3 + "m²", value: 60 * 3.3 },
        { label: "70평", labelM2: 70 * 3.3 + "m²", value: 70 * 3.3 },
        { label: "80평", labelM2: 80 * 3.3 + "m²", value: 80 * 3.3 },
        { label: "90평", labelM2: 90 * 3.3 + "m²", value: 90 * 3.3 },
        { label: "100평", labelM2: 100 * 3.3 + "m²", value: 100 * 3.3 },
        { label: "150평", labelM2: 150 * 3.3 + "m²", value: 150 * 3.3 },
        { label: "150평대 ~", labelM2: 1000 * 3.3 + "m²~", value: 9999 * 3.3 }
      ]
    };
  },
  watch: {
    activeAreaType() {
      this.properties.some(property => {
        if (!this.getDisabled(property)) {
          this.selectValue = {
            value: property.value,
            min: undefined,
            max: undefined
          };
          return true;
        }
      })
    }
  },
  computed: {
    ...mapGetters("search", ["area", "isMultiSelect"]),
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
    getDisabled() {
      return ({ type }) => {
        if (this.activeAreaType.length === 0) return false

        return (!type.some(type => type === this.activeAreaType[0]))
      };
    }
  },
  methods: {
    toMoneyString,
    ...mapActions("search", ["setArea"]),

    select(val) {
      this.$emit("selectDetail", val);
    },
    onClickPreset({ value }) {
      if (!this.selectValue.value) {
        window.alert("면적 종류를 먼저 선택해주세요");
        return;
      }
      // 처음에 누르면 이하 모두 선택
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
      console.log(value)
      this.$emit("select", value);
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
        _value = _value * 3.3;
      }
      this.selectValue = {
        ...this.selectValue,
        min: _value
      };
    },
    onChangeMax(e) {
      let _value = Number(e.target.value);
      if (!this.isM2) {
        _value = _value * 3.3;
      }
      this.selectValue = {
        ...this.selectValue,
        max: _value
      };
    },
    save() {
      this.setArea(this.selectValue);
    },
    initialize() {
      this.selectValue = {
        value: undefined,
        min: undefined,
        max: undefined
      };
    }
  },
  beforeMount() {
    this.initialize()
    if (this.$route.name === 'listTransactions' || this.$route.name === 'map_city_area') {
      this.properties = [
        {
          label: "전용면적",
          value: "size_private",
          valueHouse: "size_dedicated_area_m2",
          type: ["아파트", "연립다세대", "오피스텔", "상업업무용", "입주권"]
        },
        {
          label: "연면적",
          value: "size_yean",
          valueHouse: "size_gross_floor_area",
          type: ["단독다가구", "무허가건축물"]
        },
        {
          label: "대지면적",
          value: "size_daeji",
          valueHouse: "size_land_area",
          type: ["단독다가구", "상업업무용", "토지", "무허가건축물"]
        },
        {
          label: "대지지분(대지권면적)",
          value: "size_land_area_m2",
          valueHouse: 'size_land',
          type: ["연립다세대"]
        }
      ]
    } else {
      this.properties = [
        {
          label: "전용면적",
          value: "size_dedicated_area_m2",
          valueHouse: "size_dedicated_area_m2__range",
          type: ["아파트", "연립다세대", "오피스텔", "상업업무용", "입주권"]
        },
        {
          label: "연면적",
          value: "size_gross_floor_area",
          valueHouse: "size_gross_floor_area__range",
          type: ["단독다가구", "상업업무용", "무허가건축물"]
        },
        {
          label: "대지면적",
          value: "size_land_area",
          valueHouse: "size_land_area__range",
          type: ["단독다가구", "상업업무용", "토지", "무허가건축물"]
        },
        {
          label: "대지지분(대지권면적)",
          value: "size_land",
          valueHouse: 'size_land__range',
          type: ["아파트", "연립다세대", "오피스텔", "상업업무용"]
        }
      ]
    }

    const query = this.$route.query;

    switch (true) {
      case !!query.size_dedicated_area_m2__range:
        this.selectValue = {
          min: Number(query.size_dedicated_area_m2__range.split(",")[0]),
          max: Number(query.size_dedicated_area_m2__range.split(",")[1]),
          value: "size_dedicated_area_m2"
        };
        break;
      case !!query.size_gross_floor_area__range:
        this.selectValue = {
          min: Number(query.size_gross_floor_area__range.split(",")[0]),
          max: Number(query.size_gross_floor_area__range.split(",")[1]),
          value: "size_gross_floor_area"
        };
        break;
      case !!query.size_land_area__range:
        this.selectValue = {
          min: Number(query.size_land_area__range.split(",")[0]),
          max: Number(query.size_land_area__range.split(",")[1]),
          value: "size_land_area"
        };
        break;
      case !!query.size_land_area_m2__range:
        this.selectValue = {
          min: Number(query.size_land_area_m2__range.split(",")[0]),
          max: Number(query.size_land_area_m2__range.split(",")[1]),
          value: "size_land_area_m2"
        };
        break;
      case !!query.size_private__range:
        this.selectValue = {
          min: Number(query.size_private__range.split(",")[0]),
          max: Number(query.size_private__range.split(",")[1]),
          value: "size_dedicated_area_m2"
        };
        break;
      case !!query.size_yean__range:
        this.selectValue = {
          min: Number(query.size_yean__range.split(",")[0]),
          max: Number(query.size_yean__range.split(",")[1]),
          value: "size_gross_floor_area"
        };
        break;
      case !!query.size_daeji__range:
        this.selectValue = {
          min: Number(query.size_daeji__range.split(",")[0]),
          max: Number(query.size_daeji__range.split(",")[1]),
          value: "size_land_area"
        };
        break;
      case !!query.size_land__range:
        this.selectValue = {
          min: Number(query.size_land__range.split(",")[0]),
          max: Number(query.size_land__range.split(",")[1]),
          value: "size_land_area_m2"
        };
        break;

      default:
        this.selectValue = {
          min: undefined,
          max: undefined,
          value: undefined
        };
    }
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
    border: 1px solid rgba(128, 128, 128, 0.171);
    height: 44px;
    border-radius: 0;
    &.selected {
      border: 2px solid #fc5b2e;
      text-align: center;
      background: #ff5100c4;
      color: white;
    }
  }
}
</style>
