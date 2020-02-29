<template>
  <div class="vx-row">
    <div class="vx-col w-full h-full">
      <date-picker :option=option class="mb-base" @search="search"/>
      <component :is="activeComponent" :records="records"/>
    </div>
  </div>

</template>

<script>
  import datePicker from '../../../myComponents/DateRangePicker';
  import blank from '../../../myComponents/Blank';
  import barPurchase from './barPurchases/BarPurchaseIndex';
  import barSale from './barSales/BarSaleIndex'
  import barDebt from './barDebts/BarDebtIndex'

  export default {
    name: "Report",
    components: {
      datePicker,
      blank,
      barPurchase,
      barSale,
      barDebt


    },
    data: () => ({
      activeComponent: barDebt,
      records: [],
      option: [
        {
          slug: 'Bar ~ Debtors',
          outlet: 'bar',
          db:'debts'
        },
        {
          slug: 'Bar ~ Purchases',
          outlet: 'bar',
          db: 'purchases'
        },
        {
          slug: 'Bar ~ Sales',
          outlet: 'bar',
          sales: 'sales'
        },

      ]
    }),
    methods: {
      search() {

      }
    },
  }
</script>

<style scoped>

</style>
