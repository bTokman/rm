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

<style scoped>
    .item_title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #fff;
        background: rgba(69, 140, 201, 1);
        border: 1px solid #fff;
        text-align: center;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.4s;
    }

    .active {
        background: rgb(42, 98, 146);
    }

    .V-accordion {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        overflow: hidden;
    }

    .V-accordion + .V-accordion {
        border-top: 0;
    }

    .V-accordion_trigger {
        cursor: pointer;
        transition: all 0.4s;
    }

    .V-accordion_body {
        line-height: 25px;
        padding: 10px 15px 10px 15px;
        background: #f1f1f1;
        border-left: 2px solid #fff;
        border-right: 2px solid #fff;
        box-sizing: border-box;
        border-bottom: 2px solid #fff;
        display: flex;
        justify-content: space-between;
    }

    .V-accordion_body > div {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .accordion-enter-active {
        -webkit-animation: accordion 0.3s forwards;
        animation: accordion 0.3s forwards;
    }

    .accordion-leave-active {
        animation: accordion 0s 0s reverse;
    }

    .item__count {
        background: #fff;
        padding: 0 10px 0 10px;
        float: right;
        line-height: 50px;
        width: 105px;
        height: 50px;
        text-align: center;
        text-transform: uppercase;
        cursor: pointer;
    }

    .item__name {
        width: 45%;
        overflow: hidden;
        word-wrap: break-word;
        display: flex;
        align-items: center;
    }

    .search__wrapper {
        width: 100%;
        height: 50px;
        background: #fff;
        position: fixed;
        z-index: 1;
    }

    .search__wrapper input {
        width: 60%;
        height: 40px;
        margin-top: 5px;
        margin-left: 5%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        outline: 0;
        font-size: 14px;
        border: 2px solid #efefef;
        padding: 0px 10px 0px 10px;
    }

    .ac_weapper {
        position: relative;
        top: 70px;
        z-index: 15;
    }

    @-webkit-keyframes accordion {
        0% {
            opacity: 0;
            -webkit-transform: translateY(100%);
            transform: translateY(100%);
        }
        100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
    }

    @keyframes accordion {
        0% {
            opacity: 0;
            -webkit-transform: translateY(100%);
            transform: translateY(100%);
        }
        100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
    }

</style>
