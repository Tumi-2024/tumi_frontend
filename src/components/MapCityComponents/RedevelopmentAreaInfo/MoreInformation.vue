<template>
  <div class="more-information">
    <section class="address-section bg-white">
      <q-badge
        outline
        color="primary"
        class="badge-type notosanskr-medium"
        label="재개발 구역"
      />
      <div class="title-heading notosanskr-medium">
        <!-- 서울영등포 공공주택지구 -->
        {{ getMapSelectedArea.title }}
      </div>
      <div class="sub-title notosanskr-regular">
        <!-- 서울 특별시 동대문구 전농동 106-1 -->
        {{ getMapSelectedArea.address }}
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
              {{ getStatValue(stat.value) }} {{ stat.unit }}
            </div>
          </section>
        </div>
        <q-separator inset v-if="stats.length - 1 !== i" />
      </div>
    </section>

    <redevelopment-progress :items="getRedevelopmentSteps()" title="진행단계" />

    <section
      class="investment-point notosanskr-regular"
      v-if="getMapSelectedArea.description_investment"
    >
      <div class="title-heading notosanskr-medium">
        투자포인트
      </div>
      <div class="item summernote" v-html="getMapSelectedArea.description_investment"></div>
    </section>

    <section class="button-fixed-bottom">
      <q-btn
        color="primary"
        text-color="white"
        class=" notosanskr-medium "
        label="이지역 투자매물 보러가기"
      />
    </section>

    <section style="min-height: 200px;"></section>
  </div>
</template>

<script>
import RedevelopmentProgress from "components/Utilities/RedevelopmentProgress";
import { mapGetters } from "vuex";
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
          value: "size_area",
          default: 0,
          unit: "m²"
        },
        {
          icon: "AreaStats/number-household.svg",
          title: "소유자 수",
          value: "count_owner",
          default: 0,
          unit: "명"
        },
        {
          icon: "AreaStats/number-household.svg",
          title: "세입자 수",
          value: "count_house",
          default: 0,
          unit: "명"
        },
        {
          icon: "AreaStats/number-household.svg",
          title: "조합원 수",
          value: "count_member",
          default: 0,
          unit: "명"
        },
        {
          icon: "AreaStats/number-members.svg",
          title: "조합원 수",
          value: "count_member",
          default: 0,
          unit: "명"
        },
        {
          icon: "AreaStats/progress.svg",
          title: "진행단계",
          value: "redevelopment_step"
        },
        {
          icon: "AreaStats/constructor.svg",
          title: "시공사",
          value: "construction_company"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("area", ["getMapSelectedArea"])
  },
  methods: {
    getStatValue(value) {
      switch (value) {
        case "size_area":
          return this.getMapSelectedArea.size_area || 0;
        case "count_house":
          return this.getMapSelectedArea.count_house || 0;
        case "count_owner":
          return this.getMapSelectedArea.count_owner || 0;
        case "count_member":
          return this.getMapSelectedArea.count_member || 0;
        case "redevelopment_step":
          return this.getMapSelectedArea.redevelopment_step
            ? this.getMapSelectedArea.redevelopment_step.title
            : "-";
        default:
          return this.getMapSelectedArea.construction_company || "-";
      }
    },
    getRedevelopmentSteps() {
      let steps = [];
      if (this.getMapSelectedArea.redevelopment_steps) {
        steps = this.getMapSelectedArea.redevelopment_steps.map(item => ({
          title: item.title,
          date: item.date
        }));
      }
      return steps;
    }
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
