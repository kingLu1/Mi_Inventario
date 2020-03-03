<template>
  <div>
    <component :is="activeComponent" :records="records" :date="date" :activeDebt="activeDebt"/>
  </div>
</template>

<script>
  import BarDebtTable from "./BarDebtTable";
  import eventBus from "../../../../eventBus";
  import BarDebtDetails from "./BarDebtDetails";

  export default {
    name: "BarDebtIndex",
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
      BarDebtDetails
    },
    data: () => ({
      activeComponent: 'BarDebtTable',
      activeDebt: '',
    }),
    mounted() {
      eventBus.$emit('showLoading');
      this.listener()
    },
    methods: {
      listener() {
        eventBus.$on('goToDebtDetails', (p) => {
          this.activeDebt = p;
          this.activeComponent = 'BarDebtDetails'
        });
        eventBus.$on('goToDebtTable', () => this.activeComponent = 'BarDebtTable')

      }

    }

  }
</script>

<style scoped>

</style>
