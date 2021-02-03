<template>
  <q-card-section class="q-pa-none">
    <redevelopment-progress title="재개발 정보" :items="stats" />
  </q-card-section>
</template>
<script>
import RedevelopmentProgress from "components/Utilities/RedevelopmentProgress";

export default {
  components: {
    "redevelopment-progress": RedevelopmentProgress
  },
  data() {
    return {
      stats: [
        {
          title: "추진위원회 승인",
          date: "2004.07.20"
        },
        {
          title: "정비구역지정",
          date: "2005.05.19"
        },
        {
          title: "조합설립인가",
          date: "2005.05.19"
        },
        {
          title: "시공사",
          date: null
        },
        {
          title: "사업시행인가",
          date: "2005.05.19"
        },
        {
          title: "관리처분인가",
          date: "2005.05.19"
        },
        {
          title: "착공",
          date: "2005.05.19"
        },
        {
          title: "일반분양",
          date: null
        },
        {
          title: "준공인가",
          date: "2005.05.19"
        }
      ]
    };
  }
};
</script>
