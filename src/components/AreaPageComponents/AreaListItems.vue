<template>
  <q-card flat class="q-mt-sm">
    <q-card-section class=" notosanskr-medium">
      관심지역 매물 <span class="text-primary">320</span>개
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
      <q-list class="q-pt-md">
        <property-item
          v-for="(item, i) of detail_houses"
          :key="i"
          :name="item.address"
          :amount="formatAmount(item.price_deposit, item.price_rent)"
          :tags="
            formatTags({
              type: item.type_house,
              date: item.modified,
              recommended: item.recommend,
              redevelopment: item.redevelopment_area
            })
          "
        />
        <q-item class="q-pa-none">
          <q-btn flat class="bg-white full-width see-more"> 매물 더 보기</q-btn>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import PropertyItem from "components/Utilities/PropertyItem";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    "property-item": PropertyItem
  },
  data() {
    return {
      items: [
        {
          tags: {
            type: "아파트",
            recommended: "추천 급매",
            date: "20.10.12"
          },
          name: "종로1가 대성스카이렉스",
          amount: "보증금 5천 6백만 / 월세 120만"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["detail_houses"])
  },
  methods: {
    formatAmount(priceDeposit, priceRent) {
      return `${priceDeposit} / ${priceRent}`;
    },
    formatTags({ type, date, recommended, redevelopment }) {
      const _date = new Date(date);
      return {
        type,
        date: `${_date.getFullYear()}.${_date.getMonth()}.${_date.getDate()}`,
        recommended,
        redevelopment
      };
    }
  },
  mounted() {
    console.log(this.detail_houses, "list itsems");
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
