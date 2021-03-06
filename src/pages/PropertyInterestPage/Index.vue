<template>
  <div class="q-mt-sm" style="max-width: 1000px;">
    <property-menu-sort @edit="e => (isEdit = e)"></property-menu-sort>
    <property-btns :apartment="3" :office="9"></property-btns>
    <property-list-items
      :items="propertyItems"
      :isEdit="isEdit"
    ></property-list-items>
  </div>
</template>

<script>
import {
  PropertyMenuSort,
  PropertyBtns,
  PropertyListItems
} from "src/components/PropertyPageComponents";
export default {
  name: "Property-Interest",
  components: {
    "property-menu-sort": PropertyMenuSort,
    "property-btns": PropertyBtns,
    "property-list-items": PropertyListItems
  },
  data() {
    return {
      isEdit: false,
      propertyItems: [
        {
          id: 1,
          tags: {
            type: "아파트",
            recommended: "투미추천 급매",
            date: "20.10.12"
          },
          name: "종로1가 대성스카이렉스",
          amount: "보증금 5천 6백만 / 월세 120만"
        },
        {
          id: 2,
          tags: {
            type: "아파트",
            date: "20.10.12"
          },
          name: "종로1가 대성스카이렉스",
          amount: "매매 6억 5,500만"
        },
        {
          id: 3,
          tags: {
            type: "아파트",
            redevelopment: true,
            date: "20.10.12"
          },
          name: "종로1가 대성스카이렉스",
          amount: "매매 6억 5천만"
        },
        {
          id: 4,
          tags: {
            type: "아파트",
            date: "20.10.12"
          },
          name: "종로1가 대성스카이렉스",
          amount: "매매 6억 5,500만"
        },
        {
          id: 5,
          tags: {
            type: "아파트",
            date: "20.10.12"
          },
          name: "종로1가 대성스카이렉스",
          amount: "매매 6억 5,500만"
        }
      ]
    };
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
    // margin-top: 20px;
    height: 14px;
  }
}
</style>
