<template>
  <div>
    <component :is="activeComponent" :records="records" :date="date"/>
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
      },
      date: {
        required: true
      }
    },
    components: {
      BarSaleTable,
      // BarSaleDetails
    },
    created() {
    },
    beforeDestroy() {
    },
    methods: {
    },
    data: () => ({
      activeComponent: 'BarSaleTable',
      activeSales: '',
    })
  }
</script>

<style scoped>

</style>
