<template>
    <div>
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

<style scoped>
    .metric_title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #fff;
        position: relative;
    }

    .toolbar {
        display: flex;
        justify-content: space-around;
        height: 50px;
        align-content: center;
        align-items: center;
        box-sizing: border-box;
        background: rgba(69, 140, 201, 1);
        border-bottom: 2px solid rgba(69, 140, 201, 1);
    }

    .toolbar > div {
        text-transform: uppercase;
        font-size: 14px;
        padding: 5px 15px 5px 15px;
        color: #fff;
    }

    .toolbar > .active {
        border: 2px solid #fff;
    }

    .back {
        position: absolute;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 12.5px 21.7px 12.5px 0;
        border-color: transparent #458cc9 transparent transparent;
        top: 12px;
        left: 20px;
    }

    .item_count {
        position: absolute;
        right: 15px;
        height: 30px;
        background: #efefef;
        padding-left: 15px;
        padding-right: 15px;
        line-height: 30px;
        top: 10px;
    }

    .item_title {
        width: 45%;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 70px;
    }

</style>
