<template>
  <q-card flat class="q-mt-sm">
    <q-card-section class="nanum-square">
      관심지역 매물 <span class="text-primary">320</span>개
    </q-card-section>

    <area-sort-btns @sortBy="toSortBy($event)" />

    <q-card-section class="list-items q-pa-none notosanskr-regular">
      <q-list class="q-pt-md">
        <property-item
          v-for="(item, i) of detail_houses"
          :key="i"
          :name="item.address"
          :amount="formatAmount(item.price_deposit, item.price_rent)"
          :areaExclusive="item.area_exclusive"
          :floor="item.floor"
          :direction="item.type_direction"
          :tags="
            formatTags({
              type: item.type_house,
              date: item.modified,
              recommended: item.recommend
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
import AreaSortBtns from "./AreaSortBtns.vue";
export default {
  components: {
    "property-item": PropertyItem,
    "area-sort-btns": AreaSortBtns
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
  props: {
    subcity: Object
  },
  computed: {
    ...mapGetters(["detail_houses"])
  },
  methods: {
    ...mapActions(["getDetailHouses"]),

    formatAmount(priceDeposit, priceRent) {
      return `보증금 ${priceDeposit || 0} / 월세 ${priceRent || 0}`;
    },
    formatTags({ type, date, recommended, redevelopment }) {
      const _date = new Date(date);
      return {
        type,
        date: `${_date.getFullYear()}.${_date.getMonth()}.${_date.getDate()}`,
        recommended,
        redevelopment
      };
    },
    toSortBy(sortBy) {
      let order = "modified";
      switch (sortBy) {
        case "추천순":
          order = "recommend";
          break;
        case "면적순":
          order = "area_exclusive";
          break;
        case "가격순":
          order = "price_string";
          break;

        default:
          order = "modified";
          break;
      }
      const query = `subcity=${this.subcity.id}&page_size=30&ordering=${order}`;
      this.getDetailHouses(query);
    }
  }
};
</script>

<style lang="scss" scoped></style>
