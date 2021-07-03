<template>
  <q-card flat class="q-mt-sm">
    <q-card-section class=" notosanskr-medium">
      전체 {{this.type === 'transaction' ? '실거래가' :'매물'}}
      <span class="text-primary">
        {{this.type === 'transaction' ? saleList.length :$store.state.estate.detail_houses.length}}
        </span>개
    </q-card-section>
    <q-card-section
      class="sort-section row bg-positive q-pa-none notosanskr-regular"
    >
      <area-list-filter v-if="this.type !== 'transaction'" />
      <div class="flex row justify-between">
        <template v-for="(btn, btnIndex) of sortButtons">
          <div class="flex items-center" :key="btnIndex">
            <q-btn flat :class="btn.class" >
              {{ btn.text }}
              </q-btn>
            <q-separator v-if="btnIndex !== sortButtons.length -1" vertical />
          </div>
        </template>
      </div>
    </q-card-section>
    <q-card-section class="list-items q-pa-none notosanskr-regular" v-if="type !== 'transaction'">
      <q-list class="q-pt-md" v-if="$store.state.estate.detail_houses && $store.state.estate.detail_houses.length > 0" >
        <area-item
          v-for="(item, i) of $store.state.estate.detail_houses"
          :key="i"
          :item="item"
        ></area-item>
      </q-list>
    </q-card-section>
    <!-- Transactions -->
    <q-card-section class="list-items q-pa-none notosanskr-regular">
      <q-list class="q-pt-md" v-if="saleList">
        <area-transaction
          v-for="(item, i) of saleList"
          :key="i"
          :item="item"
          v-bind="{
            ctgr: currentItem.categories,
            type: currentItem.types
          }"
        >
        </area-transaction>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import { toQueryString } from 'src/utils';
import Vue from 'vue'
import AreaItem from "./AreaItem";
import AreaListFilter from "./AreaListFilter";
import AreaTransaction from './AreaTransaction.vue';
export default {
  components: {
    "area-item": AreaItem,
    "area-list-filter": AreaListFilter,
    "area-transaction": AreaTransaction
  },
  data() {
    return {
      sortButtons: [
        { text: '최신순', class: "text-primary" },
        { text: '추천순' },
        { text: '면적순' },
        { text: '가격순' }
      ],
      type: 'transaction', /** sell  */
      saleList: [],
      currentItem: {}
    }
  },
  async mounted() {
    if (this.$route.query?.transactionid) {
      this.type = 'transaction'

      const { data: currentItem } = await Vue.prototype.$axios.get(`/transaction_groups/${this.$route.query?.transactionid}`);
      this.currentItem = currentItem

      const { data } = await Vue.prototype.$axios.get(`/transaction_groups/${this.$route.query?.transactionid}/transactions`);

      this.saleList = data
    } else {
      this.type = 'sell'
    }
    // console.log('this.$route.params.type', this.$route.params.type);
    // console.log('this.$route.params.apartment', this.$route.params.apartment);
    // console.log('this.$route.params.apartment.id', this.$route.params.apartment.id);
    // console.log('this.$route.params.apartment', this.$route.params.apartment)
    // if (this.$route.params.apartment) {
    //   console.log('getDetailHousesgetDetailHousesgetDetailHouses')
    //   this.$store.dispatch('getDetailHouses', `apartment=${this.$route.params.apartment.id}`);
    // } else if (this.$route.params.type === 'location') {
    //   this.$store.dispatch('getDetailHouses', toQueryString({
    //     latitude: this.$route.params.position.lat,
    //     longitude: this.$route.params.position.lng,
    //     ...this.$store.state.search
    //   }));
    // }
  }
};
</script>

<style lang="scss" scoped>
.sort-section {
  padding: 5px 0;
  justify-content: space-between;
  .q-btn {
    font-size: 14px;
    line-height: 40px;
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
