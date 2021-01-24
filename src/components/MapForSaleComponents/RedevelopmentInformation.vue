<template>
  <q-card flat>
    <q-card-section>
      <LandForSaleInformationList title="재개발 정보" :is-icon="true" :payload="payload" />
    </q-card-section>
  </q-card>
</template>
<script>
import LandForSaleInformationList from './LandForSaleInformationList'

export default {
  data() {
    return {
      payload: [
        {
          label: '추진위원회 승인',
          value: '2004.07.20'
        },
        {
          label: '정비구역지정',
          value: '2005.05.19'
        },
        {
          label: '조합설립인가',
          value: '2005.05.19'
        },
        {
          label: '시공사',
          value: null
        },
        {
          label: '사업시행인가',
          value: '2005.05.19'
        },
        {
          label: '관리처분인가',
          value: '2005.05.19'
        },
        {
          label: '착공',
          value: '2005.05.19'
        },
        {
          label: '일반분양',
          value: null
        },
        {
          label: '준공인가',
          value: '2005.05.19',
          highlight: true
        }
      ]
    }
  },
  components: {
    LandForSaleInformationList
  }
}
</script>
