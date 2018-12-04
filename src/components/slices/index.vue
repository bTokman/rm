<template>
    <div>
        <div class="float" @click="showWrapper()">
            Slices
        </div>
        <div class="non_clicked_wrapper">
            <div class="selected_items_wrapper">
                <div class="item" @click="resetSelected()" v-for="item in selectedItems">
                    <div class="slices_item__title">{{item.parent}} - {{item.name}}</div>
                    <div class="slices_item__count">{{item.total}}</div>
                </div>

            </div>

            <div v-touch:swipe.left="hideWrapper" @click="hideWrapper()" class="slice__header">
                <div class="arrow"></div>
            </div>
            <div v-touch:swipe.left="hideWrapper" class="slices__wrapper">
                <div class="slices__list">
                    <div v-for="(slice,index) in this.slices">
                        <div class="slice_title"
                             v-bind:class="{ active: open === index }"
                             @click="toggle(index)">
                            {{index}}
                            <span class="slice_count">{{slice.length}}</span>
                        </div>
                        <div class="sub__wrapper" v-show="open === index">
                            <div class="sub_menu_wrapper"
                                 v-bind:class="{ active: selected === data.name }"
                                 @click="toggleSlice(data.name, data.id, data, index)"
                                 v-for="data in slice">
                                <div>
                                    <div class="item__name"> {{data.name}}</div>
                                    <div class="item__count">{{data.total}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
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
        slices: [],
        open: false,
        selected: false,
        selectedItems: [],
      }
    },
    /** Download slice by rout param **/
    async beforeCreate() {
      await this.$store.dispatch('getSlices', {id: this.$route.params.id});

      this.slices = this.$store.state.slices;
    },
    methods: {
      /** Toggle slice dropdown **/
      toggle(index) {
        this.open = this.open === index ? false : index;
        this.selected = false;
      },

      /** Show slices wrapper **/
      showWrapper() {
        let mainWrapper = document.getElementsByClassName('non_clicked_wrapper')[0];
        mainWrapper.classList.add('active');
      },

      /** Hide slices wrapper **/
      hideWrapper() {
        let mainWrapper = document.getElementsByClassName('non_clicked_wrapper')[0];
        mainWrapper.classList.remove('active');
      },


      /** Reset all selected items **/
      async resetSelected() {
        await this.$store.dispatch("getMetricData", {id: this.$route.params.id});
        this.selectedItems = [];
        this.selected = false;
        this.open = false;
        this.$root.$emit('chartRedraw');
      },

      /** Toggle specific slice and dowload data from server **/
      async toggleSlice(name, id, item, parentItem) {
        let curValue = this.selected;

        this.selectedItems = [];

        this.selectedItems.push({name: item.name, total: item.total, parent: parentItem})

        this.selected = this.selected === name ? false : name;

        setTimeout(function () {
          this.hideWrapper();
        }.bind(this), 500);


        if (curValue !== name) {
          await this.$store.dispatch('getMetricSlice', {metricId: this.$route.params.id, sliceId: id});
        } else {
          await this.$store.dispatch("getMetricData", {id: this.$route.params.id});
          this.selectedItems = [];
        }

        /** Send event to redraw charts **/
        this.$root.$emit('chartRedraw', {metricId: this.$route.params.id, sliceId: id});
      }
    }
  }
</script>