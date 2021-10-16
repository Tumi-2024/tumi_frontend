<template>
  <q-card flat square>
    <q-card-section class="row justify-between items-center q-pa-none">
      <!-- left section items -->
      <div class="helper text-left col-12 notosanskr-regular">
        {{ getToolbarLabel }}
      </div>
      <div class="q-my-xs col-4 text-left notosanskr-medium">
        <q-select
          filled
          :label="getToolbarTitle"
          :value="searchText"
          @input="onSelect"
          use-input
          fill-input
          hide-selected
          :options="options"
          @filter="filterFn"
          style="width: 250px"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <!-- right section-items -->
      <section class="q-pr-md">
        <q-btn flat padding="4px" color="black" :to="{ name: 'my_page' }">
          <q-icon name="menu" size="24px"></q-icon>
        </q-btn>
        <q-btn flat padding="4px" :to="{ name: 'home' }">
          <q-icon size="24px">
            <img src="~assets/icons/regular-house.svg" alt="" />
          </q-icon>
        </q-btn>
      </section>
    </q-card-section>
    <!--
      Dialog Section for Property Information | 찾아볼 매물 정보
      this Dialog will show if getMapMode is not "default"
      -->
    <!-- <dialog-property-information ref="DialogPropertyInformation" /> -->
  </q-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";

// import DialogPropertyInformation from "./DialogPropertyInformation";
export default {
  components: {
    // DialogPropertyInformation
  },
  computed: {
    ...mapGetters("map", ["getMapMode", "getToolbarLabel", "getToolbarTitle"])
  },
  data() {
    return {
      searchText: "",
      options: []
    };
  },
  methods: {
    ...mapActions("map", ["changeMapZoom", "changeMapCenter"]),
    onSelect(obj) {
      console.log(obj, "onSelect");
      this.searchText = obj;
      this.changeMapCenter(obj.position);
      this.changeMapZoom(16);
    },
    async filterFn(val, update, abort) {
      if (val === "") {
        update(() => {
          this.options = [];
        });
      } else {
        update(async () => {
          const {
            data: { results }
          } = await Vue.prototype.$axios.get(
            `redevelopment_areas/?search=${val}`
          );
          console.log(results);
          this.options = results.map(({ title, latitude, longitude }) => {
            return {
              value: title,
              label: title,
              position: { lat: Number(latitude), lng: Number(longitude) }
            };
          });
        });
      }
    },
    toggleHeaderTitle() {
      // this.getMapMode === "default"
      //   ? this.$router.push({ name: "map_view_search" })
      //   : this.$refs.DialogPropertyInformation.showDialog();
      this.$router.push({ name: "map_view_search" });
    }
  }
};
</script>

<style lang="scss" scoped>
.helper {
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.9px;
  color: #707070;
}
.location-text {
  font-weight: 500;
  font-size: 21px;
  line-height: 30px;
  letter-spacing: -1.575px;
  color: #1a1a1a;
}
</style>
