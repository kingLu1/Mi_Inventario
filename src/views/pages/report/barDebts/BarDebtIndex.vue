<template>
  <div>
    <component :is="activeComponent" :records="records" :date="date"/>
  </div>
</template>

<script>
  import BarDebtTable from "./BarDebtTable";

  export default {
    name: "Index",
    props: {
      records: {
        required: true
      },
      date: {
        required: true,
      }
    },
    components: {
      BarDebtTable,
      // BarDebtDetails
    },
    data: () => ({
      activeComponent: 'BarDebtTable',
      activeDebt: '',
    }),
    methods: {},

  }
</script>

<style scoped>

</style>
