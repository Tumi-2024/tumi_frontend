<template>
  <q-card-section class="bg-white">
    <div class="row q-py-lg">
      <div class="col-6 q-px-sm">
        <span class="information">K-APT 아파트명: &nbsp;&nbsp;&nbsp;</span>
         <span class="information sub">{{estate.apart_name || '삼성 힐스테이트 1단지'}}</span>
      </div>
      <div class="col-6 q-px-sm">
        <span class="information">K-APT 단지코드: &nbsp;&nbsp;&nbsp;</span>
        <span class="information sub">{{ estate.code || 'K-Apart Code' }}</span>
      </div>
    </div>
    <div class="row table">
      <div class="col-md-4 col-6 row" v-for="(item, i) of getInfo" :key="i">
        <div class="q-pa-sm label">
          <span class="information">{{item.label}}</span>
        </div>
        <span class="information sub flex items-center q-px-sm">{{ item.value }}</span>
      </div>
    </div>
  </q-card-section>
</template>

<script>
export default {
  computed: {
    getInfo() {
      return [
        { label: "동 (개)수", value: `${10}개 동` },
        { label: "세대 수", value: `${488} 세대` },
        { label: "층수 (지상/지하)", value: 30 },
        { label: "주차대수 (지상/지하)", value: '1000/500' },
        { label: "엘리베이터 수", value: 3 },
        { label: "대지면적 (m2)", value: '10000㎡' },
        { label: "연면적 (m2)", value: '120366.16㎡' },
        { label: "건축면적 (m2)", value: '1500㎡' },
        { label: "용적률", value: '1000%' },
        { label: "건폐율", value: '50%' },
        { label: "분양형태", value: '분양' },
        { label: "복도유형", value: '계단식' },
        { label: "난방방식", value: '개별난방' },
        { label: "부대복리시설", value: '헬스장, 수영장' },
        { label: "주건물구조", value: '주건물구조' },
        { label: "시공사", value: '지에스건설주식회사' },
        { label: "시행사", value: '서강주택재건축정비사업조합' },
        { label: "사용승인일", value: '2010.02.26' },
        { label: "역세권", value: '강남역' },
        { label: "관리사무소 연락처", value: '02-123-4567' }
      ]
    }
  },
  props: {
    estate: {
      type: Object
    }
  }
};
</script>

<style lang="scss">
.table{
  border-top: 2px solid #555555;
  border-bottom: 1px solid #e9e9e9;
  >.row {
    &:not(:nth-last-child(-n+2)){
      border-bottom: 1px solid #e9e9e9;
    }
    >.label{
      background-color: #f6f6f6;
      width: 130px;
    };
  }
}
.information {
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -1.05px;
  color: #707070;
  margin-left: 0px;
  &.sub {
  font-weight: 500;
  }

}
</style>
