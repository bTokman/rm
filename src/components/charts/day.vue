<template>
    <div>
        <highcharts class="chart" :options="chartOptions"></highcharts>
    </div>

</template>

<script>
  import {buildLineChartConfig} from './types/chartConfig';
  import store from '@/store';

  export default {
    name: "dayChart",
    data() {
      return buildLineChartConfig(this.$store.state.startDayMetricData, this.$store.state.endDayMetricData)
    },
    created() {
      this.fillData();
    },
    methods: {
      async fillData() {
        await store.dispatch("getMetricData", {id: this.$route.params.id});

        /** For direct route visit **/
        this.chartOptions.series[0].data = Object.values(this.$store.state.startDayMetricData);
        this.chartOptions.series[1].data = Object.values(this.$store.state.endDayMetricData);
      }
    }

  }
</script>

