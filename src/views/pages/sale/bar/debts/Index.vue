<template>
  <div>
    <div class="flex justify-between p-2">
      <vx-tooltip text="Go Back" position="top">
        <vs-button icon-pack="feather" icon="icon-corner-up-left"
                   color="primary" type="border"
                   class="ml-2  border" @click="backToSales()">
          Back
        </vs-button>
      </vx-tooltip>
    </div>
    <component :is="activeComponent"/>
  </div>
</template>

<script>
  import eventBus from "../../../../../eventBus";
  import DebtsDetails from "./DebtsDetails";
  import DebtsTable from "./DebtsTable";

  export default {
    name: "Index",
    created() {
      eventBus.$emit('showDebtButton', false)
    },
    destroyed() {
      eventBus.$emit('showDebtButton', true)
    },
    components: {
      DebtsTable, DebtsDetails
    },
    data: () => ({
      activeComponent: 'DebtsTable',
      activeDebt: ''
    }),
    methods: {
      backToSales() {
        eventBus.$emit('backToSales')
      },
      goToTable(){
        this.activeComponent = "HistoryTable"
      },
      listener() {
        eventBus.$on('goToDetails', (payload) => {
          this.activeSales = payload;
          this.activeComponent = 'HistoryDetails'
        });
        eventBus.$on('backToHistoryTable', () => {
          this.activeComponent = 'HistoryTable'
        });
        eventBus.$on(
          "showInnerActions",
          (payload) => this.showInnerAction = payload
        );
      }
    },

  }
</script>

<style scoped>

</style>
