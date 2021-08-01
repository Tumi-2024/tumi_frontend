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
        :class="{ selected: selected === property.title }"
        @click="changeValue(property.title)"
      >
        <div class="full-width column q-py-lg items-center">
          <img :width="30" :src="property.icon" :alt="property.icon" />
          {{ property.title }}
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

export default {
  components: {
    "property-detailed-type": PropertyDetailedType,
    "text-under-highlight": TextUnderHighlight
  },
  data() {
    return {
      selected: "아파트",
      properties: [
        {
          icon: require("assets/iconsNew/11아파트.png"),
          title: "아파트"
        },
        {
          icon: require("assets/iconsNew/12연립다세대.png"),
          title: "연립/다세대"
        },
        {
          icon: require("assets/iconsNew/13단독다가구.png"),
          title: "단독/다가구"
        },
        {
          icon: require("assets/iconsNew/14오피스텔.png"),
          title: "원룸/오피스텔"
        },
        {
          icon: require("assets/iconsNew/16상업업무용.png"),
          title: "상업업무용"
        },
        {
          icon: require("assets/iconsNew/15토지.png"),
          title: "토지"
        },
        {
          icon: require("assets/iconsNew/17분양권.png"),
          title: "무허가 건축물"
        },
        {
          icon: require("assets/iconsNew/19티켓.png"),
          title: "입주권"
        }
      ]
    };
  },
  mounted() {
    this.selected = this.$store.state.search.typeHouse;
  },
  methods: {
    select(val) {
      this.$emit("selectDetail", val);
    },
    changeValue(val) {
      this.selected = val;
      this.$emit("select", val);
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
