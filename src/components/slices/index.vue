<template>
    <div class="slices__wrapper">
        <div v-for="(slice,index) in this.slices">
            <div class="slice_title">
                {{index}}
            </div>
            <div class="sub__wrapper">
                <div class="item__wrapper" v-for="data in slice">
                    <div class="sub_title">
                        {{data.name}}
                    </div>
                    <div class="item_count">{{data.total}}</div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
  export default {
    name: "slices",
    data() {
      return {
        slices: []
      }
    },
    async beforeCreate() {
      await this.$store.dispatch('getSlices', {id: this.$route.params.id});

      this.slices = this.$store.state.slices;
    }
  }
</script>

<style scoped>
    .slice_title {
        text-transform: uppercase;
        margin-top: 25px;
        margin-left: 5%;
        width: 80%;
        border-bottom: 3px solid #458cc9;
        padding-bottom: 5px;
    }

    .item__wrapper {
        width: 35%;
        height: 65px;
        margin-left: 20px;
        background: #458cc9;
        padding: 0px 10px 0px 10px;
        color: #fff;
        margin-top: 25px;
    }

    .sub__wrapper {
        display: flex;
        flex-wrap: wrap;
    }

    .item_count {
        background: #fff;
        color: #000;
        width: 100%;
        height: 15px;
        text-align: center;
        padding: 5px 0px 5px 0px;
    }

    .sub_title {
        height: 15px;
        text-align: center;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 10px;
        margin-top: 5px;;
    }
</style>
