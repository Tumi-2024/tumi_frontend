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
          <q-select
            ref="keywordRef"
            filled
            label="검색"
            v-model="text"
            @input="onSelect"
            :input-debounce="0"
            use-input
            fill-input
            hide-selected
            :options="options"
            @filter="filterFn"
            style="flex: 1"
            class="q-ml-lg"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> No results </q-item-section>
              </q-item>
            </template>
            <template v-slot:after>
              <q-btn
                flat
                class="notosanskr-medium text-black"
                dense
                label="취소"
              />
            </template>
          </q-select>
        </div>
      </q-card-section>
      <template v-if="!houses.length">
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

        <q-card-section>
          <list-result :list="this.recents" />
        </q-card-section>
      </template>
      <q-card-section v-else>
        <list-result :list="this.houses">
          <template #title>
            <q-item-label class="no-margin no-padding" header>
              <p style="font-size: 14px" class="text-black notosanskr-medium">
                검색 결과
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
      options: [],
      recents: [],
      recommends: [],

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
      const { data } = await Vue.prototype.$axios.get("/recents/");
      this.recents = data.results
        .map((obj) => {
          return { value: obj.house?.id, label: obj.house?.address };
        })
        .filter((obj) => obj.value)
        .slice(0, 4);
    },

    async getRecommend() {
      const { data } = await Vue.prototype.$axios.get(
        "/houses/?is_recommend=true"
      );
      console.log(data);
      this.recommends = data.results
        .map((obj) => {
          return { value: obj?.id, label: obj?.address };
        })
        .filter((obj) => obj.value)
        .slice(0, 4);
    },
    async onSelect(obj) {
      this.options = [];
      console.log(`/houses/?search=${obj.value}`, obj);
      const { data } = await Vue.prototype.$axios.get(
        `/houses/?search=${obj.value}`
      );
      this.houses = data.results
        .map((obj) => {
          return { value: obj?.id, label: obj?.address };
        })
        .filter((obj) => obj.value)
        .slice(0, 20);
    },
    async filterFn(val, update, abort) {
      if (val !== "") {
        const {
          data: { results: subCities }
        } = await Vue.prototype.$axios.get(`/sub_cities/?search=${val}`);
        const {
          data: { results: redev }
        } = await Vue.prototype.$axios.get(
          `/redevelopment_areas/?search=${val}`
        );

        update(async () => {
          const _results = [];
          subCities.forEach(({ title, latitude, longitude }) => {
            if (!_results.some((obj) => obj.label === title)) {
              _results.push({
                value: title,
                label: title
              });
            }
          });

          const redevResults = [];
          redev.forEach(({ title, latitude, longitude }) => {
            if (!redevResults.some((obj) => obj.label === title)) {
              redevResults.push({
                value: title,
                label: title
              });
            }
          });
          this.options = [..._results, ...redevResults];
        });
      } else {
        update();
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
