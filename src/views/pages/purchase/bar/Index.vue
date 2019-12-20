<template>
  <vx-card>
    <div slot="no-body">
      <div class="flex justify-between p-2 pb-4" v-if="showAction">
        <vx-tooltip text="Go Back" position="top">
          <vs-button icon-pack="feather" icon="icon-corner-up-left"
                     color="primary" type="border"
                     class="ml-2  border" @click="backToPurchasingMenu()">
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

  import BarPurchase from "./steps/Index";
  import History from "./history/Index";

  import eventBus from "../../../../eventBus";

  export default {
    data() {
      return {
        activeComponent: 'BarPurchase',
        showAction: true
      }
    },
    methods: {
      backToPurchasingMenu() {
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
          "backToPurchases",
          () => this.activeComponent = 'BarPurchase'
        )
      }
    },
    components: {
      BarPurchase,
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
