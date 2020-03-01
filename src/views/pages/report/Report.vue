<template>
  <div class="vx-row">
    <div class="vx-col w-full h-full">
      <date-picker :option="option" class="mb-base" @search="search"/>
      <component :is="activeComponent" :records="records" :date="date"/>
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
      activeComponent: 'blank',
      records: [],
      date: {},
      option: [
        {
          id: 1,
          slug: 'Bar~ Debtors',
          outlet: 'bar',
          db: 'debts'
        },
        {
          id: 2,
          slug: 'Bar~ Purchases',
          outlet: 'bar',
          db: 'purchases'
        },
        {
          id: 3,
          slug: 'Bar~ Sales',
          outlet: 'bar',
          sales: 'sales'
        },

      ]
    }),
    methods: {
      search(data) {
        this.date = {
          to: data.to,
          from: data.from
        };
        if (data.selected.id === 1) {
          this.switchedToBarDebt()
        } else if (data.selected.id === 2) {
          this.switchedToBarPurchase()
        } else if (data.selected.id === 3) {
          this.switchedToBarSale()
        }

      },
      switchedToBarDebt() {
        this.activeComponent = "barDebt"
      },
      switchedToBarSale() {
        this.activeComponent = "barSale"
      },
      switchedToBarPurchase() {
        this.activeComponent = "barPurchase"
      }

    },
  }
</script>

<style scoped>

</style>
