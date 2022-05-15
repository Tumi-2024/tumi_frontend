<template>
  <q-card flat class="q-mt-sm" style="margin-top: 0px">
    <q-card-section class="list-items q-pa-none">
      <q-list class="q-pt-md">
        <real-estate-item
          v-for="(item, i) of items"
          :key="i"
          :title="item.title"
          :date="item.date"
          :description="item.description"
        ></real-estate-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import RealEstateItem from "./RealEstateItem";
export default {
  components: {
    "real-estate-item": RealEstateItem
  },
  data() {
    return {
      items: [
        {
          title: "신축빌라 분양투자, 주의하셔야 합니다",
          date: "20.11.01",
          description:
            "코로나 19 확산으로 정비사업 조합원 총회 연기가 속출하면서 오는 11월 28일로 예정된 민간택지 분양가상한제 유예기간을 연장해달라는 지방..."
        },
        {
          title: "신축빌라 분양투자, 주의하셔야 합니다",
          date: "20.11.01",
          description:
            "코로나 19 확산으로 정비사업 조합원 총회 연기가 속출하면서 오는 11월 28일로 예정된 민간택지 분양가상한제 유예기간을 연장해달라는 지방..."
        }
        // {
        //   title: "신축빌라 분양투자, 주의하셔야 합니다",
        //   date: "20.11.01",
        //   description: "코로나 19 확산으로 정비사업 조합원 총회 연기가 속출하면서 오는 11월 28일로 예정된 민간택지 분양가상한제 유예기간을 연장해달라는 지방...",
        // },
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
