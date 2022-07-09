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
          <q-radio v-model="shape" val="house" label="매물" />
          <q-radio v-model="shape" val="transaction" label="실거래가" />
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
      <!-- {{ locations }} -->
      <template
        v-if="
          !locations.length &&
          !buildings.length &&
          !redevlopments.length &&
          !houses.length
        "
      >
        <q-card-section>
          <list-result :list="this.recents">
            <template #title>
              <q-item-label class="no-margin no-padding" header>
                <p style="font-size: 14px" class="text-black notosanskr-medium">
                  최근 검색 한
                </p>
              </q-item-label>
            </template>
          </list-result>
        </q-card-section>
        <q-separator
          color="positive"
          inset
          spaced
          size="12px"
          class="full-width"
        />
      </template>
      <q-card-section v-else>
        <list-result :list="this.redevlopments" type="redevelopment">
          <template #title>
            <q-item-label class="no-margin no-padding" header>
              <p style="font-size: 14px" class="text-black notosanskr-medium">
                개발정비사업
              </p>
            </q-item-label>
          </template>
        </list-result>
        <q-separator
          color="positive"
          inset
          spaced
          size="12px"
          class="full-width"
        />

        <list-result :list="this.locations" type="location">
          <template #title>
            <q-item-label class="no-margin no-padding" header>
              <p style="font-size: 14px" class="text-black notosanskr-medium">
                지역 (동, 도로명)
              </p>
            </q-item-label>
          </template>
        </list-result>
        <q-separator
          color="positive"
          inset
          spaced
          size="12px"
          class="full-width"
        />

        <list-result :list="this.houses">
          <template #title>
            <q-item-label class="no-margin no-padding" header>
              <p style="font-size: 14px" class="text-black notosanskr-medium">
                건물/단지
              </p>
            </q-item-label>
          </template>
        </list-result>
      </q-card-section>

      <!-- <q-card-section>
        <list-result :list="this.recommends" />
      </q-card-section>

      <q-separator
        color="positive"
        inset
        spaced
        size="12px"
        class="full-width"
      /> -->
    </q-card>
  </q-dialog>
</template>

<script>
import Vue from "vue";
// import lazyValues from "vue2-google-maps/dist/utils/lazyValue";
import ListResult from "./ListResult";

export default {
  data() {
    return {
      dialog: false,
      shape: "house",
      text: "",
      recents: [],
      recommends: [],

      locations: [],
      buildings: [],
      redevlopments: [],
      houses: []
    };
  },
  components: {
    ListResult
    // RecentSearch
  },
  methods: {
    showDialog() {
      this.dialog = true;
    },
    async getRecentHistory() {
      const { data } = await Vue.prototype.$axios.get("/houses/recents/");
      console.log(data);
      this.recents = data.results.map(({ latitude, longitude, address }) => {
        return { value: { latitude, longitude }, label: address };
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
        .filter((obj) => obj.value)
        .slice(0, 4);
    },

    async getRedevelopment() {
      const { data } = await Vue.prototype.$axios.get(
        `/redevelopment_areas/?search=${this.text}`
      );
      this.redevlopments = data.results
        .map(({ latitude, longitude, title }) => {
          return { value: { latitude, longitude }, label: title };
        })
        .filter((obj) => obj.value)
        .slice(0, 4);
    },
    async getLocations() {
      const { data } = await Vue.prototype.$axios.get(
        `/locations/?search=${this.text}`
      );
      this.locations = data.results
        .map(({ latitude, longitude, title }) => {
          return { value: { latitude, longitude }, label: title };
        })
        .filter((obj) => obj.value)
        .slice(0, 4);
    },
    async getHouses() {
      const { data } = await Vue.prototype.$axios.get(
        `/houses/?search=${this.text}`
      );
      this.houses = data.results
        .map(({ latitude, longitude, group_building_house: building, id }) => {
          return {
            value: { latitude, longitude },
            label: building?.title_building,
            id
          };
        })
        .filter((obj) => obj.value)
        .slice(0, 4);
    },
    async onSearch(event) {
      if (event.isComposing || event.keyCode === 229) {
        return;
      }
      this.getRedevelopment();
      this.getLocations();
      this.getHouses();
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
