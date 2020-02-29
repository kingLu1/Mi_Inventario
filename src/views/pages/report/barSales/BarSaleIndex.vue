<template>
  <div>
    <component :is="activeComponent" :records="records"/>
  </div>
</template>

<script>
  // import eventBus from "../../../../../eventBus";
  // import BarSaleDetails from "./BarSaleDetails";
  import BarSaleTable from "./BarSaleTable";

  export default {
    name: "BarSaleIndex",
    props: {
      records: {
        required: true
      }
    },
    components: {
      BarSaleTable,
      // BarSaleDetails
    },
    created() {
      // this.listener();
      // eventBus.$emit('showActions', false)
    },
    beforeDestroy() {
      // eventBus.$emit('showActions', true)
    },
    methods: {
      backToSales() {
        // eventBus.$emit('backToSales')
      },
      goToTable() {
        // this.activeComponent = "HistoryTable"
      },
      listener() {
        // eventBus.$on('goToDetails', (payload) => {
        //   this.activeSales = payload;
        //   this.activeComponent = 'HistoryDetails'
        // });
        // eventBus.$on('backToHistoryTable', () => {
        //   this.activeComponent = 'HistoryTable'
        // });
        // eventBus.$on(
        //   "showInnerActions",
        //   (payload) => this.showInnerAction = payload
        // );
      }
    },
    data: () => ({
      activeComponent: 'BarSaleTable',
      activeSales: '',
    })
  }
</script>

<style scoped>

</style>
