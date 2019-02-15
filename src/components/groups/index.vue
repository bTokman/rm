<template>
    <div>
        <div class="search__wrapper">
            <input type="search" v-model="search" placeholder="Search"/>
        </div>

        <div class="main_wrappper">
            <div v-if="includesSearch(metricName)" class="accordion"
                 v-for="(data,metricName) in this.$store.state.metrics">
                <div class="accordion_trigger item_title" @click="goToSubGroup(metricName)">
                    {{metricName}}
                </div>
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
      goToSubGroup(name) {
        this.$router.push({name: 'subgroup', params: {name: name}})
      },

      /** Search metric action **/
      includesSearch(metricName) {
        return metricName.toLowerCase().includes(this.search.toLowerCase());
      },
    }
  }
</script>
