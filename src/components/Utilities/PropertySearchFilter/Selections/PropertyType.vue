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
        class="col nanum-square"
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

  computed: {
    ...mapGetters("search", ["categories", "isMultiSelect"]),
    getIsActive() {
      return (dd) => this.selected.some((obj) => obj === dd);
    }
  },

  data() {
    return {
      selected: [],
      properties: [
        {
          icon: require("assets/iconsNew/11.png"),
          label: "아파트",
          value: "아파트",
          valueHouse: "아파트"
        },
        {
          icon: require("assets/iconsNew/12.png"),
          label: "연립/다세대",
          value: "연립다세대",
          valueHouse: "연립다세대"
        },
        {
          icon: require("assets/iconsNew/13.png"),
          label: "단독/다가구",
          value: "단독다가구",
          valueHouse: "단독다가구"
        },
        {
          icon: require("assets/iconsNew/14.png"),
          label: "원룸/오피스텔",
          value: "오피스텔",
          valueHouse: "오피스텔"
        },
        {
          icon: require("assets/iconsNew/16.png"),
          label: "상업업무용",
          value: "상업업무용",
          valueHouse: "상업업무용"
        },
        {
          icon: require("assets/iconsNew/15.png"),
          label: "토지",
          value: "토지",
          valueHouse: "토지"
        },
        {
          icon: require("assets/iconsNew/17.png"),
          label: "무허가건축물",
          value: "무허가건축물",
          valueHouse: "무허가건축물"
        },
        {
          icon: require("assets/iconsNew/18.png"),
          label: "입주권",
          value: "입주권",
          valueHouse: "입주권"
        }
      ]
    };
  },
  beforeMount() {
    const query = this.$route.query;
    if (this.value.length) {
      this.selected = this.value;
      return
    }
    if (query.type_house__in) {
      this.selected = query.type_house__in.split(',').map(obj => {
        return this.properties.find(property => property.valueHouse === obj).value
      })
    } else if (query.category__in) {
      this.selected = query.category__in.split(',').map(obj => {
        return this.properties.find(property => property.value === obj).value
      })
    } else {
      this.selected = [];
    }
  },
  methods: {
    ...mapActions("search", ["setCategories", "removeCategories"]),
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
      this.$emit("select", this.selected);
    },
    initialize() {
      this.selected = []
    },
    save() {
      this.setCategories(this.selected);
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
      background: #ff5100c4;
      color: white;
    }
  }
  .q-btn__wrapper {
    padding: 0 !important;
  }
}
</style>
