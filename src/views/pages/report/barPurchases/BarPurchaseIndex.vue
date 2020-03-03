<template>
  <div>
    <component :is="activeComponent" :records="records" :date="date" :activePurchase="activePurchase"/>
  </div>
</template>

<script>

  import BarPurchaseTable from "./BarPurchaseTable";
  import BarPurchaseDetails from "./BarPurchaseDetails";
  import eventBus from "../../../../eventBus";

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
    }),
    mounted() {
      eventBus.$emit('showLoading');
      this.listener()
    },
    methods: {
      listener() {
        eventBus.$on('goToPurchaseDetails', (p) => {
          this.activePurchase = p;
          this.activeComponent = 'BarPurchaseDetails'
        });
        eventBus.$on('goToPurchaseTable', () => this.activeComponent = 'BarPurchaseTable')

      }

    },
    components: {
      BarPurchaseTable, BarPurchaseDetails
    }
  }
</script>

<style scoped>

</style>
