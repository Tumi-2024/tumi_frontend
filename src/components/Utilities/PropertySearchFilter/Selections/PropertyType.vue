<template>
  <q-card-section>
    <text-under-highlight text="주택 유형"></text-under-highlight>
    <!-- selection of choices | 선택의 선택 -->
    <div class="selection row q-mt-lg">
      <q-btn
        style="flex-basis: 20%; margin-bottom: 10px;"
        v-for="(property, i) of properties"
        :key="i"
        flat
        class="col notosanskr-medium q-mx-xs"
        :class="{
          selected: getActive(property)
        }"
        @click="changeValue(property)"
      >
        <div class="full-width column q-py-lg items-center">
          <img :width="30" :src="property.icon" :alt="property.icon" />
          {{ property.label }}
        </div>
      </q-btn>
    </div>

    <property-detailed-type
      :selectedCategory="selected"
      v-on:select="select"
    ></property-detailed-type>
  </q-card-section>
</template>

<script>
import PropertyDetailedType from "./PropertyDetailedType";
import TextUnderHighlight from "components/Utilities/TextUnderHighlight";
import { mapGetters } from "vuex";

export default {
  components: {
    "property-detailed-type": PropertyDetailedType,
    "text-under-highlight": TextUnderHighlight
  },
  computed: {
    ...mapGetters("searchQuery", ["getQueryString", "getQuery"]),
    getActive() {
      return prop => {
        return this.selected.some(obj => obj.label === prop.label);
        // return true;
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
          valueTransaction: "APARTMENT",
          valueHouse: "아파트"
        },
        {
          icon: require("assets/iconsNew/12.png"),
          label: "연립/다세대",
          valueTransaction: "ALLIANCE",
          valueHouse: "연립ￜ다세대"
        },
        {
          icon: require("assets/iconsNew/13.png"),
          label: "단독/다가구",
          valueTransaction: "SINGLE",
          valueHouse: "단독ￜ다가구"
        },
        {
          icon: require("assets/iconsNew/14.png"),
          label: "원룸/오피스텔",
          valueTransaction: "OFFICETEL",
          valueHouse: "오피스텔"
        },
        {
          icon: require("assets/iconsNew/16.png"),
          label: "상업업무용",
          valueTransaction: "COMMERCIAL",
          valueHouse: "상업ￜ업무용"
        },
        {
          icon: require("assets/iconsNew/15.png"),
          label: "토지",
          valueTransaction: "LAND",
          valueHouse: "토지"
        },
        {
          icon: require("assets/iconsNew/17.png"),
          label: "무허가 건축물",
          valueTransaction: "noname01",
          valueHouse: "무허가 건축물"
        },
        {
          icon: require("assets/iconsNew/18.png"),
          label: "입주권",
          valueTransaction: "noname02",
          valueHouse: "입주권"
        }
      ]
    };
  },
  beforeMount() {
    this.selected = [...this.getQuery("categories")];
  },
  methods: {
    select(val) {
      this.$emit("selectDetail", val);
    },
    changeValue(val) {
      // this.selected = val;
      const hasSelected = !!this.selected.find(s => val.label === s.label);
      if (hasSelected) {
        this.selected = this.selected.filter(s => val.label !== s.label);
      } else {
        this.selected.push(val);
      }

      this.$emit("select", this.selected, "categories");
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
