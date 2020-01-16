<template>
  <div class="vx-row w-full pl-6">
    <div class="vx-col w-full p-0" v-if="showDebtButton">
      <div class="flex justify-between p-0 pb-4" v-if="showAction">
        <div class="flex">
          <vx-tooltip text="Sales History" position="top">
            <vs-button icon-pack="feather" icon="icon-file-text"
                       color="warning"
                       type="border"
                       class="mr-2" @click="showHistory()">
              Show History
            </vs-button>
          </vx-tooltip>
          <vx-tooltip text="See Debtors" position="top" v-if="showDebtButton">
            <vs-button icon-pack="feather" icon="icon-clipboard"
                       color="danger"
                       type="border"
                       class="mr-2" @click="showDebt()">
              Show Debtors
            </vs-button>
          </vx-tooltip>
        </div>

        <vx-tooltip text="Go Back" position="top">
          <vs-button icon-pack="feather" icon="icon-corner-up-left"
                     color="primary" type="border"
                     class="ml-2  border" @click="backToSalesMenu()">
            Back
          </vs-button>
        </vx-tooltip>

      </div>
    </div>
    <div class="vx-col w-full p-0 pl-0">
      <vx-card>
        <div slot="no-body">
          <transition name="slide-fade">
            <component :is="activeComponent"/>
          </transition>
        </div>
      </vx-card>
    </div>
  </div>


</template>

<script>

  import BarSales from "./steps/Index";
  import History from "./history/Index";
  import Debt from "./debts/Index"

  import eventBus from "../../../../eventBus";

  export default {
    data() {
      return {
        activeComponent: 'BarSales',
        showAction: true,
        showDebtButton: true
      }
    },
    methods: {
      backToSalesMenu() {
        eventBus.$emit('back')
      },
      showHistory() {
        this.activeComponent = 'History'
      },
      showDebt(){
        this.activeComponent = 'Debt'
      },
      listener() {
        eventBus.$on(
          "showActions",
          (payload) => this.showAction = payload
        );
        eventBus.$on(
          "showDebtButton",
          (payload) => this.showDebtButton = payload
        );
        eventBus.$on(
          "backToSales",
          () => this.activeComponent = 'BarSales'
        )
      }
    },
    components: {
      BarSales,
      History,
      Debt
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
