<template>

    <div class="ac_weapper">
        <div class="metric_title">
            <div v-on:click="goBack()" class="back"></div>
            <div class="item_title">{{metric}}</div>
        </div>

        <div v-for="(data,metricName) in this.$store.state.metrics" v-if="metricName == metric">
            <div v-if="" v-for="subData in data">
                <div class="accordion_body">
                    <div v-on:click="goToMetric(subData.id)">
                        <div class="item__name">{{clearMainName(subData.name, metricName)}}</div>
                        <div class="item__count">{{subData.total}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: "subgroup",
    data() {
      return {
        metric: this.$route.params.name
      }
    },
    async created() {
      /** Download metric data from server **/
      if (!this.$store.state.metrics.length) {
        await this.$store.dispatch('getMetrics');
      }
    },
    beforeCreate() {
      if (!this.$store.state.isLogged) {
        return this.$router.push('/login');
      }
    },
    methods: {
      /** Remove from metric name some words **/
      clearMainName(toClean, cleanValue) {
        return toClean.replace(cleanValue + '.', ' ');
      },
      /** Redirect to specific metric **/
      goToMetric(id) {
        this.$router.push({name: 'charts', params: {id: id}});
      },
      goBack() {
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>

</style>
