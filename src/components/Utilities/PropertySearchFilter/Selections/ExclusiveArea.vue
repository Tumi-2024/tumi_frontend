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

    <div class="selection row q-my-lg">
      <q-btn
        v-for="(property, i) of getProperties"
        :key="i"
        flat
        class="notosanskr-medium"
        style="flex: 1; "
        :style="{'background-color': property.disabled ? '#e9e9e9': ''}"
        :disable="property.disabled"
        :class="{ selected: selected.label === property.label }"
        :label="property.label"
        @click="changeValue(property)"
      />
    </div>
    <div class="row">
      <div class="selection row q-mt-lg items-center">
        <q-input
          :value="areas[0].value"
          @focus="areas[0].value = 0"
          @change="onChangeMin"
          filled
          label="최소 ㎡"
          maxlength="7"
          style="max-width: 200px"
        />
        <span style="font-size: 30px;" class="q-mx-lg">~</span>
        <q-input
          :value="areas[1].value"
          @focus="areas[1].value = 0"
          @change="onChangeMax"
          filled
          label="최대 ㎡"
          maxlength="7"
          style="max-width: 200px"
        />
      </div>
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
      areas: [],
      selected: {
        label: "전용면적",
        value: "size_dedicated_area_m2"
      },
      properties: [
        {
          label: "전용면적",
          value: "size_dedicated_area_m2",
          type: ["아파트", "연립/다세대", "원룸/오피스텔", "상업업무용", "입주권"]
        },
        {
          label: "연면적",
          value: "size_gross_floor_area",
          type: ["단독/다가구", "무허가 건축물", "상업업무용"]
        },
        {
          label: "대지면적",
          value: "size_land_area",
          type: ["단독/다가구", "무허가 건축물", "토지"]
        },
        {
          label: "대지권면적",
          value: "size_land_area",
          type: ["연립/다세대"]
        }
      ]
    };
  },

  computed: {
    ...mapGetters("searchQuery", ["getQueryString", "getOption"]),
    getProperties() {
      const currentCtgr = this.getOption("categories");

      return this.properties.map(obj => {
        return { ...obj, disabled: obj.type.indexOf(currentCtgr.label) < 0 };
      });
    }
  },
  methods: {
    toMoneyString,
    ...mapActions("searchQuery", ["setQuery", "initializeQuery"]),
    select(val) {
      this.$emit("selectDetail", val);
    },
    changeValue(val) {
      this.selected = val;
      this.$emit("select", this.selected, "areaType");
    },
    onChangeMin(e) {
      this.areas = [
        {
          label: "최저가",
          key: "min",
          value: e.target.value
        },
        this.areas[1]
      ];
      this.$emit("select", this.areas, "areas");
    },
    onChangeMax(e) {
      this.areas = [
        this.areas[0],
        {
          label: "최고가",
          key: "max",
          value: e.target.value
        }
      ];
      this.$emit("select", this.areas, "areas");
    }
  },
  beforeMount() {
    const init = this.getProperties.find(({ disabled }) => !disabled)

    this.areas = this.getOption("areas");
    this.setQuery({ key: 'areaType', data: init });
  },
  mounted() {
    this.selected = this.getOption("areaType");
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
</style>
