<template>
  <div>
    <div>
      <component :is="activeComponent" :activePurchase="activePurchase"/>
    </div>
  </div>
</template>

<script>
  // import eventBus from "../../../../eventBus";
  import BarPurchaseTable from "./BarPurchaseTable";
  import BarPurchaseDetails from "./BarPurchaseDetails";

  export default {
    name: "BarPurchaseIndex",
    data: () => ({
      activeComponent: BarPurchaseTable,
      activePurchase: '',
      showInnerAction: false
    }),
    created() {
      this.listener();
    },
    methods: {
      backToPurchasing() {
        // eventBus.$emit('backToPurchasing')
      },
      goToTable(){
        this.activeComponent = "BarPurchaseTable"
      },
      listener() {
        // eventBus.$on('goToDetails', (payload) => {
        //   this.activePurchase = payload;
        //   this.activeComponent = 'BarPurchaseDetails'
        // });
        // eventBus.$on('backToHistoryTable', () => {
        //   this.activeComponent = 'BarPurchaseTable'
        // });
      }
    },
    components: {
      BarPurchaseTable, BarPurchaseDetails
    }
  }
</script>

<style scoped>

</style>
