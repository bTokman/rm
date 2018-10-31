<template>
    <div>
        <div class="search__wrapper">
            <input type="search" v-model="search" placeholder="Metric name.."/>
        </div>
        <div class="ac_weapper">
            <div v-if="includesSearch(metricName)" class="V-accordion" v-for="(data,metricName) in this.metrics">
                <div class="V-accordion_trigger item_title" @click="toggle(metricName)"
                     v-bind:class="{ active: open === metricName }">
                    {{metricName}}
                </div>
                <transition :name="animation" v-for="subData in data" v-bind:data="data" v-bind:key="data.id">
                    <div class="V-accordion_body" v-show="open === metricName">
                        <div v-on:click="goToMetric(subData.id)">
                            <div class="item__name">{{clearMainName(subData.name, metricName)}}</div>
                            <div class="item__count">{{subData.total}}</div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
  import router from '@/router';

  export default {
    name: "groups",
    data() {
      return {
        search: '',
        metrics: this.$store.state.metrics,
        open: false,
        animation: 'accordion',
      };
    },
    beforeCreate() {
      if (!this.$store.state.isLogged) {
        return router.push('login');
      }
    },
    created() {
      if (!this.$store.state.metrics.length) {
        this.setMetrics();
      }
    },
    methods: {
      toggle(index) {
        this.open = this.open === index ? false : index;
      },
      clearMainName(toClean, cleanValue) {
        return toClean.replace(cleanValue + '.', ' ');
      },
      goToMetric(id) {
        this.$router.push({name: 'charts', params: {id: id}});
      },
      includesSearch(metricName) {
        return metricName.toLowerCase().includes(this.search.toLowerCase());
      },
      async setMetrics() {
        await this.$store.dispatch('getMetrics');
        this.metrics = this.$store.state.metrics;
      }
    }

  }
</script>

