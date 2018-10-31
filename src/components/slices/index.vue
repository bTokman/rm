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