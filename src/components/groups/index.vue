<template>
    <div>
        <div class="search__wrapper">
            <input type="search" v-model="search" placeholder="Search"/>
        </div>

        <div class="ac_weapper">
            <div v-if="includesSearch(metricName)" class="accordion"
                 v-for="(data,metricName) in this.$store.state.metrics">
                <div class="accordion_trigger item_title" @click="toggle(metricName)"
                     v-bind:class="{ active: open === metricName }">
                    {{metricName}}
                </div>
                <transition :name="animation" v-for="subData in data" v-bind:data="data" v-bind:key="data.id">
                    <div class="accordion_body" v-show="open === metricName">
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
        open: false,
        animation: 'accordion',
      };
    },
    beforeCreate() {
      /** Redirect to login page if user not lggined **/
      if (!this.$store.state.isLogged) {
        return router.push('login');
      }
    },
    async created() {
      /** Download metric data from server **/
      if (!this.$store.state.metrics.length) {
        await this.$store.dispatch('getMetrics');
      }
    },
    methods: {
      /** Toggle dropdown items **/
      toggle(index) {
        this.open = this.open === index ? false : index;
      },
      /** Remove from metric name some words **/
      clearMainName(toClean, cleanValue) {
        return toClean.replace(cleanValue + '.', ' ');
      },
      /** Redirect to specific metric **/
      goToMetric(id) {
        this.$router.push({name: 'charts', params: {id: id}});
      },
      /** Search metric action **/
      includesSearch(metricName) {
        return metricName.toLowerCase().includes(this.search.toLowerCase());
      },
    }
  }
</script>
