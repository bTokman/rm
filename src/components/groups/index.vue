<template>
    <div>
        <div class="V-accordion" v-for="(data,metricName) in this.metrics">
            <div class="V-accordion_trigger item_title" @click="toggle(metricName)"
                 v-bind:class="{ active: open === metricName }">
                {{metricName}}
            </div>
            <transition :name="animation" v-for="subData in data" v-bind:data="data" v-bind:key="data.id">
                <div class="V-accordion_body" v-show="open === metricName">
                    <div class="item__name">{{clearMainName(subData.name, metricName)}}</div>
                    <div class="item__count">{{subData.total}}</div>
                </div>
            </transition>
        </div>
    </div>

</template>

<script>
    import router from '@/router';
    import store from '@/store';

    export default {
        name: "groups",
        data() {
            return {
                metrics: [],
                open: false,
                animation: 'accordion',
            };
        },
        beforeCreate() {
            if (!store.state.isLogged) {
                return router.push('login');
            }

            this.$http.get('metrics').then((response) => {
                this.metrics = response.body.metrics;
            });
        },
        methods: {
            toggle(index) {
                this.open = index;
            },
            clearMainName(toClean, cleanValue) {
                return toClean.replace(cleanValue + '.', ' ');
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
        background: rgba(69, 140, 201, 0.5);
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
