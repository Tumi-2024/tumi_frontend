<template>
  <div class="notosanskr-medium">
    <google-map class="page-container full-width" />
    <detail-summary :tags="tags"></detail-summary>
    <div class="row bg-white" style="padding: 0 16px; margin-bottom: 8px">
      <span class="notosanskr-regular" style="font-size: 16px; line-height: 60px; letter-spacing: -1.2px; color: #1A1A1A;">“해당 세대 중 유일하게 야외 정원이 있는 집"</span>
    </div>
    <selling-information :details="selling_details"></selling-information>
    <redevelopment-information :details="redevelopment_details"></redevelopment-information>
    <administration-cost :cost="admin_cost"></administration-cost>
    <school></school>
    <recent-pricing :details="extra_details"></recent-pricing>
  </div>
</template>

<script>
import { 
  DetailSummary,
  SellingInformation,
  RedevelopmentInformation,
  AdministrationCost,
  School,
  RecentPricing
} from "src/components/ActualTransactionComponents/Aparment";
import { GoogleMap } from "components/MapCityComponent";
export default {
  components: {
    "google-map": GoogleMap,
    "detail-summary": DetailSummary,
    "selling-information": SellingInformation,
    "redevelopment-information": RedevelopmentInformation,
    "administration-cost": AdministrationCost,
    "school": School,
    "recent-pricing": RecentPricing,
  },
  data() {
    return {
      unit_table_columns: [
        {
          name: '구분',
          required: true,
          label: '구분',
          align: 'center',
          field: row => row.name,
          format: val => `${val}`,
          classes: 'bg-grey-2 ellipsis',
          style: 'max-width: 100px',
          headerClasses: 'bg-primary text-white'
        },
        { name: '하위평균가', align: 'center', label: '하위평균가', field: 'lower_mean_price' },
        { name: '일반평균가', align: 'center', label: '일반평균가', field: 'general_average_price' },
        { name: '상위평균가', align: 'center', label: '상위평균가', field: 'upper_average_price' }
      ],
      unit_table_data: [
        {
          name: '매매가',
          lower_mean_price: '13억 8,250만',
          general_average_price: '14억 1,750만',
          upper_average_price: '15억 1,000만'
        },
        {
          name: '전세가',
          lower_mean_price: '10억 4,520만',
          general_average_price: '10억 9,500만',
          upper_average_price: '11억 9,500만'
        },
        {
          name: '월세가',
          lower_mean_price: 262,
          general_average_price: 16.0,
          upper_average_price: 23
        }
      ],
      filters: ["아파트", "재개발", "정비구역지정", "거래완료"],
      selling_details: [
        { 'label': '거래유형', 'info': '매매' },
        { 'label': '전용면적', 'info': '2,275㎡ (688평)' },
        { 'label': '공용면적', 'info': '375㎡ (113평)' },
        { 'label': '방향', 'info': '남서향' },
        { 'label': '층수', 'info': '고층' },
        { 'label': '역세권', 'info': '역세권' },
        { 'label': '엘레베이터', 'info': '2대' },
        { 'label': '방 수 / 욕실 수', 'info': '매매' },
        { 'label': '난방', 'info': '개별난방(도시가스)' },
        { 'label': '해당면적 세대수', 'info': '36세대(총63세대)' },
        { 'label': '관리비', 'info': '-----' }
      ],
      redevelopment_details: [
        { 'label': '추진위원회 승인', 'info': '2004.07.20' },
        { 'label': '정비구역지정', 'info': '2005.05.19' },
        { 'label': '조합설립인가', 'info': '2005.05.19' },
        { 'label': '시공사', 'info': '-----' },
        { 'label': '사업시행인가', 'info': '2006.09.24' },
        { 'label': '관리처분인가', 'info': '2007.10.24' },
        { 'label': '착공', 'info': '2008.02.29' },
        { 'label': '일반분양', 'info': '-----' },
        { 'label': '준공인가', 'info': '2010.09.24' },
      ],
      admin_cost: [
        { 'label': '여름', 'info': '28만원', 'icon': 'summer' },
        { 'label': '겨울', 'info': '21만원', 'icon': 'windy' },
        { 'label': '평균', 'info': '23만원', 'icon': 'average' }
      ],
      extra_details: [
        { 'label': '공급 / 전용 면적', 'info': '41.76 / 130.28㎡' },
        { 'label': '시세 갱신일', 'info': '2020.06.20' },
      ],
      options: [],
      tags: {
        type: "아파트",
        recomend: "정비구역지정",
        redevelopment: true,
        transaction_status: "거래완료"
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.page-container {
  background: rgb(54, 54, 54);
  min-height: 188px;
}
</style>
