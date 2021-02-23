<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  data: () => ({}),
  props: {
    chartdata: {},
    options: {}
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  }
};
</script>

<style></style>
