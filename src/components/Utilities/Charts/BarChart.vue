<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ["2019", "2020", "2021"],
      datasets: [
        {
          label: "매매",
          backgroundColor: ["#FF7D363D", "#FF7D3691", "#FF7D36"],
          // backgroundColor: "red",
          data: [40, 20, 30]
        },
        {
          label: "전세",
          backgroundColor: ["#0BCDC738", "#0BCDC77A", "#0BCDC7"],
          // backgroundColor: "blue",
          data: [20, 10, 30]
        }
      ]
    },
    options: {
      legend: {
        position: "top",
        align: "end",
        display: true,
        labels: {
          fontFamily: "notosanskr-medium"
        }
      },
      responsive: true,
      barRoundness: 1,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              callback: function(value) {
                return value + "억";
              }
            }
          }
        ]
      }
    }
  }),

  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>

<style></style>
