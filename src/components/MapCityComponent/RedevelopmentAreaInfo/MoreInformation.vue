<template>
  <div class="more-information">
    <div class="address-info bg-white">
      <q-badge
        outline
        color="primary"
        class="badge-type notosanskr-medium"
        label="재개발 구역"
      />
      <div class="title notosanskr-medium">서울영등포 공공주택지구</div>
      <div class="sub-title notosanskr-regular">
        서울 특별시 동대문구 전농동 106-1
      </div>
    </div>

    <div class="area-stats bg-white">
      <div v-for="(stat, i) of stats" :key="i">
        <div class="row q-pa-md">
          <q-icon size="56px" style="margin-right: 12px">
            <img :src="require(`assets/icons/${stat.icon}`)" alt="" />
          </q-icon>
          <section class="column">
            <div class="stat-title notosanskr-medium">
              {{ stat.title }}
            </div>
            <div class="stat-value notosanskr-medium">
              {{ stat.value }}
            </div>
          </section>
        </div>
        <q-separator inset />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stats: [
        {
          icon: "AreaStats/area.svg",
          title: "면적",
          value: "9,275 ㎡"
        },
        {
          icon: "AreaStats/number-household.svg",
          title: "건립세대 수",
          value: "11,375 세대"
        },
        {
          icon: "AreaStats/number-members.svg",
          title: "조합원 수",
          value: "375 명"
        },
        {
          icon: "AreaStats/progress.svg",
          title: "진행단계",
          value: "준공인가"
        },
        {
          icon: "AreaStats/constructor.svg",
          title: "시공사",
          value: "현대 산업개발 & 포스트건설"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.more-information {
  overflow-y: auto;
  height: 90vh;

  .address-info {
    padding: 24px 16px;
    .q-badge {
      font-weight: bold;
      font-size: 12px;
      line-height: 24px;
      letter-spacing: -0.9px;
      color: #ff5100;
      border: #ff5100 1px solid;
      padding: 0 4px;
    }
    .title {
      font-weight: 500;
      font-size: 21px;
      line-height: 32px;
      letter-spacing: -1.575px;
      color: #1a1a1a;
    }
    .sub-title {
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -1.2px;
      color: #707070;
    }
  }

  .area-stats {
    margin: 8px 0;
    .stat-title {
      font-weight: 500;
      font-size: 13px;
      line-height: 20px;
      letter-spacing: -0.97px;
      color: #707070;
    }
    .stat-value {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -1.2px;
      color: #1a1a1a;
    }
  }
}
</style>
