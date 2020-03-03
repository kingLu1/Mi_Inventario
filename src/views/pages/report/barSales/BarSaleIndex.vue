<template>
  <div>
    <component :is="activeComponent" :records="records" :date="date" :activeSales="activeSales"/>
  </div>
</template>

<script>
  import BarSaleDetails from "./BarSaleDetails";
  import BarSaleTable from "./BarSaleTable";
  import eventBus from "../../../../eventBus";

  export default {
    name: "BarSaleIndex",
    data: () => ({
      activeComponent: 'BarSaleTable',
      activeSales: '',
    }),
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
      BarSaleDetails
    },
    mounted() {
      eventBus.$emit('showLoading');
      this.listener()
    },
    methods: {
      listener() {
        eventBus.$on('goToSaleDetails', (p) => {
          this.activeSales = p;
          this.activeComponent = 'BarSaleDetails'
        });
        eventBus.$on('goToSaleTable', () => this.activeComponent = 'BarSaleTable')

      }

    }
  }
</script>

<style scoped>

</style>
