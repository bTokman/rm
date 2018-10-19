<template>
    <div>
        <highcharts class="chart" :options="this.chartOptions"></highcharts>
    </div>

</template>

<script>
  import {buildLineChartConfig} from './chartConfig';
  import store from '@/store';

  export default {
    name: "charts",
    data() {
      return this.fillData();
    },
    created() {
      this.$store.dispatch("metric");
    },
    methods: {
      fillData() {
        return buildLineChartConfig(store.state.startDayMetricData, store.state.endDayMetricData);
      }
    },
    watch : {

    }
  }
</script>

<style>
    body {
        padding: 0;
        margin: 0;
    }
</style>
