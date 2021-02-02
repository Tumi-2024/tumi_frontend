<template>
  <q-card flat>
    <q-card-section>
      <div class="heading-title">토지 매물정보</div>
    </q-card-section>

    <sale-summary />
    <q-separator spaced />
    <sale-more-information :payload="MoreInformationList" />
  </q-card>
</template>

<script>
import SaleSummary from "./SaleSummary";
import SaleMoreInformation from "./SaleMoreInformation";
export default {
  name: "land-for-sale-information",
  components: {
    SaleSummary,
    SaleMoreInformation
  },
  props: {},
  data() {
    return {
      MoreInformationList: [
        {
          label: "거래유형",
          value: "토지매매"
        },
        {
          label: "대지면적",
          value: "2,275㎡ (688평)"
        },
        {
          label: "건물면적",
          value: "375㎡ (113평)"
        },
        {
          label: "공용면적",
          value: null
        },
        {
          label: "용도지역",
          value: "일반상업"
        },
        {
          label: "지목",
          value: "대"
        },
        {
          label: "이용상황",
          value: "상업용"
        },
        {
          label: "공지시가",
          value: "2천 115만"
        },
        {
          label: "도로접면",
          value: "세로한면(불)"
        },
        {
          label: "지세",
          value: "평지"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.heading-title {
  font-family: "notosanskr-medium";
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
}
</style>
