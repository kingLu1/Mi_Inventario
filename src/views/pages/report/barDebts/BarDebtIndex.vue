<template>
  <div>
    <component :is="activeComponent" :records="records"/>
  </div>
</template>

<script>
  // import eventBus from "../../../../../eventBus";
  // import BarDebtDetails from "./BarDebtDetails";
  import BarDebtTable from "./BarDebtTable";

  export default {
    name: "Index",
    props: {
      records: {
        required: true
      }
    },
    components: {
      BarDebtTable,
      // BarDebtDetails
    },
    data: () => ({
      activeComponent: 'BarDebtTable',
      activeDebt: '',
      showInnerAction: false
    }),
    methods: {
      backToSales() {
        // eventBus.$emit('backToSales')
      },
      goToTable() {
        this.activeComponent = "DebtsTable"
      },
      listener() {
        // eventBus.$on('goToDetails', (payload) => {
        //   this.activeDebt = payload;
        //   this.activeComponent = 'DebtsDetails';
        // });
        // eventBus.$on('backToDebtsTable', () => {
        //   this.activeComponent = 'DebtsTable'
        // });
        // eventBus.$on(
        //   "showInnerActions",
        //   (payload) => this.showInnerAction = payload
        // );
      }
    },

  }
</script>

<style scoped>

</style>
