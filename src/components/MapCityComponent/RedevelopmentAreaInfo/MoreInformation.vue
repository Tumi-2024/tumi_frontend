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

      <div class="info">
        <div v-for="(item, i) of progress" :key="i" class="item row">
          <div class="title col-4 col-md-2 notosanskr-regular">
            {{ item.title }}
          </div>
          <div class="date col-8 col-md-10 notosanskr-regular">
            <q-icon class="q-pr-sm" name="done" color="secondary" size="18px" />
            {{ item.date || "---" }}
          </div>
        </div>
      </div>
    </section>

    <section class="q-py-xl"></section>
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
}
</style>
