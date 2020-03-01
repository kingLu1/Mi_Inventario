<template>
  <div>
    <component :is="activeComponent" :records="records" :date="date" :activePurchase="activePurchase"/>
  </div>
</template>

<script>
  // import eventBus from "../../../../eventBus";
  import BarPurchaseTable from "./BarPurchaseTable";
  import BarPurchaseDetails from "./BarPurchaseDetails";

  export default {
    name: "BarPurchaseIndex",
    props: {
      records: {
        required: true
      },
      date: {
        required: true
      }
    },
    data: () => ({
      activeComponent: BarPurchaseTable,
      activePurchase: '',
      showInnerAction: false
    }),
    methods: {},
    components: {
      BarPurchaseTable, BarPurchaseDetails
    }
  }
</script>

<style scoped>

</style>
