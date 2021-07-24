<template>
  <q-card-section>
    <text-under-highlight text="주택 유형"></text-under-highlight>
    <!-- selection of choices | 선택의 선택 -->
    <div class="selection row q-mt-lg">
      <q-btn
        v-for="(property, i) of properties"
        :key="i"
        flat
        class="col notosanskr-medium q-mx-xs"
        :class="{ selected: selected === property.title }"
        @click="changeValue(property.title)"
      >
        <div class="full-width column q-py-lg">
          <img
            :src="getImgUrl(property.iconColored)"
            :alt="property.icon"
            v-if="property.title == selected"
          />
          <img :src="getImgUrl(property.icon)" :alt="property.icon" v-else />
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
          icon: "filter-apartment-outline",
          iconColored: "filter-apartment-colored",
          title: "아파트"
        },
        {
          icon: "filter-redevelop-outline",
          iconColored: "filter-redevelop-colored",
          title: "재개발"
        },
        {
          icon: "filter-street-housing-outline",
          iconColored: "filter-street-housing-colored",
          title: "가로주택"
        },
        {
          icon: "filter-other-forsale-outline",
          iconColored: "filter-other-forsale-outline",
          title: "기타매물"
        }
      ]
    };
  },
  mounted() {
    this.selected = this.$store.state.search.typeHouse;
  },
  methods: {
    getImgUrl(pic) {
      return require(`src/assets/icons/PropertySearchFilter/${pic}.svg`);
    },
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
