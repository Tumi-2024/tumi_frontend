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

    <section class="progress-section bg-white">
      <div class="title-heading notosanskr-medium">
        진행단계
      </div>

      <div class="info notosanskr-regular">
        <div v-for="(item, i) of progress" :key="i" class="item row">
          <div
            class="title col-4 col-md-2"
            :class="{ 'text-primary': i === progress.length - 1 }"
          >
            {{ item.title }}
          </div>

          <div class="date col-8 col-md-10" v-if="item.date">
            <q-icon class="q-pr-sm" name="done" color="secondary" size="18px" />
            {{ item.date }}
          </div>
          <div class="row justify-start items-center" v-else>
            <div class="bg-dark q-ml-lg" style="height: 2px; width: 4px"></div>
            <q-icon name="horizontal_rule" size="20px" />
          </div>
        </div>
      </div>
    </section>

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

    <section style="min-height: 180px;"></section>
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

  .progress-section {
    padding: 24px 16px;
    .title-heading {
      font-weight: 500;
      font-size: 17px;
      line-height: 26px;
      letter-spacing: -1.275px;
      color: #1a1a1a;
    }
    .info {
      padding-top: 15px;
      .item {
        padding: 5px 0;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: -1.05px;
        .title {
          color: #707070;
        }
        .date {
          display: flex;
          align-items: center;
          color: #1a1a1a;
        }
      }
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
}
</style>
