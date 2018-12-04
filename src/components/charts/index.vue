<template>
    <div class="charts_wrapper">

        <div class="metric_title">
            <div v-on:click="goBack()" class="back"></div>
            <div class="item_title">{{metric}}</div>
            <div class="item_count">{{totalCount}}</div>
        </div>

        <div class="chart__item" v-for="(tab, index) in tabs" v-bind:class="{ active: index == activeTab }">
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
        interval: false,
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
      /** Get highchart options by index **/
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
      /** Go to home page **/
      goBack() {
        store.dispatch('clearMetric');

        this.$router.push('/');
      },

      /** Get data from server  **/
      async fillData(withRedraw = true, sliceId = false) {

        sliceId ?
          await store.dispatch('getMetricSlice', {metricId: this.$route.params.id, sliceId: sliceId}) :
          await store.dispatch("getMetricData", {id: this.$route.params.id});

        this.redraw(withRedraw);
      },


      /**
       * Redraw hightchart
       * @param withAnimation
       */
      redraw(withAnimation = true) {
        this.swichAnimation(withAnimation);

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

      },

      /**
       * Turn on/off chart animation
       * @param status
       */
      swichAnimation(status = true) {
        /** DAY **/
        this.dayChartOptions.series[0].animation = status;
        this.dayChartOptions.series[1].animation = status;

        /** WEEK **/
        this.weekChartOptions.series[0].animation = status;
        this.weekChartOptions.series[1].animation = status;

        /** MONTH **/
        this.monthChartOptions.series[0].animation = status;
        this.monthChartOptions.series[1].animation = status;

        /** QUARTERLY **/
        this.quarterlyChartOptions.series[0].animation = status;
        this.quarterlyChartOptions.series[1].animation = status;
      },

      /** Show chart loading **/
      showLoading() {
        this.$children[0].chart.showLoading();
        this.$children[1].chart.showLoading();
        this.$children[2].chart.showLoading();
        this.$children[3].chart.showLoading();
      },
      /** Hide chart loading **/
      hideLoading() {
        this.$children[0].chart.hideLoading();
        this.$children[1].chart.hideLoading();
        this.$children[2].chart.hideLoading();
        this.$children[3].chart.hideLoading();
      },
      /** Periodically fetch data from server **/
      setInterval(sliceId = false) {
        clearInterval(this.interval);

        this.interval = setInterval(function () {
          this.fillData(false, sliceId);
        }.bind(this), 50000);
      }
    },

    /**
     * Listen global events from another components
     */
    mounted: function () {
      const _this = this;

      this.$root.$on('chartRedraw', (props) => {
        props === undefined ? _this.setInterval() : _this.setInterval(props.sliceId);

        this.redraw();
      });

      _this.setInterval();
    },
  }
</script>
