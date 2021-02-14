<template>
  <div class="more-information">
    <section class="address-section bg-white">
      <q-badge
        outline
        color="primary"
        class="badge-type notosanskr-medium"
        label="재개발 구역"
      />
      <div class="title-heading notosanskr-medium">서울영등포 공공주택지구</div>
      <div class="sub-title notosanskr-regular">
        서울 특별시 동대문구 전농동 106-1
      </div>
    </section>

    <section class="area-stats-section bg-white">
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
    </section>

    <redevelopment-progress :items="progress" title="진행단계" />

    <section class="investment-point notosanskr-regular">
      <div class="title-heading notosanskr-medium">
        투자포인트
      </div>
      <div class="item">
        ·주변 재개발 지역의 <span class="text-primary">지속적 분양</span>으로
        인한 인지도 및 <span class="text-primary">주목도</span> 향상
      </div>

      <div class="item">
        ·서울 4대공원 중 하나인
        <span class="text-primary">북서울 꿈의 숲</span> 인접한 Park-front대단지
      </div>
    </section>

    <section class="button-fixed-bottom">
      <q-btn
        color="primary"
        text-color="white"
        class=" notosanskr-medium "
        label="이지역 투자매물 보러가기"
      />
    </section>

    <section style="min-height: 180px;"></section>
  </div>
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
      ],
      progress: [
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
          title: "사업시행인가",
          date: "2006.09.24"
        },
        {
          title: "관리처분인가",
          date: "2007.10.24"
        },
        {
          title: "착공",
          date: "2008.02.29"
        },
        {
          title: "일반분양",
          date: null
        },
        {
          title: "준공인가",
          date: "2010.09.24"
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
  margin-bottom: 200px;

  .address-section {
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
    .title-heading {
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

  .area-stats-section {
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

  .investment-point {
    background: white;
    margin-top: 8px;
    padding: 24px 16px;
    .title-heading {
      font-weight: 500;
      font-size: 17px;
      line-height: 26px;
      letter-spacing: -1.275px;
      color: #1a1a1a;
      padding-bottom: 10px;
    }

    .item {
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -1.05px;
      color: #1a1a1a;
      padding-top: 10px;
    }
  }
  .button-fixed-bottom {
    width: 100%;
    max-width: 1000px;
    position: fixed;
    bottom: 0;
    z-index: 1;

    text-align: center;
    padding: 0 16px;
    margin-bottom: 8px;
    .q-btn {
      background: #ff5100;
      width: 100%;
      font-weight: 500;
      font-size: 17px;
      line-height: 52px;
      /* identical to box height, or 306% */

      text-align: center;
      letter-spacing: -1.25px;
      border-radius: 12px;
    }
  }
}
</style>
