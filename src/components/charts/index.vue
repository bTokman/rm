<template>
    <div class="charts_wrapper">
        <div class="metric_title">
            <div v-on:click="goBack()" class="back"></div>
            <div class="item_title">{{metric}}</div>
            <div class="item_count">{{totalCount}}</div>
        </div>
        <div class="toolbar">
            <div v-on:click="switchTab(index)" v-for="(tab, index) in tabs"
                 v-bind:class="{ active: index == activeTab }">{{tab.name}}
            </div>
        </div>

        <day-chart></day-chart>
        <slices></slices>

    </div>

</template>

<script>
  import DayChart from './day';
  import Slices from "../slices/index";

  export default {
    name: "charts",
    data() {
      return {
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
            name: "Year",
            link: '?tab=4'
          },
        ],
        activeTab: this.$route.query.tab ? this.$route.query.tab : 0,
      };
    },
    components: {Slices, DayChart},
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
      switchTab(index) {
        this.$router.push({query: {tab: index}});
        this.activeTab = index;
      },
      goBack() {
        this.$router.push('/');
      }
    }
  }
</script>
