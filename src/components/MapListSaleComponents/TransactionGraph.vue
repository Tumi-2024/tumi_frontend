<template>
  <div>
    <div class="heading-title">실거래 정보</div>
    <div class="row">
      <div class="column">
        <!-- 카테고리 / 기간별 면적당 차트 -->
        <div class="summary row align-center">
          <div class="title text-primary text-bold">5억 1,000만 (3층)</div>
          <LineChart  :chart-data="datacollection" :options="options" />
        </div>
      </div>
      <div>
        <!-- 카테고리 / 기간별 실거래 차트 -->
      </div>
      <div>
        <!-- 카테고리 / 기간별 실거래 이력 -->
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from 'src/utils/lineChart'
export default {
  components: {
    LineChart
  },
  data () {
    return {
      datacollection: {
        labels: [1, 2, 3],
        datasets: [
          {
            data: [10.1, 11.6, 10],
            fill: false,
            borderColor: '#FF5A00',
            tension: 0,
            radius: 0
          }
        ]
      },
      options: {
        plugins: {
          datalabels: {
            formatter: () => ''
          }
        },
        scales: {
          yAxes: [{
            gridLines: {
              drawTicks: false,
              drawOnChartArea: false
            },
            ticks: {
              callback: () => '',
              max: 20,
              min: 5
            }
          }],
          xAxes: [{
            gridLines: {
              drawTicks: false,
              drawOnChartArea: false
            },
            ticks: {
              callback: () => '',
              max: 20,
              min: 5
            }
          }]
        },
        legend: {
          display: false
        }
      }
    }
  },
  methods: {
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }

}
</script>

<style lang="scss" scoped>
.heading-title {
  font-family: "notosanskr-medium";
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 26px;
  letter-spacing: -1.275px;
  color: #1a1a1a;
}
.summary {
  background-color: #F7F7F7;
  border-radius: 12px;
  padding: 20px;
  .title {
    font-size: 18px;
  }
}
</style>
