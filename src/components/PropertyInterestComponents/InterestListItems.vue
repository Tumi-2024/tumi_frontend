<template>
  <q-card flat class="q-mt-sm" style="margin-top: 0px;">
    <q-card-section class="list-items q-pa-none">
      <q-list class="q-pt-md">
        <insterest-item
            v-for="(item, i) of items"
            :key="i"
            :name="item.name"
            :amount="item.amount"
            :tags="item.tags">
        </insterest-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import InterestItem from "./InterestItem";
export default {
  components: {
    "insterest-item": InterestItem
  },
  data() {
    return {
      items: [
        {
          tags: {
            type: "아파트",
            recomend: "투미추천 급매",
            date: "20.10.12"
          },
          name: "종로1가 대성스카이렉스",
          amount: "보증금 5천 6백만 / 월세 120만"
        },
        {
          tags: {
            type: "아파트",
            date: "20.10.12"
          },
          name: "종로1가 대성스카이렉스",
          amount: "매매 6억 5,500만"
        },
        {
          tags: {
            type: "아파트",
            redevelopment: true,
            date: "20.10.12"
          },
          name: "종로1가 대성스카이렉스",
          amount: "매매 6억 5천만"
        },
        {
          tags: {
            type: "아파트",
            date: "20.10.12"
          },
          name: "종로1가 대성스카이렉스",
          amount: "매매 6억 5,500만"
        },
        {
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
    margin-top: 20px;
    height: 14px;
  }
}
</style>
