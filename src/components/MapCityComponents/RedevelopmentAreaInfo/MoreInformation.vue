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
            <div class="stat-value notosanskr-medium" v-if="stat.default == 0">
              {{ getStatValue(stat.value) | number("0,0") }} {{ stat.unit }}
            </div>
            <div class="stat-value notosanskr-medium" v-else>
              {{ getStatValue(stat.value) }}
            </div>
          </section>
        </div>
        <q-separator inset v-if="stats.length - 1 !== i" />
      </div>
    </section>

    <section class="area-stats-section bg-white">
      <div style="justify-content: flex-end; display: flex">
        <q-select
          style="width: 150px; margin-right: 20px"
          label="카테고리"
          color="primary"
          label-color="primary"
          :value="ctgr1"
          emit-value
          map-options
          @input="getCtgrGraphData"
          :options="[
          {label: '아파트', value: 'APARTMENT'},
          {label: '오피스텔', value: 'OFFICETEL'},
          {label: '상업업무용', value: 'COMMERCIAL '},
          {label: '분양/입주권', value: 'LAND'},
          {label: '연립/다세대', value: 'ALLIANCE'},
          {label: '단독/다가구', value: 'SINGLE'},
          {label: '토지', value: 'LAND'}
          ]"
        />
      </div>
      <!-- <BarChart :height="300" :chart-data="datacollection" :options="options" /> -->
      <LineChart :chart-data="datacollection" :options="options" style="margin: 0 20px" />
    </section>

    <redevelopment-progress :items="getRedevelopmentSteps()" title="진행단계" />

    <section
      class="investment-point notosanskr-regular"
      v-if="getMapSelectedArea.description_investment"
    >
      <div class="title-heading notosanskr-medium">
        투자포인트
      </div>
      <div
        class="item summernote"
        v-html="getMapSelectedArea.description_investment"
      ></div>
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
import Vue from 'vue'
import RedevelopmentProgress from "components/Utilities/RedevelopmentProgress";
import BarChart from 'src/utils/BarChart'
import LineChart from 'src/utils/lineChart'
import { toMoneyString, toSimpleMoneyString } from 'src/utils';
import { mapGetters } from "vuex";
export default {
  components: {
    "redevelopment-progress": RedevelopmentProgress,
    // BarChart,
    LineChart
  },
  data() {
    return {
      ctgr1: 'ALLIANCE',
      transactions: [],
      defaultPeriods: ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"],
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
      ],
      datacollection: {
        maintainAspectRatio: false,
        labels: ["2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020"],
        datasets: [
          {
            backgroundColor: ({ dataIndex: index }) => {
              switch (index) {
                case 0:
                  return 'rgba(255, 125, 54, 0.2)'
                case 1:
                  return 'rgba(255, 125, 54, 0.6)'
                case 2:
                  return 'rgba(255, 125, 54, 1)'
                default:
                  return 'rgba(255, 125, 54, 0.2)'
              }
            },
            data: []
          }
          // {
          //   backgroundColor: ({ dataIndex: index }) => {
          //     switch (index) {
          //       case 0:
          //         return 'rgba(11, 205, 199, 0.2)'
          //       case 1:
          //         return 'rgba(11, 205, 199, 0.6)'
          //       case 2:
          //         return 'rgba(11, 205, 199, 1)'
          //       default:
          //         return 'rgba(11, 205, 199, 0.2)'
          //     }
          //   },
          //   data: [99000, 99000, 99000]
          // }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            formatter: (d) => toMoneyString(d)
          }
        },
        scales: {
          yAxes: [{
            gridLines: {
              drawTicks: false,
              drawOnChartArea: false
            },
            ticks: {
              min: 20000,
              callback: function(val, index) {
                // Hide the label of every 2nd dataset
                return index % 2 === 1 ? toSimpleMoneyString(val) : '';
              }
            }
          }],
          xAxes: [{
            gridLines: {
              drawTicks: false,
              drawOnChartArea: false
            }
          }]
        },
        legend: {
          display: false
        }
      }
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
    toMoneyString(value, add) {
      return toMoneyString(value, add)
    },
    getRedevelopmentSteps() {
      let steps = [];
      if (this.getMapSelectedArea.steps) {
        steps = this.getMapSelectedArea.steps.map(item => ({
          title: item.title,
          date: item.date
        }));
      }
      return steps;
    },
    getCtgrGraphData(value) {
      this.ctgr1 = value
      const t = this.transactions.filter(obj => obj.categories[0] === this.ctgr1).map(obj => obj.recent_transactions[obj.categories[0]])
      const periods = []
      t.forEach(obj => {
        const textYear = obj.text_month.slice(0, 4)
        const hasPeriod = periods.some(obj => obj.period === textYear)

        if (!hasPeriod) {
          periods.push({ period: textYear, price: [obj.price] })
        } else {
          periods.find(obj => obj.period === textYear).price.push(obj.price)
        }
      })
      // this.datacollection.labels = a.map(obj => obj.period).sort()
      this.datacollection.datasets[0].data = this.defaultPeriods.map(period => {
        const prices = periods.find(pr => pr.period === period)
        if (prices) {
          const result = prices.price.reduce(function add(sum, currValue) {
            return sum + currValue;
          }, 0);
          return result / prices.price.length;
        }
      })
      this.datacollection = Object.assign({}, this.datacollection);
    }
  },
  async beforeMount() {
    const { data } = await Vue.prototype.$axios.post(`redevelopment_areas/${this.getMapSelectedArea.id}/transaction_groups?page_size=1000`)
    this.transactions = data.results
    this.getCtgrGraphData('ALLIANCE')
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
