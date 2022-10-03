<template>
  <q-card-section>
    <text-under-highlight text="주택 유형" />
    <!-- selection of choices | 선택의 선택 -->
    <div class="selection row q-mt-lg" style="gap: calc((10 / 1000) * 100vw)">
      <q-btn
        v-for="(property, i) of properties"
        :key="i"
        style="flex-basis: 20%"
        flat
        class="col notosanskr-medium"
        :class="{
          selected: getIsActive(property.value)
        }"
        @click="changeValue(property)"
      >
        <div
          class="full-width column q-py-md items-center"
          style="font-size: calc((16 / 1000) * 100vh)"
        >
          <img
            style="width: calc((25 / 1000) * 100vh)"
            class="q-mb-sm"
            :src="property.icon"
            :alt="property.icon"
          />
          {{ property.label }}
        </div>
      </q-btn>
    </div>
  </q-card-section>
</template>

<script>
import TextUnderHighlight from "components/Utilities/TextUnderHighlight";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    "text-under-highlight": TextUnderHighlight
  },

  props: {
    value: {
      type: Array,
      require: false,
      default: () => []
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(newVal, oldVal) {
        this.selected = newVal;
      }
    }
  },
  computed: {
    ...mapGetters("search", ["categories", "isMultiSelect"]),
    getIsActive() {
      return (dd) => {
        return this.selected.some((obj) => obj === dd);
      };
    }
  },

  data() {
    return {
      selected: [],
      properties: [
        {
          icon: require("assets/iconsNew/11.png"),
          label: "아파트",
          value: "APARTMENT",
          valueHouse: "아파트"
        },
        {
          icon: require("assets/iconsNew/12.png"),
          label: "연립ￜ다세대",
          value: "ALLIANCE",
          valueHouse: "연립ￜ다세대"
        },
        {
          icon: require("assets/iconsNew/13.png"),
          label: "단독|다가구",
          value: "SINGLE",
          valueHouse: "단독ￜ다가구"
        },
        {
          icon: require("assets/iconsNew/14.png"),
          label: "원룸/오피스텔",
          value: "OFFICETEL",
          valueHouse: "오피스텔"
        },
        {
          icon: require("assets/iconsNew/16.png"),
          label: "상업업무용",
          value: "COMMERCIAL",
          valueHouse: "상업ￜ업무용"
        },
        {
          icon: require("assets/iconsNew/15.png"),
          label: "토지",
          value: "LAND",
          valueHouse: "토지"
        },
        {
          icon: require("assets/iconsNew/17.png"),
          label: "무허가 건축물",
          value: "noname01",
          valueHouse: "무허가 건축물"
        },
        {
          icon: require("assets/iconsNew/18.png"),
          label: "입주권",
          value: "noname02",
          valueHouse: "입주권"
        }
      ]
    };
  },
  beforeMount() {
    if (this.value.length === 0) {
      this.selected = [...this.categories];
    } else {
      this.selected = this.value;
    }
  },
  methods: {
    ...mapActions("search", ["setCategories", "removeCategories"]),
    select(val) {},
    changeValue({ value }) {
      const hasValue = this.selected.some((obj) => obj === value);
      if (hasValue) {
        if (this.selected.length === 1) {
          return;
        }
        this.selected = this.selected.filter((obj) => obj !== value);
      } else {
        if (this.isMultiSelect) {
          this.selected.push(value);
        } else {
          this.selected = [value];
        }
      }
      console.log(this.selected);
      this.$emit("select", this.selected);
    },
    save() {
      this.setCategories(this.selected);
    },
    initialize() {
      //  if 멀티면
      if (!this.isMultiSelect) {
        this.selected = ["APARTMENT"];
      } else {
        if (this.selected.length !== 8) {
          this.selected = [
            "APARTMENT",
            "ALLIANCE",
            "SINGLE",
            "OFFICETEL",
            "COMMERCIAL",
            "LAND",
            "noname01",
            "noname02"
          ];
        } else {
          this.selected = ["APARTMENT"];
        }
      }
    }
  }
};
</script>

<style lang="scss">
.selection {
  font-size: 15px;
  line-height: 24px; /* identical
to box height, or 160% */
  text-align: center;
  letter-spacing: -1.125px; /*
Font/50 */
  color: #1a1a1a;
  .q-btn {
    border: 2px solid rgba(128, 128, 128, 0.274);
    border-radius: 8px;
    &.selected {
      border: 2px solid #fc5b2e;
      text-align: center;
      color: #ff5100;
    }
  }
  .q-btn__wrapper {
    padding: 0 !important;
  }
}
</style>
