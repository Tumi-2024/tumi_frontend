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
        :class="{ selected: selected === property.value }"
        @click="changeValue(property.value)"
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
    ...mapGetters("searchQuery", ["getQueryString", "getQuery"])
  },
  data() {
    return {
      selected: "아파트",
      properties: [
        {
          icon: require("assets/iconsNew/11아파트.png"),
          label: "아파트",
          value: "APARTMENT"
        },
        {
          icon: require("assets/iconsNew/12연립다세대.png"),
          label: "연립/다세대",
          value: "ALLIANCE"
        },
        {
          icon: require("assets/iconsNew/13단독다가구.png"),
          label: "단독/다가구",
          value: "SINGLE"
        },
        {
          icon: require("assets/iconsNew/14오피스텔.png"),
          label: "원룸/오피스텔",
          value: "OFFICETEL"
        },
        {
          icon: require("assets/iconsNew/16상업업무용.png"),
          label: "상업업무용",
          value: "COMMERCIAL"
        },
        {
          icon: require("assets/iconsNew/15토지.png"),
          label: "토지",
          value: "LAND"
        }
      ]
    };
  },
  mounted() {
    this.selected = this.getQuery("categories");
  },
  methods: {
    select(val) {
      this.$emit("selectDetail", val);
    },
    changeValue(val) {
      this.selected = val;
      console.log(this.selected);
      this.$emit("select", val, "categories");
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
