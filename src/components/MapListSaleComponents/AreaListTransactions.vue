<template>
  <q-card flat class="q-mt-sm">
    <q-card-section class="notosanskr-medium">
      전체 실거래가
      <span class="text-primary">
        {{ getNumberWithCommas(transactionCount) }}
      </span>
      개
    </q-card-section>
    <q-card-section
      class="sort-section row bg-positive q-pa-none notosanskr-regular"
    >
      <toolbar-filter
        class="q-pt-xs q-px-sm"
        v-model="text"
        @focus="onFocus"
        @search="onSearch"
        @changeFilter="onChangeFilter"
      />
    </q-card-section>

    <q-card-section class="list-items q-pa-none notosanskr-regular">
      <div style="display: flex; gap: 5px; padding: 10px 10px">
        <Badge value="주택유형" houseType />
        <Badge value="매매가" price />
        <Badge value="매물등록일자" date />
      </div>
      <q-separator />

      <q-list class="q-pt-md">
        <template v-for="(item, i) of saleList">
          <area-transaction
            v-if="item.latitude"
            :key="i"
            :item="item"
            v-bind="{
              ctgr: item.category,
              type: item.type,
              isRedevelop: true
            }"
          ></area-transaction>
        </template>
      </q-list>
    </q-card-section>
    <div
      v-infinite-scroll="infiniteHandler"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    ></div>
  </q-card>
</template>

<script>
import Vue from "vue";
import AreaTransaction from "./AreaItemTransaction.vue";
import ToolbarFilter from "./ToolbarFilter.vue";
import infiniteScroll from "vue-infinite-scroll";

import { mapGetters } from "vuex";
import Badge from "../Utilities/Badges/Badge.vue";

export default {
  directives: {
    infiniteScroll
  },
  components: {
    "area-transaction": AreaTransaction,
    "toolbar-filter": ToolbarFilter,
    Badge
  },
  data() {
    return {
      tab: "지역",
      text: "",
      selectedIndex: 0,
      type: "transaction" /** sell  */,
      saleList: [],
      currentItem: {},
      transactionCount: 0,
      params: {}
    };
  },
  computed: {
    ...mapGetters("map", ["getMapMode"]),
    getNumberWithCommas() {
      return (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
    }
  },
  methods: {
    onChangeFilter(param) {
      this.params = param;
      this.infiniteHandler();
    },
    onFocus(e) {
      // this.getApiHouses();
    },
    toTransactionParams(params) {
      // valueHouse: "아파트";
      // valueHouse: "연립ￜ다세대";
      // valueHouse: "단독ￜ다가구";
      // valueHouse: "오피스텔";
      // valueHouse: "상업ￜ업무용";
      // valueHouse: "토지";
      // valueHouse: "무허가 건축물";
      // valueHouse: "입주권";
      // valueHouse: "아파트";
      // CATEGORYS = Choices(
      //   ("LAND", "토지"),
      //   ("OFFICETEL", "오피스텔"),
      //   ("ALLIANCE", "연립다세대"),
      //   ("APARTMENT", "아파트"),
      //   ("COMMERCIAL ", "상업업무용"),
      //   ("SINGLE", "단독다가구")
      // );

      // label: "무허가 건축물",
      //     valueTransaction: "noname01",
      //     valueHouse: "무허가 건축물"
      //   },
      //   {
      //     icon: require("assets/iconsNew/18.png"),
      //     label: "입주권",
      //     valueTransaction: "noname02",
      //     valueHouse: "입주권"
      //   }

      const _params = params;
      if (_params.type_house__in) {
        _params.category__in = params.type_house__in
          .replace("토지", "LAND")
          .replace("오피스텔", "OFFICETEL")
          .replace("연립ￜ다세대", "ALLIANCE")
          .replace("아파트", "APARTMENT")
          .replace("상업ￜ업무용", "COMMERCIAL")
          .replace("무허가 건축물", "noname01")
          .replace("입주권", "noname02")
          .replace("단독ￜ다가구", "SINGLE");

        // console.log(params);
        delete _params.type_house__in;
      }
      return _params;
    },
    infiniteHandler() {
      const { query } = this.$route;
      const _key = Object.keys(query)[0];
      this.text = this.$route.query.title || "";
      this.busy = true;
      switch (_key) {
        case "search":
          this.getTransactionsFromSearch(query, this.page);
          break;
        case "redevelopment_area":
          this.getTransactionsFromRedev(query, this.page);
          break;
        case "location":
          this.getTransactionsFromLocation(query, this.page);
          break;
        case "transactionid":
          this.getTransactionsById(query, this.page);
          break;
        default:
          this.getAllTransactions(query, undefined, this.page);
      }
    },
    onSearch(type, id, _label, subcityId) {
      console.log("onSearch transaction", type, id);
      if (id.length === 0) {
        return;
      }
      switch (type) {
        case "지역":
          this.getTransactionsFromLocation(id);
          break;
        case "개발정비사업":
          this.getTransactionsFromRedev(id);
          break;
        case "건물/단지":
          this.getTransactionsFromSearch(id);
          break;
        default:
          this.getAllTransactions(id);
      }
    },
    async getAllTransactions() {
      console.log(this.params, "params", this.toTransactionParams(this.params));
      const { data } = await Vue.prototype.$axios.get(`/transaction_groups/`, {
        params: this.params
      });
      this.saleList = data.results.map((item) => {
        return {
          ...item,
          ...item.recent_transactions?.[item.types[0]]
        };
      });
      this.transactionCount = data.count;
    },

    async getTransactionsFromSearch(query) {
      const { data } = await Vue.prototype.$axios.get(`/transaction_groups/`, {
        params: { ...this.params, search: query }
      });
      this.saleList = data.results.map((item) => {
        return {
          ...item,
          ...item.recent_transactions?.[item.types[0]]
        };
      });
      this.transactionCount = data.count;
    },
    async getTransactionsFromRedev(id) {
      const { data } = await Vue.prototype.$axios.get(
        `/redevelopment_areas/${id}/transaction_groups/`,
        { params: this.params }
      );
      this.saleList = data.results.map((item) => {
        return {
          ...item,
          ...item.recent_transactions?.[item.types[0]]
        };
      });
    },
    async getTransactionsFromLocation(query) {
      const { data } = await Vue.prototype.$axios.get(
        `/transaction_groups/?location=${query}`,
        { params: { ...this.params, ...query } }
      );
      this.saleList = data.results.map((item) => {
        return {
          ...item,
          ...item.recent_transactions?.[item.types[0]]
        };
      });
      this.transactionCount = data.count;
    },
    async getTransactionsById(query) {
      const { data } = await Vue.prototype.$axios.get(
        `/transaction_groups/${query.transactionid}/transactions`
      );
      this.saleList = data.map((item) => {
        return {
          ...item,
          ...item.recent_transactions?.[item.types[0]]
        };
      });
      this.transactionCount = data.length;
    }
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
