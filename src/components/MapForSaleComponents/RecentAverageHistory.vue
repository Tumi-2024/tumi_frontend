<template>
  <q-card class="bg-white notosanskr-medium">
    <q-card-section class="row q-pb-none justify-between">
      <div class="title-heading col-6">
        최근 3년 평균 실거래가
      </div>
      <q-select
        dense
        v-model="areaSelected"
        :options="areaOptions"
        hide-selected
        :label="areaSelected || '평수'"
        class="area-selection"
        color="primary"
        label-color="primary"
        v-if="areaOptions"
      />
    </q-card-section>
    <!-- recent hitory -->
    <q-card-section class="bg-white notosanskr-regular">
      <div class="summary">
        <div class="row items-center">
          <span class="title">최근 한달기준 실거래가 평균</span>
          <div class="badge">
            <span class="title">2020년 6월</span>
          </div>
        </div>
        <div class="price">11억 4,800만</div>
      </div>
      <div class="tags">
        <div class="badge">
          <div class="title">#매매</div>
        </div>
        <div class="badge">
          <div class="title">#35평</div>
        </div>
      </div>
    </q-card-section>
    <BarChart :height="300" :chart-data="datacollection" :options="options" />
  </q-card>
</template>
<script>
import { toMoneyString } from 'src/utils';
import BarChart from 'src/utils/BarChart'

export default {
  components: {
    BarChart
  },
  props: {
    areaOptions: Array,
    item: Object,
    graph: {
      type: Array,
      validator(value) {
        return value.length === 3
      },
      default() {
        return []
      }
    }
  },
  data() {
    return {
      areaSelected: "",
      activeTab: "all",
      datacollection: {
        maintainAspectRatio: false,
        labels: ["2018", "2019", "2020.06"],
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
            data: [this.graph[0].sale, this.graph[1].sale, this.graph[2].sale]
          },
          {
            backgroundColor: ({ dataIndex: index }) => {
              switch (index) {
                case 0:
                  return 'rgba(11, 205, 199, 0.2)'
                case 1:
                  return 'rgba(11, 205, 199, 0.6)'
                case 2:
                  return 'rgba(11, 205, 199, 1)'
                default:
                  return 'rgba(11, 205, 199, 0.2)'
              }
            },
            data: [this.graph[0].rent, this.graph[1].rent, this.graph[2].rent]
          }
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
            ticks: { max: 100000, min: 95000 }
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
    getTransactions() {
      return this.item
    },
    getTicks() {
      // console.log(this.graph)
      // const getMax = this.graph.reduce((acc, curr) => {
      //   return acc <= curr.scale ? curr.scale : acc
      // }, 0)
      // const getMin = this.graph.reduce((acc, curr) => {
      //   return acc >= curr.rent ? curr.rent : acc
      // }, 0)
      return { max: 10000, min: 10000 }
    }
  },
  methods: {
    toMoneyString(value, add) {
      return toMoneyString(value, add)
    }
  },
  mounted() {
    console.log(this.transactions)
  }
};
</script>
<style lang="scss" scoped>
.title-heading {
  font-size: 17px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
  line-height: 26px;
}
.area-selection {
  width: 75px;
  float: right;
  border: #ff5a00 solid 2px;
  border-radius: 8px;
  padding-left: 10px;
}

.unit-heading {
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  text-align: right;
  letter-spacing: -0.9px;
  color: #909090;
}
.table {
  margin-top: 20px;
  border-top: 1px dashed #e8e8e8;
}

.text-30 {
  color: #707070;
}

.tags {
  margin-top: 16px;
  display: flex;
  .badge{
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 8px;
    &:nth-last-child(1) {
      margin-left: 4px;
    }
    .title {
      padding: 0 8px;
      font-family: Noto Sans CJK KR;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 36px;
      text-align: center;
      letter-spacing: -1.05px;
      color: #1A1A1A;
    }
  }
}

.summary {
  display: flex;
  flex-direction: column;
  background-color: #F7F7F7;
  border-radius: 12px;
  padding: 15px;
  justify-content: center;
  .badge {
    background: #FFFFFF;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 4px;
    margin-left: 4px;
    .title {
      padding: 0 4px;
      font-family: Noto Sans CJK KR;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 20px;
      text-align: center;
      letter-spacing: -0.9px;
      color: #707070;
    }
  }
  .title {
    font-family: Noto Sans CJK KR;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 22px;
    letter-spacing: -1.125px;
    color: #D32C00;
  }

  .price {
    font-family: Noto Sans CJK KR;
    font-style: normal;
    font-weight: 500;
    font-size: 21px;
    line-height: 32px;
    letter-spacing: -1.575px;
    color: #1A1A1A;
  }
}
</style>
