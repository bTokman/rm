<template>
    <div class="charts_wrapper">
        <div class="metric_title">
            <div v-on:click="goBack()" class="back"></div>
            <div class="item_title">{{metric}}</div>
            <div class="item_count">{{totalCount}}</div>
        </div>


        <div class="" v-for="(tab, index) in tabs" v-bind:class="{ active: index == activeTab }">
            <highcharts class="chart" :options="getOptions(index)"></highcharts>
        </div>

        <slices></slices>

    </div>

</template>

<script>
  import Slices from "../slices/index";
  import {buildDayChartConfig} from './types/dayConfig';
  import {buildWeekChartConfig} from './types/weekConfig';
  import {buildMonthChartConfig} from './types/monthConfig';
  import {buildQuarterlyChartConfig} from './types/quarterlyConfig';
  import store from '@/store';

  export default {
    name: "charts",
    data() {
      return {
        dayChartOptions: buildDayChartConfig(this.$store.state.startDayMetricData, this.$store.state.endDayMetricData),
        weekChartOptions: buildWeekChartConfig(this.$store.state.startWeekMetricData, this.$store.state.endWeekMetricData),
        monthChartOptions: buildMonthChartConfig(this.$store.state.startMonthMetricData, this.$store.state.endMonthMetricData),
        quarterlyChartOptions: buildQuarterlyChartConfig(this.$store.state.startQuarterlyMetricData, this.$store.state.endQuarterlyMetricData),
        metric: null,
        totalCount: null,
        tabs: [
          {
            name: "Day",
            link: '?tab=1'
          },
          {
            name: "Week",
            link: '?tab=2'
          },
          {
            name: "Month",
            link: '?tab=3'
          },
          {
            name: "Quarterly",
            link: '?tab=4'
          },
        ],
        activeTab: this.$route.query.tab ? this.$route.query.tab : 0,
      };
    },
    components: {Slices},
    created() {
      this.fillData();
    },

    async beforeCreate() {
      await this.$store.dispatch('getMetrics');

      const _this = this;

      Object.values(this.$store.state.metrics).forEach((item) => {
        Object.values(item).forEach((insideItem) => {
          if (insideItem.id === parseInt(_this.$route.params.id)) {
            _this.metric = insideItem.name;
            _this.totalCount = insideItem.total;
          }
        });
      });
    },

    methods: {
      getOptions(index) {
        switch (index) {
          case 0 :
            return this.dayChartOptions;
          case  1:
            return this.weekChartOptions;
          case 2 :
            return this.monthChartOptions;
          case 3:
            return this.quarterlyChartOptions;
          default:
            return this.dayChartOptions;
        }
      },
      switchTab(index) {
        this.$router.push({query: {tab: index}});
        this.activeTab = index;
      },
      goBack() {
        store.dispatch('clearMetric');

        this.$router.push('/');
      },
      async fillData() {
        await store.dispatch("getMetricData", {id: this.$route.params.id});

        this.redraw();
      },

      redraw() {
        /** DAY **/
        this.dayChartOptions.series[0].data = Object.values(this.$store.state.startDayMetricData);
        this.dayChartOptions.series[1].data = Object.values(this.$store.state.endDayMetricData);

        /** WEEK **/
        this.weekChartOptions.series[0].data = Object.values(this.$store.state.startWeekMetricData);
        this.weekChartOptions.series[1].data = Object.values(this.$store.state.endWeekMetricData);

        /** MONTH **/
        this.monthChartOptions.series[0].data = Object.values(this.$store.state.startMonthMetricData);
        this.monthChartOptions.series[1].data = Object.values(this.$store.state.endMonthMetricData);

        /** QUARTERLY **/
        this.quarterlyChartOptions.series[0].data = Object.values(this.$store.state.startQuarterlyMetricData);
        this.quarterlyChartOptions.series[1].data = Object.values(this.$store.state.endQuarterlyMetricData);
      }
    },

    mounted: function () {
      this.$root.$on('chartRedraw', () => this.redraw());
    }
  }
</script>
