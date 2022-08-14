<template>
  <q-dialog
    v-model="dialog"
    persistent
    maximized
    transition-show="visible"
    transition-hide="visible"
  >
    <q-card class="bg-white" style="max-width: 1000px">
      <q-bar class="bg-white">
        <q-btn
          class="back-btn flex justify-center content-center"
          flat
          @click="dialog = false"
        >
          <q-icon
            name="img:icons/home-page-icon/search-result-icon/back-btn.svg"
          />
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="row">
          <q-radio v-model="shape" val="house" label="매물 지도" />
          <q-radio v-model="shape" val="transaction" label="실거래가 지도" />
          <q-input
            filled
            use-input
            fill-input
            wide
            class="q-ml-lg"
            style="flex: 1"
            @keydown.enter.prevent="onSearch"
            autofocus
            v-model="text"
          />
        </div>
      </q-card-section>
      <div class="flex q-px-md" style="gap: 15px">
        <list-result
          style="flex: 1"
          v-if="!locations.length && !redevlopments.length && !houses.length"
          :list="recents"
          @select="onSelectList"
          @delete="onDeleteItem"
          hasDelete
        >
          <template #title>
            <q-item-label class="no-margin no-padding" header>
              <p style="font-size: 16px" class="text-black notosanskr-medium">
                최근 검색 한
              </p>
            </q-item-label>
          </template>
        </list-result>
        <list-result
          style="flex: 1"
          v-if="redevlopments.length"
          :list="redevlopments"
          type="redevelopment"
          @select="onSelectList"
        >
          <template #title>
            <q-item-label class="no-margin no-padding" header>
              <p style="font-size: 16px" class="text-black notosanskr-medium">
                개발정비사업
              </p>
            </q-item-label>
          </template>
        </list-result>
        <list-result
          style="flex: 1"
          v-if="locations.length"
          :list="locations"
          type="location"
          @select="onSelectList"
        >
          <template #title>
            <q-item-label class="no-margin no-padding" header>
              <p style="font-size: 16px" class="text-black notosanskr-medium">
                지역 (동, 도로명)
              </p>
            </q-item-label>
          </template>
        </list-result>
        <list-result
          style="flex: 1"
          v-if="houses.length"
          :list="houses"
          @select="onSelectList"
        >
          <template #title>
            <q-item-label class="no-margin no-padding" header>
              <p style="font-size: 14px" class="text-black notosanskr-medium">
                건물/단지
              </p>
            </q-item-label>
          </template>
        </list-result>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import Vue from "vue";
// import lazyValues from "vue2-google-maps/dist/utils/lazyValue";
import ListResult from "./ListResult";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      shape: "house",
      text: "",
      recents: [],
      recommends: [],

      locations: [],
      redevlopments: [],
      houses: []
    };
  },
  components: {
    ListResult
    // RecentSearch
  },
  methods: {
    ...mapActions("map", ["setMapZoom", "changeMapCenter"]),
    showDialog() {
      this.dialog = true;
    },
    async getRecentHistory() {
      const { data } = await Vue.prototype.$axios.get("/search/");
      this.recents = data.results.map(({ title, id }) => {
        return { label: title, id };
      });
    },

    async getRecommend() {
      const { data } = await Vue.prototype.$axios.get(
        "/houses/?is_recommend=true"
      );
      this.recommends = data.results
        .map((obj) => {
          return { value: obj?.id, label: obj?.address };
        })
        .filter((obj) => obj.value);
    },

    async getRedevelopment() {
      const { data } = await Vue.prototype.$axios.get(
        `/redevelopment_areas/?search=${this.text}`
      );
      this.redevlopments = data.results
        .map(({ latitude, longitude, title }) => {
          return { value: { latitude, longitude }, label: title };
        })
        .filter((obj) => obj.value);
    },
    async getLocations() {
      const { data } = await Vue.prototype.$axios.get(
        `/locations/?search=${this.text}`
      );
      this.locations = data.results
        .map(({ latitude, longitude, subcity, title }) => ({
          value: { latitude, longitude },
          label: `${subcity.address} ${title}`
        }))
        .filter((obj) => obj.value);
    },
    async getHouses() {
      const { data } = await Vue.prototype.$axios.get(
        `/houses/?search=${this.text}`
      );
      this.houses = data.results
        .map(({ latitude, longitude, group_building_house: building, id }) => ({
          value: { latitude, longitude },
          label: building?.title_building,
          id
        }))
        .filter((obj) => obj.value);
    },
    async onSearch(event) {
      if (event?.isComposing || event?.keyCode === 229) {
        return;
      }
      console.log(event);

      if (this.text === "") {
        this.recommends = [];
        this.locations = [];
        this.redevlopments = [];
        this.houses = [];
        this.getRecentHistory();
      } else {
        await Vue.prototype.$axios.post("/search/", { search: this.text });
        this.getRedevelopment();
        this.getLocations();
        this.getHouses();
      }
    },
    async onDeleteItem({ id }) {
      const data = await Vue.prototype.$axios.delete(`/search/${id}/`);
      if (data.status === 204) {
        this.recents = this.recents.filter((rec) => rec.id !== id);
      }
    },
    async onSelectList({ value, id, label }, type) {
      console.log(value, label);
      if (!value && label) {
        this.text = label;
        this.onSearch();
      } else {
        const _value = {
          lat: Number(value.latitude),
          lng: Number(value.longitude)
        };

        console.log(value, type);

        if (type === "location") {
          this.$router.push({
            name: "map_city"
          });
          this.setMapZoom(15);
          this.changeMapCenter(_value);
        } else if (type === "redevelopment") {
          this.$router.push({
            name: "map_city"
          });
          this.setMapZoom(15);
          this.changeMapCenter(_value);
        } else {
          this.setMapZoom(16);
          this.changeMapCenter(_value);
          await Vue.prototype.$axios.post(`/houses/${id}/recent/`, {});
          this.$router.push({
            name: "for_sale_apartment",
            query: {
              value
            }
          });
        }
      }
    }
  },
  beforeMount() {
    this.getRecentHistory();
    this.getRecommend();
  }
};
</script>

<style>
.back-btn {
  width: 24px;
  height: 24px;
}

.search-bar-field {
  border-bottom: 2px solid #000;
}
</style>
