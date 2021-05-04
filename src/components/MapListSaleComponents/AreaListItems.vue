<template>
  <q-card flat class="q-mt-sm">
    <q-card-section class=" notosanskr-medium">
      전체 매물 <span class="text-primary">{{$store.state.estate.detail_houses.length}}</span>개
    </q-card-section>
    <q-card-section
      class="sort-section row bg-positive q-pa-none notosanskr-regular"
    >
      <q-btn flat class="text-primary">최신순</q-btn>
      <q-separator vertical />
      <q-btn flat>추천순</q-btn>
      <q-separator vertical />
      <q-btn flat>면적순</q-btn>
      <q-separator vertical />
      <q-btn flat>가격순</q-btn>
    </q-card-section>
    <q-card-section class="list-items q-pa-none notosanskr-regular">
      <q-list class="q-pt-md" v-if="$store.state.estate.detail_houses && $store.state.estate.detail_houses.length > 0" >
        <area-item
          v-for="(item, i) of $store.state.estate.detail_houses"
          :key="i"
          :item="item"
        ></area-item>

        <q-item class="q-pa-none">
          <q-btn flat class="bg-white full-width see-more"> 매물 더 보기</q-btn>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import { toQueryString, toMoneyString, toKr } from 'src/utils';
import AreaItem from "./AreaItem";
export default {
  components: {
    "area-item": AreaItem
  },
  mounted() {
    console.log('this.$route.params.type', this.$route.params.type);
    console.log('this.$route.params.apartment', this.$route.params.apartment);
    console.log('this.$route.params.apartment.id', this.$route.params.apartment.id);
    if (this.$route.params.apartment) {
      console.log('getDetailHousesgetDetailHousesgetDetailHouses')
      this.$store.dispatch('getDetailHouses', `apartment=${this.$route.params.apartment.id}`);
    } else if (this.$route.params.type === 'location') {
      this.$store.dispatch('getDetailHouses', toQueryString({
        latitude: this.$route.params.position.lat,
        longitude: this.$route.params.position.lng,
        ...this.$store.state.search
      }));
    }
  },
  data() {
    return {};
  },
  methods: {
    toMoneyString: toMoneyString,
    toKr: toKr,
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
    margin-top: 20px;
    height: 14px;
  }
  .see-more {
    font-size: 17px;
    line-height: 52px;
    text-align: center;
    letter-spacing: -1.275px;
    color: #3a3a3a;
  }
}
</style>
