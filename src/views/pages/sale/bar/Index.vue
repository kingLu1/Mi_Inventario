<template>
  <vx-card>
    <div slot="no-body">
      <div class="flex justify-between p-2 pb-0" v-if="showAction">
        <vx-tooltip text="Go Back" position="top">
          <vs-button icon-pack="feather" icon="icon-corner-up-left"
                     color="primary" type="border"
                     class="ml-2  border" @click="backToSalesMenu()">
            Back
          </vs-button>
        </vx-tooltip>
        <vx-tooltip text="Go Back" position="top">
          <vs-button icon-pack="feather" icon="icon-file-text"
                     color="warning"
                     type="border"
                     class="mr-2" @click="showHistory()">
            Show History
          </vs-button>
        </vx-tooltip>
      </div>
      <transition name="slide-fade">
        <component :is="activeComponent"/>
      </transition>
    </div>
  </vx-card>

</template>

<script>

  import BarSales from "./steps/Index";
  import History from "./history/Index";

  import eventBus from "../../../../eventBus";

  export default {
    data() {
      return {
        activeComponent: 'BarSales',
        showAction: true
      }
    },
    methods: {
      backToSalesMenu() {
        eventBus.$emit('back')
      },
      showHistory() {
        this.activeComponent = 'History'
      },
      listener() {
        eventBus.$on(
          "showActions",
          (payload) => this.showAction = payload
        );
        eventBus.$on(
          "backToSales",
          () => this.activeComponent = 'BarSales'
        )
      }
    },
    components: {
      BarSales,
      History
    },
    created() {
      this.listener()
    }
  }
</script>
<style lang="scss" scoped>
  .slide-fade-enter-active {
    transition: all .5s ease-in;
  }

  .slide-fade-leave-active {
    transition: all .3s ease-out;
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */
  {
    transform: translateY(-15px);
    opacity: 0;
  }
</style>
