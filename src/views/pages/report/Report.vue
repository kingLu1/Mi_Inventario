<template>
  <div class="vx-row">
    <div class="vx-col w-full h-full">
      <date-picker :option=option class="mb-base" @search="search"/>
      <component :is="activeComponent"/>
    </div>
  </div>

</template>

<script>
  import datePicker from '../../../myComponents/DateRangePicker';
  import blank from '../../../myComponents/Blank';
  import barP from './barPurchases/BarPurchaseIndex';
  import barbeque from "./barbeque/Barbeque";
  import pool from './pool/Pool';
  import kitchen from './kitchen/Kitchen'

  export default {
    name: "Report",
    components: {
      datePicker,
      barP,
      barbeque,
      pool,
      kitchen,
      blank
    },
    data: () => ({
      activeComponent: barP,
      option: [
        {
          slug: 'Bar ~ Debtors'
        },
        {
          slug: 'Bar ~ Purchases'
        },
        {
          slug: 'Bar ~ Sales'
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
