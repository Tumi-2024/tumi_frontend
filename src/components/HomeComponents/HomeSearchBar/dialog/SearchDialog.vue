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
        <div class="flex row wrap">
          <div class="col-xs-4 col-md-2 items-center flex">
            <q-radio v-model="shape" val="house" label="매물 지도" />
          </div>
          <div class="col-xs-4 col-md-2 items-center flex">
            <q-radio v-model="shape" val="transaction" label="실거래가 지도" />
          </div>
          <div class="col-xs-12 col-md-8">
            <q-input
              filled
              use-input
              fill-input
              wide
              @keydown.enter.prevent="onSearch"
              autofocus
              :value="text"
              @input.native="onChangeText"
            />
          </div>
        </div>
      </q-card-section>
      <div class="flex q-px-md" style="gap: 15px">
        <template
          v-if="
            locations &&
            !locations.length &&
            redevlopments &&
            !redevlopments.length &&
            houses &&
            !houses.length &&
            text.length
          "
        >
          검색 결과가 없습니다.
        </template>
        <list-result
          style="flex: 1"
          v-if="
            ((!locations && !redevlopments && !houses) || !text.length) &&
            $store.getters.user.id
          "
          :list="recents"
          @select="onSelectList"
          @delete="onDeleteItem"
          hasDelete
        >
          <template #title>
            <q-item-label class="no-margin no-padding" header>
              <p style="font-size: 16px" class="text-black nanum-square">
                최근 검색어
              </p>
            </q-item-label>
          </template>
        </list-result>
        <div class="flex" style="width: 100%">
          <list-result
            style="flex: 1"
            v-if="
              (redevlopments && redevlopments.length && text.length) ||
              !$store.getters.user.id
            "
            :list="redevlopments"
            type="redevelopment"
            @select="onSelectList"
          >
            <template #title>
              <q-item-label class="no-margin no-padding" header>
                <p style="font-size: 16px" class="text-black nanum-square">
                  개발정비사업
                </p>
              </q-item-label>
            </template>
          </list-result>
          <list-result
            style="flex: 1"
            v-if="
              (locations && locations.length && text.length) ||
              !$store.getters.user.id
            "
            :list="locations"
            type="location"
            @select="onSelectList"
          >
            <template #title>
              <q-item-label class="no-margin no-padding" header>
                <p style="font-size: 16px" class="text-black nanum-square">
                  지역 (동, 도로명)
                </p>
              </q-item-label>
            </template>
          </list-result>
          <list-result
            style="flex: 1"
            v-if="houses && houses.length && text.length"
            :list="houses"
            @select="onSelectList"
          >
            <template #title>
              <q-item-label class="no-margin no-padding" header>
                <p style="font-size: 14px" class="text-black nanum-square">
                  건물/단지
                </p>
              </q-item-label>
            </template>
          </list-result>
        </div>
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
      if (!this.$store.getters.user.id) return;
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
        `/locations/?search=${this.text}&page_size=1000`
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

      if (this.text === "") {
        this.recommends = [];
        this.locations = [];
        this.redevlopments = [];
        this.houses = [];
        this.getRecentHistory();
      } else {
        try {
          await Vue.prototype.$axios.post("/search/", { search: this.text });
        } catch (e) {
        } finally {
          this.getRedevelopment();
          this.getLocations();
          this.getHouses();
        }
      }
    },
    async onDeleteItem({ id }) {
      const data = await Vue.prototype.$axios.delete(`/search/${id}/`);
      if (data.status === 204) {
        this.recents = this.recents.filter((rec) => rec.id !== id);
      }
    },
    onChangeText(e) {
      this.recommends = undefined;
      this.locations = undefined;
      this.redevlopments = undefined;
      this.houses = undefined;
      this.text = e.target.value;
    },
    async onSelectList({ value, id, label }, type) {
      if (!value && label) {
        this.text = label;
        this.onSearch();
      } else {
        const _value = {
          lat: Number(value.latitude),
          lng: Number(value.longitude)
        };
        this.setMapZoom(18);
        this.changeMapCenter(_value);
        if (type === "location") {
          this.$router.push({
            name: this.shape === 'house' ? "map_city" : "for_sale_apartment",
            query: {
              location: label
            }
          });
        } else if (type === "redevelopment") {
          this.$router.push({
            name: this.shape === 'house' ? "map_city" : "map_city_area",
            query: {
              redev: label
            }
          });
        } else {
          await Vue.prototype.$axios.post(`/houses/${id}/recent/`, {});
          this.$router.push({
            name: this.shape === 'house' ? "map_city" : "for_sale_apartment",
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
