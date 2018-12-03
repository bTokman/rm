<template>
    <div>
        <div class="float" @click="toggleWrapper()">
            Slices
        </div>

        <div class="selected_items_wrapper">
            <div class="item" @click="resetSelected()" v-for="item in selectedItems">
                <div class="slices_item__title">{{item.parent}} - {{item.name}}</div>
                <div class="slices_item__count">{{item.total}}</div>
            </div>

        </div>

        <div class="slices__wrapper">
            <div @click="reToggleWrapper()" class="slice__header">
                <div class="arrow"></div>
            </div>
            <div v-for="(slice,index) in this.slices">
                <div class="slice_title"
                     v-bind:class="{ active: open === index }"
                     @click="toggle(index)">
                    {{index}}
                    <span class="slice_count">{{slice.length}}</span>
                </div>
                <div class="sub__wrapper" v-show="open === index">
                    <div class="item__wrapper"
                         v-bind:class="{ active: selected === data.name }"
                         @click="toggleSlice(data.name, data.id, data, index)"
                         v-for="data in slice">
                        <div class="sub_title">
                            {{data.name}}
                        </div>
                        <div class="item_count">{{data.total}}</div>
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
        selectedItems: []
      }
    },
    async beforeCreate() {
      await this.$store.dispatch('getSlices', {id: this.$route.params.id});

      this.slices = this.$store.state.slices;
    },
    methods: {
      toggle(index) {
        this.open = this.open === index ? false : index;
        this.selected = false;
      },

      toggleWrapper(e) {
        document.getElementsByClassName('slices__wrapper')[0].classList.add('active');
      },

      reToggleWrapper() {
        document.getElementsByClassName('slices__wrapper')[0].classList.remove('active');
      },

      async resetSelected() {
        await this.$store.dispatch("getMetricData", {id: this.$route.params.id});
        this.selectedItems = [];
        this.selected = false;
        this.open = false;
        this.$root.$emit('chartRedraw');
      },

      async toggleSlice(name, id, item, parentItem) {
        let curValue = this.selected;

        this.selectedItems = [];

        this.selectedItems.push({name: item.name, total: item.total, parent: parentItem})

        this.selected = this.selected === name ? false : name;

        if (curValue !== name) {
          await this.$store.dispatch('getMetricSlice', {metricId: this.$route.params.id, sliceId: id});
        } else {
          await this.$store.dispatch("getMetricData", {id: this.$route.params.id});
          this.selectedItems = [];
        }

        this.$root.$emit('chartRedraw');
      }
    }
  }
</script>