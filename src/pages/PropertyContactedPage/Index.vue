<template>
  <div class="q-mt-sm" style="max-width: 1000px;">
    <property-menu-filter @edit="e => (isEdit = e)"></property-menu-filter>
    <property-btns :apartment="3" :office="9"></property-btns>
    <property-list-items
      :items="propertyItems"
      :isEdit="isEdit"
    ></property-list-items>
  </div>
</template>

<script>
import {
  PropertyMenuFilter,
  PropertyBtns,
  PropertyListItems
} from "src/components/PropertyPageComponents";
export default {
  name: "Property-Contacted",
  components: {
    "property-menu-filter": PropertyMenuFilter,
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
            date: "21.10.12"
          },
          name: "종로1가 대성스카이렉스",
          amount: "보증금 5천 6백만 / 월세 121만"
        },
        {
          id: 2,
          tags: {
            type: "아파트",
            date: "21.10.12"
          },
          name: "종로 대성스카이렉스",
          amount: "매매 6억 3,400만"
        },
        {
          id: 3,
          tags: {
            type: "아파트",
            redevelopment: true,
            date: "21.10.12"
          },
          name: "종로1가 대성스카이렉스",
          amount: "매매 7억 5천만"
        },
        {
          id: 4,
          tags: {
            type: "아파트",
            date: "21.10.12"
          },
          name: "종로1가 대성스카이렉스",
          amount: "매매 6억 5,500만"
        },
        {
          id: 5,
          tags: {
            type: "아파트",
            date: "21.10.12"
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
