<template>
  <div style="min-height: 306px">
    <bar-chart :chartdata="chartdata" :options="options" />
  </div>
</template>

<script>
import BarChart from "src/components/Utilities/Charts/BarChart.vue";
export default {
  components: {
    BarChart
  },
  data() {
    return {
      chartdata: {
        labels: ["2019", "2020", "2021"],
        datasets: [
          {
            label: "매매",
            backgroundColor: ["#FF7D363D", "#FF7D3691", "#FF7D36"],
            // backgroundColor: "red",
            data: [20, 30, 40]
          },
          {
            label: "전세",
            backgroundColor: ["#0BCDC738", "#0BCDC77A", "#0BCDC7"],
            // backgroundColor: "blue",
            data: [15, 30, 50]
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
    };
  }
};
</script>

<style lang="scss" scoped></style>
