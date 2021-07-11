import Chart from 'chart.js'
import { generateChart } from 'vue-chartjs'

Chart.defaults.RoundedBar = Chart.defaults.Bar;
Chart.controllers.RoundedBar = Chart.controllers.bar.extend({ /* custom magic here */})

const RoundedBarChart = generateChart('rounded-bar', 'RoundedBar')

export default {
  extends: RoundedBarChart,
  props: ['options'],
  mounted () {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}
