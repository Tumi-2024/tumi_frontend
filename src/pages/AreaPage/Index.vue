<template>
  <div style="max-width: 1000px">
    <property-menu-sort
      @edit="(e) => (isEdit = e)"
      :isEdit="isEdit"
    ></property-menu-sort>
    <q-card-section class="bg-white list-items q-pa-none notosanskr-regular">
      <PropertyRedevList
        :items="myInterestArea"
        @deleteItems="deleteItems"
        :isEdit="isEdit"
      ></PropertyRedevList>
    </q-card-section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  PropertyMenuSort,
  // PropertyFilter,
  PropertyRedevList
} from "src/components/PropertyPageComponents";

export default {
  name: "Area",
  components: {
    "property-menu-sort": PropertyMenuSort,
    PropertyRedevList: PropertyRedevList
  },
  data() {
    return {
      subcity: null,
      isEdit: false
    };
  },
  computed: {
    ...mapGetters("map", ["myInterestArea"])
  },
  methods: {
    ...mapActions("map", ["fetchLocationInterest"]),
    async deleteItems(items) {
      items.forEach((item) => {
        this.$store.dispatch("map/removeLocationInterest", item);
      });
      this.isEdit = false;
    }
    // getCountType(type) {
    //   return this.$store.getters.interest_houses.filter(
    //     (item) => item.group_building_house.type_house === type
    //   ).length;
    // },
    // async getProperties(order) {
    //   await this.$store.dispatch("getInterestHouses");
    //   return this.$store.getters.interest_houses;
    // },
    // filter(keyword) {
    //   if (keyword === "all") {
    //     this.properties = this.$store.getters.interest_houses;
    //     return;
    //   }
    //   this.properties = this.$store.getters.interest_houses.filter(
    //     (house) => house.group_building_house.type_house === keyword
    //   );
    // }
  },
  beforeMount() {
    this.fetchLocationInterest();
  }
};
</script>

<style lang="scss" scoped>
.sort-section {
  .q-btn {
    font-size: 14px;
    line-height: 44px;
    text-align: center;
    letter-spacing: -1.05px;
    color: #707070;
  }
  .q-separator {
    // margin-top: 20px;
    height: 14px;
  }
}
</style>
