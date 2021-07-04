<template>
  <div>
    <div class="heading-title">실거래 정보</div>
    <div class="row">
      <!-- 카테고리 / 기간별 면적당 차트 -->
      <div class="info-1">
        <div class="summary row items-center justify-between">
          <div class="title text-primary text-bold">5억 1,000만 (3층)</div>
          <LineChart width="80" height="80" :chart-data="datacollection" :options="options" />
        </div>
        <div class="column q-mt-md">
          <div class="row justify-between">
            <div>거래시점</div>
            <div>거래시점</div>
          </div>
           <div class="row justify-between">
             <q-list separator style="flex: 1">
              <q-item class="justify-between" style="padding-right: 0; padding-left: 0;" v-for="(item, index) of [1,2]" :key="index">
              <div>분양 면적당 단가</div>
              <div class="column">
                <span>2억 5천만원</span>
                <span>거래면적</span>
              </div>
               </q-item>
             </q-list>
          </div>
        </div>
      </div>
      <q-separator vertical class="q-mx-md" />
      <!-- 카테고리 / 기간별 실거래 차트 -->
      <div class="info-2">
        <q-slider />
      </div>
      <q-separator vertical class="q-mx-md" />
      <!-- 카테고리 / 기간별 실거래 이력 -->
      <div class="info-3">
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
            borderWidth: '2px',
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
              min: 0
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
.info {
  display: flex;
  flex-direction: column;
  &-1 {
  flex: 10 0 200px;
  }
  &-2 {
  flex: 6 0 200px;
  }
  &-3 {
  flex: 8 0 200px;
  }
}
</style>
